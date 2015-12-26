import React from 'react';
import {render}from 'react-dom';
import App from './containers/App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {renderDevTools} from './utils/devTools';

let store = configureStore();

render(
   <div>
      <Provider store={store} >
         <App />
      </Provider>
      {/* only renders when running in DEV mode */
          renderDevTools(store)
      }
   </div>
   , document.getElementById('main')
);
