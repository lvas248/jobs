class User < ApplicationRecord

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validate :password_complexity
    # Validations for updating the email_verified attribute
    validates :email, uniqueness: { scope: :email_verified }, if: :email_verified_changed?
    
    has_secure_password

    has_many :verifications, dependent: :destroy
    has_many :saved_jobs, dependent: :destroy
    
    after_create :create_and_email_verification


    def within_verification_limit?
        self.verifications.where('created_at > ?', Time.now - 1.hours).count < 3
    end
    
    private

    def password_complexity
        return if password.blank? || password =~ /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    
        errors.add(:password, 'requires at least 1 letter, 1 number, and 8 characters minimum.')
      end
   
    def create_and_email_verification
        v = self.verifications.create
        v.send_email_verification
    end

end
