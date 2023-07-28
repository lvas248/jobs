Rails.application.routes.draw do
  

  post '/saved_jobs', to: 'saved_jobs#create'
  
  post '/verify_email', to: 'verifications#verify_email'
  post '/request_email_verify', to: 'verifications#request_email_verify'
  post '/password_reset_request', to: 'verifications#password_reset_request'


  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/reset_password/:token', to: 'users#update_password'

  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
