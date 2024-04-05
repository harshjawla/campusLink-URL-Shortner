import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import { Backend_URL } from "./components/config";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import CreateForm from "./components/CreateForm";
import Error404Page from "./components/Error404Page";
import NoLinksMessage from "./components/NoLinksMessage";
import EditForm from "./components/EditForm";
import ForgetPassword from "./components/ForgetPassword";
import SetNewPassword from "./components/SetNewPassword";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(Backend_URL + "/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isAuth === 1) {
            setUser(data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/create"
        element={
          user ? (
            <CreateForm username={user.username} />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route path="/error" element={<Error404Page />} />
      <Route path="/forgotpassword" element={<ForgetPassword />} />
      <Route path="/reset/:userID" element={<SetNewPassword />} />
      <Route path="/edit/:linkID" element={user ? < EditForm username={user.username} /> : <Navigate to={"/login"} />} />
    </Routes>
  );
}

export default App;
