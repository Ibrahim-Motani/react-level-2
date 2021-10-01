import { Link, Route, Switch } from "react-router-dom";
import Users from "./pages/Users";
import Posts from './pages/Posts';
import User from './pages/User';
import Post from './pages/Post';

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/users" component={Users} exact />
        <Route path="/users/:userId" component={User}></Route>
        <Route path="/posts" component={Posts} exact />
        <Route path="/posts/:postId" component={ Post}/>
      </Switch>
    </>
  );
}

export default App;
