# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#  post_id    :integer          not null
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#
class Comment < ApplicationRecord

    belongs_to :post, foreign_key: :post_id, class_name: :Post
    belongs_to :author, foreign_key: :author_id, class_name: :User
    
    validates :body, presence: true, length: { minimum: 1 } 
end
