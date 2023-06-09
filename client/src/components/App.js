import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import UserProfile from "./UserProfile";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import HabitList from "./HabitList";
import HabitForm from "./HabitForm";
import HabitShow from "./HabitShow";
import Welcome from "./Welcome";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/habits">
          <HabitList />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
        <Route exact path="/add-habit">
          <HabitForm />
        </Route>
        <Route
          exact
          path="/habits/:id"
          render={({ match }) => <HabitShow habitId={match.params.id} />}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);