class CreateExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :experiences do |t|
      t.string :title
      t.string :company_name
      t.string :employment_type
      t.string :location
      t.date :start_date
      t.date :end_date
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
