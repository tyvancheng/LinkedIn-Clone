class Api::CommentsController < ApplicationController
    before_action :require_logged_in
    before_action :find_comment, only: [:show, :update, :destroy]
    before_action :authorize_deletion, only: [:destroy]
    before_action :authorize_update, only: [:update]
    before_action :find_post, only: [:create, :index]
  
    def create
        @user = current_user
        @comment = @post.comments.new(comment_params)
        @comment.post_id = @post.id
        @comment.author_id = @user.id
        # @comment.author = @user.first_name + " " + @user.last_name
      if @comment.save      
        render "api/comments/show" # FIXME:
      else
        render json: @comment.errors.full_messages, status: 422
      end
    end
  
    def update
      if @comment.update(comment_params)
        render json: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @comment.destroy
      head :no_content
    end
  
    private
  
    def comment_params
      params.require(:comment).permit(:body, :post_id, :author_id)
    end
  
    def find_comment
      @comment = Comment.find(params[:id])
    end

    def find_post
      @post = Post.find(params[:post_id])
    end
    
    def authorize_update
      unless current_user == @comment.user
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

    def authorize_deletion
      unless current_user == @comment.user || current_user == @comment.post.user
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
  