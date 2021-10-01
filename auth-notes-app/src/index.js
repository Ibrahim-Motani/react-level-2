import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { NotesContextProvider } from './store/notes-context';

ReactDOM.render(
  <AuthContextProvider>
    <NotesContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </NotesContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
