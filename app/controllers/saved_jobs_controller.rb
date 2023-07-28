class SavedJobsController < ApplicationController

    def create
        user = get_user
        saved_job = user.saved_jobs.create!(job_params)
        render json: saved_job, status: :created
    end

    def destroy
        user = get_user
        user.saved_jobs.find(params[:id]).destroy
        head :ok
    end


    private

    def job_params
        params.permit(:job_id, :agency, :posting_type, :number_of_positions, :business_title, :civil_service_title, :title_classification, :title_code_no, :level, :job_category, :full_time_part_time_indicator, :career_level, :salary_range_from, :salary_range_to, :salary_frequency, :work_location, :work_location_1, :division_work_unit, :job_description, :minimum_qual_requirements, :preferred_skills, :additional_information, :to_apply, :hours_shift, :recruitment_requirement, :posting_date, :post_until, :posting_updated, :process_date)
    end

    def get_user
        User.find(session[:user_id])
    end


end
