class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :email_verified

  has_many :saved_jobs
end
