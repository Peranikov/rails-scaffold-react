var ArticleTable = React.createClass({
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
    return (
      <Table data={this.state.articles} />
    );
  }
});
