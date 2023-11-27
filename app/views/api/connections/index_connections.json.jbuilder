json.connections do
    if @connected_users.length > 0
        @connected_users.each do |user|
            json.set! user.id do
                json.user do
                    json.id user.id
                    json.first_name user.first_name
                    json.last_name user.last_name
                    json.profile_picture_url user.profile_picture_url? ? user.profile_picture_url : nil
                    json.bio user.bio
                end
            end
        end
    else
        json.array! []
    end
end
