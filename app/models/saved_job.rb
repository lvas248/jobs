class SavedJob < ApplicationRecord

    belongs_to :user
    
    validates :job_id, uniqueness: true
    
end
