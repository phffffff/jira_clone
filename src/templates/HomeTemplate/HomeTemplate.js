import SideBar from '../../components/SideBar/SideBar';
import Menu from '../../components/Menu/Menu';
import './HomeTemplate.css';
import InfoModal from '../../components/Modal/InfoModal';
import SearchModal from '../../components/Modal/SearchModal';

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
            <InfoModal />
            <SearchModal />
        </>
    );
}

export default HomeTemplate;