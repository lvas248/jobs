class CreateSavedJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :saved_jobs do |t|
      t.text :job_id
      t.text :agency
      t.text :posting_type
      t.text :number_of_positions
      t.text :business_title
      t.text :civil_service_title
      t.text :title_classification
      t.text :title_code_no
      t.text :level
      t.text :job_category
      t.text :full_time_part_time_indicator
      t.text :career_level
      t.text :salary_range_from
      t.text :salary_range_to
      t.text :salary_frequency
      t.text :work_location
      t.text :division_work_unit
      t.text :job_description
      t.text :minimum_qual_requirements
      t.text :preferred_skills
      t.text :additional_information
      t.text :to_apply
      t.text :hours_shift
      t.text :work_location_1
      t.text :recruitment_requirement
      t.timestamp :posting_date
      t.text :post_until
      t.timestamp :posting_updated
      t.timestamp :process_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
