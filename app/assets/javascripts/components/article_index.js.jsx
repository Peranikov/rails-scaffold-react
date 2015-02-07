var ArticleIndex = React.createClass({
  fetchArticles() {
    $.get('/articles.json', (res) => {
      if (this.isMounted()) {
        this.setState({articles: res});
      }
    });
  },
  deleteArticle(id) {
    if (!confirm(`Delete article? id:${id}`)) {
      return;
    }

    $.ajax({
      url: `/articles/${id}`,
      type: "DELETE",
      data: {authenticity_token: AUTH_TOKEN},
      success: function() {
        this.fetchArticles();
      }.bind(this)
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
      var boundDelete = this.deleteArticle.bind(this, article.id);
      rows.push(
        <Tr key={article.id}>
          <Td column="Comment">{article.comment}</Td>
          <Td column="Show"><Link to="show" params={{id: article.id}}>Show</Link></Td>
          <Td column="Edit"><Link to="edit" params={{id: article.id}}>Edit</Link></Td>
          <Td column="Delete"><a href="#" onClick={boundDelete}>Delete</a></Td>
        </Tr>
      );
    }.bind(this));
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
