class VerificationMailer < ApplicationMailer

    default from: 'lvas248.dev@gmail.com'
    def verify_email
        @user = params[:user]
        @url = 'www.getALife.com'
        mail(to: @user.email, subject: 'Welcome Loser')
    end

end
