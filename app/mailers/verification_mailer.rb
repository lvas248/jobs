class VerificationMailer < ApplicationMailer

    default from: 'lvas248.dev@gmail.com'

    def verify_email
        @verification = params[:verification]
        @url = 'https://jobs-taeb.onrender.com/email_verification/token/' + @verification.code
        mail(to: @verification.user.email, subject: 'Welcome')
    end

end
