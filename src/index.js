/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
axios.defaults.withCredentials = true;
// import App from './components/App';
import App from './components/App';
// import { HashRouter } from 'react-router-dom'
import './assets/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.css';
import './assets/scss/style.scss';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

//  import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './components/Common/globalJquery.js';
import './assets/js/script.js';
// import './plugins/nicescroll/js/jquery.nicescroll.min.js';
require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = window.store = configureStore();
// store.dispatch(loadAllListings());
// store.dispatch(loadSettings());
// import * as notiActions from './actions/NotificationActions';
// store.dispatch(notiActions.requestNotificationPermission());
sessionService.initSessionService(store, {
  refreshOnCheckAuth: true, redirectPath: '/', driver: 'LOCALSTORAGE'
});

render(
  <AppContainer>
    <MuiThemeProvider>
      <App store={store} history={history} />
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewRoot = require('./components/App').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
