import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { store } from './userStore/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
