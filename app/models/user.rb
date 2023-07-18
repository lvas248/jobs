class User < ApplicationRecord

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_secure_password

    has_many :verifications, dependent: :destroy
    
    after_create :create_verification


    def within_verification_limit?
        self.verifications.where('created_at > ?', Time.now - 1.hours).count < 3
    end
    
    private
   
    def create_verification
        self.verifications.create
    end

end
