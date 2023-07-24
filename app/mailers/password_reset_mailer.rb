class PasswordResetMailer < ApplicationMailer

    default from: 'lvas248.dev@gmail.com'

    def password_reset_email
        @verification = params[:verification]
        @url = 'http://localhost:4000/password_reset/token/' + @verification.code
        mail(to: @verification.user.email, subject: 'Welcome')
    end

end
