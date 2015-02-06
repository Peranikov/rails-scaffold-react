var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;
var Link = ReactRouter.Link;

var ArticleShow = React.createClass({
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
  render() {
    return (
      <div>
        <h1>Show Article</h1>
        <p>
          <strong>Comment:</strong>
          {this.state.article.comment}
        </p>
        <div>
          <Link to="edit" params={{id: this.getParams().id}}>Edit</Link>
        </div>
        <div>
          <Link to="index">Back</Link>
        </div>
      </div>
    );
  }
});
