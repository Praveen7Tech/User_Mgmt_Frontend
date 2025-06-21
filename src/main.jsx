import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserProvider } from "./context/UserContext"
import { AdminProvider } from './context/AdminContext';
import { ThemeProvider } from './context/ThemeContex';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </UserProvider>  
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
