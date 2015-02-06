var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={ArticleIndex}/>
    <Route name="index" handler={ArticleIndex} />
    <Route name="show" path="show/:id"  handler={ArticleShow} />
    <Route name="new" handler={ArticleNew} />
    <Route name="edit" path="edit/:id" handler={ArticleEdit} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
