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

ActiveRecord::Schema[7.0].define(version: 2023_11_26_205134) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer "author_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "post_id", null: false
  end

  create_table "connections", force: :cascade do |t|
    t.bigint "connector_id", null: false
    t.bigint "connectee_id", null: false
    t.string "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["connectee_id"], name: "index_connections_on_connectee_id"
    t.index ["connector_id"], name: "index_connections_on_connector_id"
  end

  create_table "experiences", force: :cascade do |t|
    t.string "title"
    t.string "company_name"
    t.string "employment_type"
    t.string "location"
    t.date "start_date"
    t.date "end_date"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_experiences_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "liker_id"
    t.integer "post_id"
    t.index ["liker_id", "post_id"], name: "index_likes_on_liker_id_and_post_id", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_posts_on_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "bio"
    t.string "profile_picture_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["first_name"], name: "index_users_on_first_name"
    t.index ["last_name"], name: "index_users_on_last_name"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "connections", "users", column: "connectee_id"
  add_foreign_key "connections", "users", column: "connector_id"
  add_foreign_key "experiences", "users"
  add_foreign_key "likes", "posts"
  add_foreign_key "likes", "users", column: "liker_id"
  add_foreign_key "posts", "users", column: "author_id"
end
