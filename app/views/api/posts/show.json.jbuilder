json.post do
  json.extract! @post, :id, :author_id, :body, :created_at, :updated_at
  json.author do
    json.first_name @post.author.first_name
    json.last_name @post.author.last_name
    json.id @post.author_id
  end
  json.likes do
    @post.likes.each do |like|
      json.set!(like.liker_id.to_s) do
        json.id like.id
        json.liker_id like.liker_id
      end
    end
  end
end
