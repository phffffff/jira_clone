import SideBar from '../../components/SideBar/SideBar';
import Menu from '../../components/Menu/Menu';
import './HomeTemplate.css';
import Modal from '../../components/Modal/Modal';

function HomeTemplate(props) {
    const { children } = props;

    return (
        <>
            <div className="jira">
                <SideBar />
                <Menu />
                <div className='main'>
                    {children}
                </div>
            </div>
            <Modal />
        </>
    );
}

export default HomeTemplate;