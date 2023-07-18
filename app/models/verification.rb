class Verification < ApplicationRecord
  belongs_to :user

  after_create :generate_code

  private

  def generate_code
    self.update(
      code: SecureRandom.urlsafe_base64(32),
      expires_at: Time.now + 30.minutes
    )
  end
end
