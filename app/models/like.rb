# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  liker_id   :integer
#  post_id    :integer
#
# Indexes
#
#  index_likes_on_liker_id_and_post_id  (liker_id,post_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (liker_id => users.id)
#  fk_rails_...  (post_id => posts.id)
#
class Like < ApplicationRecord

    belongs_to :post, foreign_key: :post_id, class_name: :Post
    belongs_to :liker, foreign_key: :liker_id, class_name: :User
    
    validates :post, uniqueness: { scope: :liker_id }
  end
