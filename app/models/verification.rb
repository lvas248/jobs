class Verification < ApplicationRecord
  belongs_to :user

  after_create :generate_code

  def not_expired
    self.expires_at > Time.now 
  end

  def send_email_verification
    VerificationMailer.with( verification: self ).verify_email.deliver_later
  end

  def send_password_reset_verification
    PasswordResetMailer.with( verification: self).password_reset_email.deliver_later
  end

  private

  def generate_code
    self.update(
      code: SecureRandom.urlsafe_base64(32),
      expires_at: Time.now + 10.minutes
    )
  end




  
end
