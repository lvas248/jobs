class VerificationsController < ApplicationController

    def verify_email
        verification = Verification.find_by_code(params[:token])
        if verification.not_expired?
            user = verification.user
            user.update(email_verified: true)
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: { error: 'Token has expired.'}, status: :unprocessable_entity
        end
        
    end

    def request_email_verify
       
        user = params[:email].present? ? User.find_by_email(params[:email]) : User.find(session[:user_id])       
        if user.within_verification_limit?
            user.verifications.create
            render json: { success: 'Email Sent', status: :ok}
        else
            render json: { error: 'Max Email Requests Reached, Try again later'}, status: :unauthorized
        end

    end



    private

    def get_user
        User.find(session[:user_id])
    end


end
