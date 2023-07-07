# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'avatar'

Post.destroy_all
User.destroy_all
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('posts')

#ActiveRecord::resetpackage ....
# check other other programs for the seed rest stuff 
   
# author_ids = [1, 2, 3]
bodies = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed euismod augue ac eros interdum condimentum.",
    "Proin efficitur tellus nec sapien dictum, vitae sollicitudin lacus ultrices.",
    "Praesent non nulla eget magna gravida aliquam vitae nec tortor.",
    "Vestibulum eget tellus ullamcorper, tincidunt velit sed, ultricies tortor."
  ]
  

#     author_ids.each do |author_id|
#     bodies.each do |body|
#         Post.create(author_id: author_id, body: body)
#     end
#     end

# users = User.limit(3).to_a

# users.each do |user|
#     bodies.each do |body|
#       Post.create!(author: user, body: body)
#     end
# end

# post1 = Post.create!(author: user, body: bodies[0])

# image_url = Faker::LoremFlickr.image(size: "300x200", search_terms: [Faker::Lorem.word])
# bio = Faker::Job.title + " @ " + Faker::Company.name

user1 = User.create!(first_name: "Tyvan", last_name: "Cheng", email: "user1@example.com", password: "password1",
  profile_picture_url: Faker::Avatar.image(size: "50x50",bgset: 'bg2'), bio: Faker::Job.title + " @ " + Faker::Company.name)
user2 = User.create!(first_name: "Mike", last_name: "Lee", email: "user2@example.com", password: "password2",
  profile_picture_url: Faker::Avatar.image(size: "50x50",bgset: 'bg2') , bio: Faker::Job.title + " @ " + Faker::Company.name)
demouser = User.create!(first_name: "Demo", last_name: "User", email: "lockedindemo@gmail.com", password: "demouser", 
  profile_picture_url: Faker::LoremFlickr.image(size: "50x50", search_terms: ["cute-picture"]), bio: Faker::Job.title + " @ " + Faker::Company.name)

post1 = Post.create!(author_id: user1.id, body: bodies[1])
post2 = Post.create!(author_id: user2.id, body: bodies[1])
post3 = Post.create!(author_id: demouser.id, body: bodies[1])
post4 = Post.create!(author_id: user1.id, body: bodies[1])
post5 = Post.create!(author_id: user2.id, body: bodies[1])