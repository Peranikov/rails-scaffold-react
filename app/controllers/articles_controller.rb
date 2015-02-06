class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  # GET /articles
  def index
    @articles = Article.all

    respond_to do |format|
      format.html
      format.json { render json: @articles }
    end
  end

  # GET /articles/1
  def show
    render json: @article
  end

  # POST /articles
  def create
    @article = Article.new(article_params)
    @article.save
    render json: @article
  end

  # PATCH/PUT /articles/1
  def update
    @article.update(article_params)
    render json: @article
  end

  # DELETE /articles/1
  def destroy
    @article.destroy
    render json: @article
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def article_params
      params.require(:article).permit(:comment)
    end
end
