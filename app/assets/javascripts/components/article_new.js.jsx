var Navigation = ReactRouter.Navigation;

var ArticleNew = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {comment: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({comment: event.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var comment = this.refs.comment.getDOMNode().value.trim();
    if (!comment) {
      return;
    }

    $.post('/articles.json', {"article[comment]": comment, authenticity_token: AUTH_TOKEN}, function(article) {
      this.transitionTo('show', params={id: article.id});
    }.bind(this));

    this.refs.comment.getDOMNode().value = '';
  },
  render() {
    return (
      <div>
        <h1>New Article</h1>
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <textarea ref="comment" value={this.state.comment} onChange={this.handleChange} />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});
