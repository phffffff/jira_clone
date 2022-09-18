import { NavLink } from 'react-router-dom'
import {
    SearchOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd'
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { actionOpenDrawer } from '../../redux/actions/actionForm/actionForm';
import FormCreateTask from '../Form/FormCreateTask';

const { Sider } = Layout;
const { Item } = Menu;

// const items = [
//     { label: 'User', key: 'user', icon: < UserOutlined />, onClick: () => console.log("helo") },
//     { label: 'Search', key: 'searchIssue', icon: < SearchOutlined />, onClick: () => console.log("helo") },
//     {
//         label: 'Create', key: 'createIssue', icon: < PlusOutlined />, onClick: () => {

//             console.log('helo')
//         }
//     },
// ]

function SideBar() {
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    const itemsRef = useRef([
        { label: 'User', key: 'user', icon: < UserOutlined />, onClick: () => console.log("helo") },
        { label: 'Search', key: 'searchIssue', icon: < SearchOutlined />, onClick: () => console.log("helo") },
        {
            label: 'Create', key: 'createIssue', icon: < PlusOutlined />, onClick: () => {
                dispatch(actionOpenDrawer({
                    component: <FormCreateTask />,
                    title: 'Create task'
                })
                );
            }
        },
    ])

    return (
        // <div className="sideBar">
        //     <div className="sideBar-top">
        //         <div className="sideBar-icon">
        //             <i className="fab fa-jira" />
        //         </div>
        //         <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
        //             <i className="fa fa-search" />
        //             <span className="title">SEARCH ISSUES</span>
        //         </div>
        //         <div className="sideBar-icon">
        //             <NavLink to='/CreateProject'>
        //                 <i className="fa fa-plus" />
        //                 <span className="title">CREATE ISSUES</span>
        //             </NavLink>
        //         </div>
        //     </div>
        //     <div className="sideBar-bottom">
        //         <div className="sideBar-icon">
        //             <i className="fa fa-question-circle" />
        //             <span className="title">ABOUT</span>
        //         </div>
        //     </div>
        // </div>
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                width={'130px'} className='bg-primary'
            >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='bg-primary' items={itemsRef.current} />
            </Sider>
        </>
    );
}

export default SideBar;