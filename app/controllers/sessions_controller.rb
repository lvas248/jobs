class SessionsController < ApplicationController

    #login
    def create
        # binding.pry
        user = User.find_by( email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: { error: 'Invalid username or password'}, status: :unauthorized
        end
  
    end


    private




end
