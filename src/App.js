import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/SignIn";
import LoginUserTemplate from "./templates/LoginUserTemplate/LoginUserTemplate";
import { actionNavigate } from './redux/actions/actionNavigate/actionNavigate'

function App() {
  const { isLoading } = useSelector(state => state.stateLoad);

  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionNavigate(navigate));

    return () => {

    };
  }, []);

  return (
    <>
      {
        isLoading ? <Loading /> : null
      }
      <Routes>
        <Route path='/login' element={<LoginUserTemplate Component={() => <Login />} />} />
        <Route path='/SignIn' element={<LoginUserTemplate Component={() => <SignIn />} />} />
      </Routes>
    </>
  );
}

export default App;
