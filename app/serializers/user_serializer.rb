class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :email_verified
end
