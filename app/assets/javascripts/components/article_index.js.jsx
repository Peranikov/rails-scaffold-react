var ArticleIndex = React.createClass({
  fetchArticles() {
    $.get('/articles.json', (res) => {
      if (this.isMounted()) {
        this.setState({articles: res});
      }
    });
  },
  getInitialState() {
    return {
      articles: []
    };
  },
  componentDidMount() {
    this.fetchArticles();
  },
  render() {
    var Table = Reactable.Table;
    var Link = Router.Link;
    return (
      <div>
        <div>
          <Table data={this.state.articles} />
        </div>
        <div>
          <Link to="new">New Article</Link>
        </div>
      </div>
    );
  }
});
