import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/layout/Footer";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import GlobalAdminRoute from "./components/routing/GlobalAdminRoute";
import Roles from "./components/roles/Roles";
import Users from "./components/users/Users";
import EditUser from "./components/user/EditUser";
import History from "./components/history/History";
import Groups from "./components/groups/Groups";
import Households from "./components/households/Households";
import Areas from "./components/areas/Areas";

//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
//css
import "./App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="app-container">
            <Navbar />
            <Alert />
            <div className="content">
              <Route exact path="/" component={Landing} />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/edit-user" component={EditUser} />
                <GlobalAdminRoute exact path="/roles" component={Roles} />
                <PrivateRoute exact path="/users" component={Users} />
                <PrivateRoute exact path="/history" component={History} />
                <PrivateRoute exact path="/groups" component={Groups} />
                <PrivateRoute exact path="/households" component={Households} />
                <GlobalAdminRoute exact path="/areas" component={Areas} />
                <PrivateRoute component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
