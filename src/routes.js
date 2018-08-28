/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/Common/PrivateRoute";
import Header from './components/Common/Header';
// import Homepage from './components/Homepage/HomepageContainer';
import Homepage from './components/Homepage/HomepageContainer';
import SingleListingPage from './components/SingleListingPage/SingleListingPageContainer';
import RegisterPage from './components/RegisterPage/RegisterPageContainer';
import LoginPage from './components/LoginPage/LoginPageContainer';
import PostAdPage from './components/PostAdPage/PostAdPageContainer';
import MyAccountPage from './components/MyAccountPage/MyAccountPage';
import MyMessagesPage from './components/MyAccountPage/MyMessages/MyMessages';
import MyAdsPage from './components/MyAccountPage/MyListings/MyListings';
import SavedListingsPage from './components/MyAccountPage/SavedAdListings/SavedListingsPage';
import EditAdListingPage from './components/MyAccountPage/MyListings/EditAdListing';
import UserAdsPage from './components/UserAdsPage/UserAdsPage';
import CategoryAdsPage from './components/CategoryAdsPage/CategoryAdsPage';
import TermsOfUse from './components/Common/TermsOfUse';


import Footer from './components/Common/Footer';
import NotFoundPage from './components/Common/NotFound';


// import Footer from './components/Common/Footer';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class CustomRoutes extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/item/:adId" component={SingleListingPage} />
          <Route exact={true} path="/user-ads/:userId" component={UserAdsPage} />
          <Route exact={true} path="/category/:category" component={CategoryAdsPage} />
          <Route exact={true} path="/register" component={RegisterPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/terms-of-use" component={TermsOfUse} />

          <PrivateRoute exact={true} path="/post-your-ad" component={PostAdPage} />
          <PrivateRoute exact={true} path="/my-account" component={MyAccountPage} />
          <PrivateRoute exact={true} path="/my-account/ads" component={MyAdsPage} />
          <PrivateRoute exact={true} path="/my-account/ads/edit/:id" component={EditAdListingPage} />
          <PrivateRoute exact={true} path="/my-account/messages" component={MyMessagesPage} />
          <PrivateRoute exact={true} path="/my-account/saved-ads" component={SavedListingsPage} />

          <Route component={NotFoundPage} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default CustomRoutes;
