class SavedJob < ApplicationRecord

    validates :job_id, uniqueness: true
    
end
