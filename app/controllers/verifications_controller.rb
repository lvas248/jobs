class VerificationsController < ApplicationController

    def verify_email
        verification = Verification.find_by_code!(params[:token])
        if verification.not_expired
            verification.user.update!(email_verified: true)
            session[:user_id] = verification.user.id
            render json: verification.user, status: :ok
        else
            render json: { error: 'Token has expired.'}, status: :unprocessable_entity
        end
        
    end

    def request_email_verify
       
        user = params[:email].present? ? User.find_by_email(params[:email]) : User.find(session[:user_id])       
        if user.within_verification_limit?
            v = user.verifications.create
            v.send_email_verification
            render json: { success: 'Email Sent', status: :ok}
        else
            render json: { error: 'Max Email Requests Reached, Try again later'}, status: :unauthorized
        end

    end

    def password_reset_request
        user = User.find_by_email!(params[:email])
        user.verifications.create.send_password_reset_verification
        render json: { success: 'Password Reset Link has been sent.'}, status: :ok
    end



    private

    def get_user
        User.find(session[:user_id])
    end


end
