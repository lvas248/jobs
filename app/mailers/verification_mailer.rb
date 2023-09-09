
class VerificationMailer < ApplicationMailer

    def verify_email
        @verification = params[:verification]
        @url = ENV['DOMAIN'] + '/email_verification/token/' + @verification.code
        mail(to: @verification.user.email, subject: 'Welcome')
    end

end
