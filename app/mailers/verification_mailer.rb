class VerificationMailer < ApplicationMailer

    default from: 'lvas248.dev@gmail.com'

    def verify_email
        @verification = params[:verification]
        @url = 'http://localhost:4000/email_verification/token/' + @verification.code
        mail(to: @verification.user.email, subject: 'Welcome')
    end

end
