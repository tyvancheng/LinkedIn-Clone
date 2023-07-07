class ChangeLikes < ActiveRecord::Migration[7.0]
  def change
    remove_column :likes, :liker
    remove_column :likes, :post

    add_column :likes, :liker_id, :integer
    add_column :likes, :post_id, :integer

    
    add_foreign_key :likes, :users, column: :liker_id
    add_foreign_key :likes, :posts, column: :post_id
  end
end
