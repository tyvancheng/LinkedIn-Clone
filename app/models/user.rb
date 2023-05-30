class User < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, length: {in: 3..255}
    validates :password_digest, presence: true
    validates :session_token, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    has_secure_password

    before_validation :ensure_session_token
    

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
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