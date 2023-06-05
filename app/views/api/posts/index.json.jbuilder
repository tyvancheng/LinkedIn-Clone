
  json.array! @posts do |post|
    json.extract! post, :id, :body, :created_at, :updated_at
    json.author do
      json.first_name post.author.first_name
      json.last_name post.author.last_name

    end
  end
