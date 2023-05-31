class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password', 'first_name', 'last_name', 'email']

    before_action :require_logged_out, only: [:create]
    before_action :snake_case_params

    def create
        @user = User.new(user_params)
        
        debugger
        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
            
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
end
