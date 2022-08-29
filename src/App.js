import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Loading from "./components/Loading/Loading";
import SignIn from "./components/SignIn/SignIn";
import LoginUserTemplate from "./templates/LoginUserTemplate/LoginUserTemplate";
import { actionNavigate } from './redux/actions/actionNavigate/actionNavigate'
import PageLogin from "./pages/PageLogin/PageLogin";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import PageHome from "./pages/PageHome/PageHome";
import PageCreateProject from "./pages/PageCreateProject/PageCreateProject";

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
        <Route path='/Login' element={<LoginUserTemplate Component={() => <PageLogin />} />} />
        <Route path='/SignIn' element={<LoginUserTemplate Component={() => <SignIn />} />} />
        <Route path='/Home' element={<HomeTemplate Component={() => <PageHome />} />} />
        <Route path='/CreateProject' element={<HomeTemplate Component={() => <PageCreateProject />} />} />
      </Routes>
    </>
  );
}

export default App;
