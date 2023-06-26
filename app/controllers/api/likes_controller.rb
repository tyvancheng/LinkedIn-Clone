class Api::LikesController < ApplicationController
    before_action :set_post
    before_action :require_logged_in

    def create      
        @user = current_user
        @like = @post.likes.new(post_id: @post.id, liker_id: @user.id)
        
      if @like.save      
        render "api/likes/show"
      else
        render json: @like.errors.full_messages, status: 422
      end
    end
  
    def destroy
      @like = @post.likes.find_by(liker_id: current_user.id)      
      if @like&.destroy
        render json: current_user.id
      else
        render json: { error: 'Like not found' }, status: 422
      end
    end
  
    private

    def like_params      
        # params.require(:like).permit(:postId, :userId)
        params.require(:like).permit(:post_id, :liker_id)
    end

    def set_post  
      @post = Post.find(params[:post_id])  
    end
  end
  