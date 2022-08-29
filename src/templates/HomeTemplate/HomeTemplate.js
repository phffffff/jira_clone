import SideBar from '../../components/SideBar/SideBar';
import Menu from '../../components/Menu/Menu';
import './HomeTemplate.css';
import Modal from '../../components/Modal/Modal';

function HomeTemplate(props) {
    const { Component } = props;

    return (
        <>
            <div className="jira">
                <SideBar />
                <Menu />
                <div className='main'>
                    <Component />
                </div>
            </div>
            <Modal />
        </>
    );
}

export default HomeTemplate;