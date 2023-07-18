class VerificationSerializer < ActiveModel::Serializer
  attributes :id, :code, :expires_at, :attempts
  has_one :user
end
