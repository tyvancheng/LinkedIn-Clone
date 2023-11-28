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
# bodies = [
#     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
#     "Sed euismod augue ac eros interdum condimentum.",
#     "Proin efficitur tellus nec sapien dictum, vitae sollicitudin lacus ultrices.",
#     "Praesent non nulla eget magna gravida aliquam vitae nec tortor.",
#     "Vestibulum eget tellus ullamcorper, tincidunt velit sed, ultricies tortor."
#   ]
 bodies = [
    "I'm positive robots are wired for success.",
    "Robots on vacation? They just need some time to recharge.",
    "Did you hear about the robot who had a cold? It had a byte infection!",
    "A robot started a gardening business because it had a green thumb drive.",
    "The robot fell in love with a calculator because they could always count on each other."
  ];
  
  
  
  
  
# image_url = Faker::LoremFlickr.image(size: "300x200", search_terms: [Faker::Lorem.word])
# bio = Faker::Job.title + " @ " + Faker::Company.name

user1 = User.create!(first_name: "Tyvan", last_name: "Cheng", email: "user1@example.com", password: "password1",
  profile_picture_url: Faker::Avatar.image(size: "50x50",bgset: 'bg2'), bio: "Robotics Engineer @ Google")
user2 = User.create!(first_name: "Mike", last_name: "Lee", email: "user2@example.com", password: "password2",
  profile_picture_url: Faker::Avatar.image(size: "50x50",bgset: 'bg2') , bio: "Sr. Engineer @ Amazon Robotics")
demouser = User.create!(first_name: "Demo", last_name: "User", email: "lockedindemo@gmail.com", password: "demouser", 
  profile_picture_url: Faker::Avatar.image(size: "50x50",bgset: 'bg2') , bio: "Robotics Engineer @ Lockheed Martin")

post1 = Post.create!(author_id: user1.id, body: bodies[1])
post2 = Post.create!(author_id: user2.id, body: bodies[2])
post3 = Post.create!(author_id: demouser.id, body: bodies[3])
post4 = Post.create!(author_id: user1.id, body: bodies[4])
post5 = Post.create!(author_id: user2.id, body: bodies[0])