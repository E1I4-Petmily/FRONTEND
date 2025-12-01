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
import Welcome from "./pages/register/welcome-page";
import Photo from "./pages/register/photo-page";
import Information from "./pages/register/information-page";
import Color from "./pages/register/color-page";
import Completion from "./pages/register/completion-page";
import PetEdit from "./pages/pet-edit-page";
import ReportListPage from "./pages/report-list-page";

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
      { path: "register/welcome", element: <Welcome /> },
      { path: "register/photo", element: <Photo /> },
      { path: "register/information", element: <Information /> },
      { path: "register/color", element: <Color /> },
      { path: "register/completion", element: <Completion /> },
      { path: "mypage", element: <MyPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "petedit", element: <PetEdit /> },
      { path: "mypage/reports", element: <ReportListPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
