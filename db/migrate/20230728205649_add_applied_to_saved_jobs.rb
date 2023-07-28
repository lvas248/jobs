class AddAppliedToSavedJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :saved_jobs, :applied, :boolean, default: false
  end
end
