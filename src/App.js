import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Header from "./components/Header";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import { useStateValue } from "./data/StateProvider";
import { auth } from "./Firebase";
import axios from "./axios";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import BookedPage from "./pages/BookedPage";
import PaymentsPage from "./pages/PaymentsPage";
import BookingPage from "./pages/BookingPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const [state, dispatch] = useStateValue();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("USER IS : ", authUser);
      if (authUser) {
        if (authUser.email !== "admin@123.com") {
          axios({
            method: "get",
            url: `/api/users/${authUser.email}`,
          }).then((res) => {
            console.log(res);
            dispatch({
              type: "SET_USER",
              user: {
                ...authUser,
                displayName: res.data.name.split(" ")[0],
                balance: res.data.balance,
              },
            });
          });
        } else {
          console.log(authUser);
          dispatch({
            type: "SET_USER",
            user: { ...authUser, displayName: "Admin" },
          });
        }
        setIsHome(true);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setIsHome(false);
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route
            path="/booking"
            render={(props) => <BookingPage {...props} />}
          />
          <Route path="/booked">
            <BookedPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/payment">
            <PaymentsPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/">
            {!isHome ? (
              <LoginPage />
            ) : state.user?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43" ? (
              <AdminPage />
            ) : (
              <HomePage />
            )}
          </Route>
        </Switch>
        {!state.user?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43" ? <Footer /> : null}
      </Router>
    </div>
  );
}

export default App;
