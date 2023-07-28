# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_07_26_220737) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "saved_jobs", force: :cascade do |t|
    t.text "job_id"
    t.text "agency"
    t.text "posting_type"
    t.text "number_of_positions"
    t.text "business_title"
    t.text "civil_service_title"
    t.text "title_classification"
    t.text "title_code_no"
    t.text "level"
    t.text "job_category"
    t.text "full_time_part_time_indicator"
    t.text "career_level"
    t.text "salary_range_from"
    t.text "salary_range_to"
    t.text "salary_frequency"
    t.text "work_location"
    t.text "division_work_unit"
    t.text "job_description"
    t.text "minimum_qual_requirements"
    t.text "preferred_skills"
    t.text "additional_information"
    t.text "to_apply"
    t.text "hours_shift"
    t.text "work_location_1"
    t.text "recruitment_requirement"
    t.datetime "posting_date"
    t.text "post_until"
    t.datetime "posting_updated"
    t.datetime "process_date"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_saved_jobs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.boolean "email_verified", default: false
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "verifications", force: :cascade do |t|
    t.string "code"
    t.datetime "expires_at"
    t.bigint "user_id", null: false
    t.integer "attempts"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_verifications_on_user_id"
  end

  add_foreign_key "saved_jobs", "users"
  add_foreign_key "verifications", "users"
end
