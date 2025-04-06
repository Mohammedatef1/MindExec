import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import AppProvider from "./AppProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedSignRoute from "./pages/ProtectedSignRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedSignRoute>
          <Login />
        </ProtectedSignRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedSignRoute>
          <Register />
        </ProtectedSignRoute>
      ),
    },
    {
      path: "/editor",
      element: <Editor />,
    },
  ]
);

const App = () => (
  <>
    <Toaster />
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </>
);
export default App;
