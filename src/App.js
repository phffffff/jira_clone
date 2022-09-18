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
import PageDetailProject from "./pages/PageDetailProject/PageDetailProject";
import PageCreateProject from "./pages/PageCreateProject/PageCreateProject";
import PageListProject from "./pages/PageListProject/PageListProject";
import DrawerHoc from "./HOC/DrawerHoc";

function App() {
    const { isLoading } = useSelector(state => state.stateLoad);

    const navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionNavigate(navigate));

        return () => { };
    }, []);

    return (
        <>
            {
                isLoading ? <Loading /> : null
            }

            <Routes>
                <Route path='/Login' element={
                    <LoginUserTemplate>
                        <PageLogin />
                    </LoginUserTemplate>
                } />
                <Route path='/SignIn' element={
                    <LoginUserTemplate>
                        <SignIn />
                    </LoginUserTemplate>
                } />
                <Route path='/DetailProject/:projectId' element={
                    <HomeTemplate>
                        <PageDetailProject />
                    </HomeTemplate>
                } />
                <Route path='/CreateProject' element={
                    <HomeTemplate>
                        <PageCreateProject />
                    </HomeTemplate>
                } />
                <Route path='/ListProject' element={
                    <HomeTemplate>
                        <PageListProject />
                    </HomeTemplate>
                } />
                <Route path='/' element={
                    <HomeTemplate>
                        <PageListProject />
                    </HomeTemplate>
                } />
            </Routes>
            <DrawerHoc />
        </>
    );
}

export default App;
