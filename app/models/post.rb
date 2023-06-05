# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :bigint           not null
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#
class Post < ApplicationRecord
    validates :body, presence: true
    validate :validate_body_length

    belongs_to :author, foreign_key: :author_id, class_name: :User

    private
    def validate_body_length
        if body.present?
            if body.length < 1
                errors.add(:body, "cannot be empty")
            elsif body.length > 255
                errors.add(:body, "must be less than 3000 characters")
            end
        end
    end
end
