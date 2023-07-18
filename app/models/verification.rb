class Verification < ApplicationRecord
  belongs_to :user

  after_create :generate_code_and_send_email

  def not_expired?
    self.expires_at > Time.now
  end

  private

  def generate_code
    self.update(
      code: SecureRandom.urlsafe_base64(32),
      expires_at: Time.now + 10.minutes
    )
  end

  def send_email_verification
    VerificationMailer.with( verification: self ).verify_email.deliver_later
  end

   def generate_code_and_send_email
    self.generate_code
    self.send_email_verification
  end
  
end
