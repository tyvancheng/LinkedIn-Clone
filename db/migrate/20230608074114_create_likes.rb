class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.integer :liker, null: false
      t.integer :post, null: false
      t.timestamps
    end
    add_index :likes, [:liker], unique: true
    add_foreign_key :likes, :users, column: :liker, primary_key: :id
    add_foreign_key :likes, :posts, column: :post, primary_key: :id

  end
end
