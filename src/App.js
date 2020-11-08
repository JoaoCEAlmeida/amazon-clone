import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./store/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import "./App.css";

const promise = loadStripe(
  "pk_test_51HkrZzD9Kpbrr1YHF8ADPVwznJ1shx82soNv0siGvtozGjFnhTqZp88Eh1ZBgyWbFl0FyiNvySCJEGXLFu3Hz9cS00tQ6oFF1V"
);

const App = () => {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser)
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      else
        dispatch({
          type: "SET_USER",
          user: null,
        });
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <ReactNotification />

        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
