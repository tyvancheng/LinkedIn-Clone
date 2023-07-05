json.user do
        json.extract! @user, :id, :email, :first_name, :last_name, :created_at, :bio, :profile_picture_url
end