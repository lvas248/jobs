class PasswordResetMailer < ApplicationMailer


    def password_reset_email
        @verification = params[:verification]
        @url = ENV['DOMAIN'] + '/password_reset/token/' + @verification.code
        mail(to: @verification.user.email, subject: 'Welcome')
    end

end
