var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;

var ArticleEdit = React.createClass({
  mixins: [Navigation, State],

  fetchArticle(id) {
    $.get(`/articles/${id}.json`, (res) => {
      if (this.isMounted()) {
        this.setState({article: res});
      }
    });
  },
  getInitialState() {
    return { article: { comment: '' } };
  },
  componentDidMount() {
    this.fetchArticle(this.getParams().id);
  },
  handleChange: function(event) {
    this.setState({article: {comment: event.target.value}});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var comment = this.refs.comment.getDOMNode().value.trim();
    if (!comment) {
      return;
    }

    $.ajax({
      url: `/articles/${this.getParams().id}.json`,
      data: {"article[comment]": comment, authenticity_token: AUTH_TOKEN},
      type: "PUT",
      success: function(article) {
        this.transitionTo('show', params={id: article.id});
      }.bind(this)
    });

    this.refs.comment.getDOMNode().value = '';
  },
  render() {
    return (
      <div>
        <h1>Edit Article</h1>
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <textarea ref="comment" value={this.state.article.comment} onChange={this.handleChange} />
          <input type="submit" value="Post" />
        </form>
        <div>
          <Link to="index">Back</Link>
        </div>
      </div>
    );
  }
});
