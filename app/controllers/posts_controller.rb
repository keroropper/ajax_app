class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end


  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked #checkedアクションは、「既読」の操作を行ったときに実行されるアクション
    post = Post.find(params[:id]) #URLパラメーターから、既読したメモのidが渡されるように設定
    if post.checked              #既読であるか否かを判定
      post.update(checked: false)  #既読であれば「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true) #既読でなければ「既読にするためtrueへ変更」
    end
    item = Post.find(params[:id]) #更新したレコードをitem = Post.find(params[:id])で取得し直し
    render json: { post: item } #render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却
  end

end