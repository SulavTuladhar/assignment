import { Cookies } from "react-cookie";
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import AuthPage from "./Pages/Auth/Auth.page";
import Dashboard from "./Pages/Dashboard/Dashboard.page";
import NavComponent from "./Components/Common/Nav/Nav.Component";
import AddNotePage from "./Pages/Note/AddNote.page";
import NotePage from "./Pages/Note/Note.page";
import EditNotePage from "./Pages/Note/EditNote.page";
import ProfilePage from "./Pages/Profile/Profile.page";

const cookies = new Cookies();

function PublicRoute({ children }) {
  return <div>
    {children}
  </div>
}

function PrivateRoute({ children }) {
  return cookies.get('token')
    ? <main className="w-[90%] mx-auto">
      <NavComponent />
      {children}
      {/* <FooterComponent /> */}
    </main>
    : <Navigate to="/" />;
}
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={
        <PublicRoute >
          <AuthPage />
        </PublicRoute>
      } />
      <Route exact path="/dashboard" element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      } />

      <Route exact path="/note/:id" element={
        <PrivateRoute >
          <NotePage />
        </PrivateRoute>
      } />

      <Route exact path="/add-note" element={
        <PrivateRoute >
          <AddNotePage />
        </PrivateRoute>
      } />
   
      <Route exact path="/edit-note/:id" element={
        <PrivateRoute >
          <EditNotePage />
        </PrivateRoute>
      } />
     
      <Route exact path="/profile" element={
        <PrivateRoute >
          <ProfilePage />
        </PrivateRoute>
      } />

      <Route path="*" element={
        <PublicRoute>
        </PublicRoute>

      } />
    </>
  )
)
