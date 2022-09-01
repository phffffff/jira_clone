import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Header from "../../components/Header/Header";
import Content from "../../components/MainHome/Content";
import Info from "../../components/MainHome/Info";

import { actionGetProjectDetailSaga } from '../../redux/actions/actionProject/actionProjectApi'

function PageDetailProject() {
    const params = useParams();
    const dispatch = useDispatch();

    const { projectDetail } = useSelector(state => state.stateProject);

    useEffect(() => {
        let { projectId } = params;
        dispatch(actionGetProjectDetailSaga(projectId))
    }, [])

    return (
        <>
            <Header projectDetail={projectDetail} />
            <h3>Cyber Board</h3>
            <Info projectDetail={projectDetail} />
            <Content projectDetail={projectDetail} />
        </>

    );
}

export default PageDetailProject;