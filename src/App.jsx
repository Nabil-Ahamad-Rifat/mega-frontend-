import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authslice";
import { Footer, Header } from "./component";
import Logoutbtn from './component/Logoutbtn';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setloading(false);
      });
  }, []);
  if (loading) {
    return (
      <h1 className="min-h-screen flex text-6xl items-center text-center justify-center">
        Loading ... !
      </h1>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-500  ">
        <div className="w-full block">
          <Header />
          Todo :<outlate/>{/* todo : outlate  */}
          <Footer />
          <Logoutbtn />
        </div>
      </div>
    );
  }
}

export default App;
