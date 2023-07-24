class UsersController < ApplicationController

    before_action :is_email_verified, only: :show

    #signup 
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id        
        render json: { success: 'Email verification has been sent'}, status: :created
    end

    #refresh
    def show
        user = get_user
        render json: user, status: :ok
    end

    #reset password
    def update_password
        verification = Verification.find_by_code!(params[:token])
        if verification.not_expired
            verification.user.update!( user_params )
            render json: { success: 'Password Updated'}, status: :ok
        else
            render json: { errors: 'Password reset link has expired.'}, status: :unprocessable_entity
        end
    end

 

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end

    def get_user
        User.find(session[:user_id])
    end

    def is_email_verified
        unless ((session.include? :user_id) && (get_user.email_verified == true))
            return render json: { error: 'not authorized'}, status: :unauthorized
        end
    end

end
