# == Schema Information
#
# Table name: experiences
#
#  id              :bigint           not null, primary key
#  company_name    :string
#  description     :text
#  employment_type :string
#  end_date        :date
#  location        :string
#  start_date      :date
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint           not null
#
# Indexes
#
#  index_experiences_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Experience < ApplicationRecord

    belongs_to :user
    
    validates :body, presence: true, length: { minimum: 1 } 
end
