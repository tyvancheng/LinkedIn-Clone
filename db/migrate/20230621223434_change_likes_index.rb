class ChangeLikesIndex < ActiveRecord::Migration[7.0]
  def change
    remove_index :likes, :liker_id
    add_index :likes, [:liker_id, :post_id], unique: true
  end
end
