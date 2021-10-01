import { useContext } from 'react';
import { Switch, Redirect, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthContext from './store/auth-context';
import Account from './pages/Account';
import MyNotes from './pages/MyNotes';

function App() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>User Auth</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
            <li>
              <Link to="/mynotes">
                My Notes
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>

      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/account"
          render={({ location }) =>
            isLoggedIn ? (
              <Account></Account>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location, temp: true },
                }}
              />
            )
          }
        />
        <Route path="/mynotes" component={MyNotes}></Route>
      </Switch>
    </div>
  );
}

// function PrivateRoute({ children, ...rest }) {
//   const { isLoggedIn, setMsgForAccAccessWithoutToken } = useContext(
//     AuthContext
//   );

//   if (!isLoggedIn) {
//     setMsgForAccAccessWithoutToken();
//   }

  // return (
  //   <Route
  //     {...rest}
  //     render={({ location }) =>
  //      isLoggedIn ? (
  //         children
  //       ) : (
  //         <Redirect to={{ pathname: "/login", state: { from: location } }} />
  //       )
  //     }
  //   />
  // );

//   return (
//     <Route
//       path="/account"
//       render={({ location }) =>
//         isLoggedIn ? (
//           <Account></Account>
//         ) : (
//           <Redirect to={{ pathname: "/login", state: { from: location } }} />
//         )
//       }
//     />
//   );
// }

export default App;

