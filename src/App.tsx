import {
  type RouteObject,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./layouts/public-layout";
import ProtectedLayout from "./layouts/protected-layout";
import Landing from "./pages/landing-page";
import MyPage from "./pages/my-page";
import CalendarPage from "./pages/calendar-page";
import SignUp from "./pages/signup-page";
import LogIn from "./pages/login-page";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "landing", element: <Landing /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <LogIn /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      // { index: true, element: <Home /> },
      { path: "mypage", element: <MyPage /> },
      { path: "calendar", element: <CalendarPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
