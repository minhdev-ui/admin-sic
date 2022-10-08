import React, { useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { Switch, useLocation } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
// Views
// ADMIN
// import AdminPage from "./admin/Admin";
import 'antd/dist/antd.css';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import login from "./views/Login";
// BAN
// BLOG AND EVENT

// Admin
import BlogAdmin from "./admin/components/Blog";
import Dashboard from "./admin/components/Dashboard/index";
import QTV from "./admin/components/QuanTriVien/index";
// import Event from "./admin/components/Events";

import { Provider } from "react-redux";
import AdminPage from "./admin";
import CreateArticle from "./admin/components/Blog/CreateArticle";
import Contact from "./admin/components/Contact";
import configureStore from "./components/Scanner/store/configStore";
import RouteGuard from "./utils/RouteGuard";
import Profile from "./views/profile";

// import store
// import store from './store';
// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const config = configureStore();

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    // document.body.classList.add("is-loaded");
    // childRef && childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <>
        <Provider {...config}>
          <ScrollReveal
            ref={childRef}
            children={() => (
                <Switch>
                  <RouteGuard exact path='/' component={AdminPage} layout={LayoutAdmin}/>
                  <AppRoute exact path="/loginAdmin" component={login} />
                  <AppRoute
                    exact
                    path="/Dashboard"
                    component={Dashboard}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/Quan-tri-vien"
                    component={QTV}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/Blog-Event"
                    component={BlogAdmin}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/contact"
                    component={Contact}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/Blog-Event/add"
                    component={CreateArticle}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/account/profile"
                    component={Profile}
                    layout={LayoutAdmin}
                  />
                </Switch>
            )}
          />
          <NotificationContainer/>
        </Provider>
    </>
  );
};

export default App;
