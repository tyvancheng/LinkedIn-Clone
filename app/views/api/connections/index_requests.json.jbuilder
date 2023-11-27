json.connectionRequests do
    @connection_requests.each do |connection_request|
        connector = connection_request.connector
        json.set! connection_request.id do
            json.connector do
                json.id connector.id
                json.first_name connector.first_name
                json.last_name connector.last_name
                json.profile_picture_url connector.profile_picture_url? ? connector.profile_picture_url : nil
                json.bio connector.bio
            end
        end
    end
end
