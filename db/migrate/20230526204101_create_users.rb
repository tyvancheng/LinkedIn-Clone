class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: { unique: true } 
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :bio
      t.string :profile_picture_url
      t.timestamps
    end

    # add_index :users, :email, unique: true
    # add_index :users, :session_token, unique: true
    add_index :users, :first_name
    add_index :users, :last_name
  end
end
