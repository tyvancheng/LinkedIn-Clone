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
        json.liker like.liker
      end
    end
  end
  json.comments do
    @post.comments.each do |comment|
      json.set!(comment.id.to_s) do
        json.id comment.id
        json.author_id comment.author_id
        json.post_id comment.post_id
        json.body comment.body
        json.author comment.author
      end
    end
  end
end
