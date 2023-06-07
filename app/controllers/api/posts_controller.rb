class Api::PostsController < ApplicationController
    def index
        @posts = Post.all.order(created_at: :desc)
        render "api/posts/index" # Will render all posts, no user involvement
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id
        # @post.author = current_user
        # debugger
        
        if @post.save
            # debugger
            render "api/posts/show"
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def show
        @post = Post.find(params[:id])
    end

    def update
        @post = Post.find(params[:id])
        @post.author = current_user

        if @post.update(post_params)
            render "api/posts/show"
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy
        
        @post = Post.find(params[:id])
        @post.destroy
        
        # index
    end

    private

    def post_params
        params.require(:post).permit(:body, :author_id)
    end
end
