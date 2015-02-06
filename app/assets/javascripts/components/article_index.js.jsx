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
    var Tr = Reactable.Tr;
    var Td = Reactable.Td;
    var Link = Router.Link;
    var rows = [];
    this.state.articles.forEach(function(article) {
      console.log(article.id)
      rows.push(
        <Tr>
          <Td column="Comment">{article.comment}</Td>
          <Td column="Edit"><Link to="edit" params={{id: article.id}}>Edit</Link></Td>
          <Td column="Delete"><Link to="delete">Delete</Link></Td>
        </Tr>
      );
    });
    return (
      <div>
        <h1>Article Lists</h1>
        <div>
          <Table>
            {rows}
          </Table>
        </div>
        <div>
          <Link to="new">New Article</Link>
        </div>
      </div>
    );
  }
});
