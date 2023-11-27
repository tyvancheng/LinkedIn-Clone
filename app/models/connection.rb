# == Schema Information
#
# Table name: connections
#
#  id           :bigint           not null, primary key
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  connectee_id :bigint           not null
#  connector_id :bigint           not null
#
# Indexes
#
#  index_connections_on_connectee_id  (connectee_id)
#  index_connections_on_connector_id  (connector_id)
#
# Foreign Keys
#
#  fk_rails_...  (connectee_id => users.id)
#  fk_rails_...  (connector_id => users.id)
#
class Connection < ApplicationRecord

    belongs_to :connector,
        primary_key: :id,
        foreign_key: :connector_id,
        class_name: :User

    belongs_to :connectee,
        primary_key: :id,
        foreign_key: :connectee_id,
        class_name: :User
end
