class SavedJobSerializer < ActiveModel::Serializer
  attributes :id, :job_id, :agency, :posting_type, :number_of_positions, :business_title, :civil_service_title, :title_classification, :title_code_no, :level, :job_category, :full_time_part_time_indicator, :career_level, :salary_range_from, :salary_range_to, :salary_frequency, :work_location, :division_work_unit, :job_description, :minimum_qual_requirements, :preferred_skills, :additional_information, :to_apply, :hours_shift, :work_location_1, :recruitment_requirement, :posting_date, :post_until, :posting_updated, :process_date
end
