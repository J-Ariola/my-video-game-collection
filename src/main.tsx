import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.tsx';
import Login from './pages/Login.tsx';
import MyGames from './pages/MyGames.tsx';
import Games from './pages/Games.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  //TODO: Make a user page where they can see their entire collection
  {
    path: "/my-games",
    element: <MyGames/>
  },
  {
    path: "/games/:guid",
    element: <Games/>,
  },
  {
    path: "*",
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
