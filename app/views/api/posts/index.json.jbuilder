
# @posts.each do |post|
#   json.post do
#     json.id post.id
#     json.extract! post, :author_id, :body, :created_at, :updated_at
#     json.author do
#       json.first_name post.author.first_name
#       json.last_name post.author.last_name
#       json.id post.author.id
#     end
#   end
# end 

# json.posts do 
  @posts.each do |post|
    json.set! post.id do
      json.id post.id
      json.extract! post, :author_id, :body, :created_at, :updated_at
      json.author do
        json.first_name post.author.first_name
        json.last_name post.author.last_name
        json.id post.author.id
      end
    end
  end
# end

# json.array! @posts do |post|
#   json.extract! post, :id, :author_id, :body, :created_at, :updated_at
    
#   json.author do
#     json.first_name post.author.first_name
#     json.last_name post.author.last_name
#     json.id post.author.id
#   end
# end
# end


