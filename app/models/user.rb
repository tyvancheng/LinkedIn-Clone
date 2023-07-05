# == Schema Information
#
# Table name: users
#
#  id                  :bigint           not null, primary key
#  bio                 :string
#  email               :string           not null
#  first_name          :string           not null
#  last_name           :string           not null
#  password_digest     :string           not null
#  profile_picture_url :string
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_first_name     (first_name)
#  index_users_on_last_name      (last_name)
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
    validates :email, 
        format: { with: URI::MailTo::EMAIL_REGEXP, message: "not a valid email address" }, 
        length: {in: 3..255, message: "must be between 3 and 255 characters" }, 
        uniqueness: { message: "has already been taken" }
    validates :password_digest, presence: true
    validates :session_token, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    has_secure_password

    before_validation :ensure_session_token

    has_many :posts, foreign_key: :author_id, class_name: :Post, dependent: :destroy
    
    has_many :likes, foreign_key: :liker_id, class_name: :Like, dependent: :destroy
    has_many :liked_posts, through: :likes, class_name: :Post

    has_many :authored_comments, foreign_key: :author_id, class_name: :Comment, dependent: :destroy
    has_many :experiences
    
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!

        self.session_token = generate_unique_session_token
        save!
        self.session_token
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        # has_secure_password gives us the authenticate method
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
