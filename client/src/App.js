import React, { Fragment } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import ProtectedRoute from "./components/utils/ProtectedRoute";
import AddUrl from "./components/dashboard/AddUrl";
import Stats from "./components/statistics/Stats";
import AuthRoute from "./components/utils/AuthRoute";

function App() {
  return (
    <Fragment>
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute path="/add" component={AddUrl} />
        <ProtectedRoute path="/stats/:id" component={Stats} />
        <AuthRoute path="/register" component={Register} />
        <AuthRoute path="/login" component={Login} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>

    //client
    //*Check for errors while fetching
    //* Everything is fucked if someone opens stats in new tab (Refactor with context or write error boundry )
    //Add Empty indicator
    //*Make it responsive
    //Optimize with useCallback

    //server
    //Index the Short URL
    //*Care Auth
    //redis for fatafat redirect? https://codeforgeek.com/url-shortener-node-js-redis/
  );
}

export default App;
