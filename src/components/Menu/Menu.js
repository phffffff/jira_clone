import { NavLink } from 'react-router-dom'

function Menu() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require('../../assets/img/download.jfif')} alt='../../assets/img/download.jfif' />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <NavLink to='/Home' className={({ isActive }) => {
                        return isActive ? 'btn text-primary' : 'btn'
                    }}
                        style={{
                            outline: 'none',
                            border: 'none',
                        }}
                    >
                        <i className="fa fa-credit-card" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Cyber Board</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/CreateProject'
                        className={({ isActive }) => {
                            return isActive ? 'btn text-primary' : 'btn'
                        }}
                        style={{
                            outline: 'none',
                            border: 'none',
                        }}>
                        <i className="fa fa-cog" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Project Settings</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/ListProject'
                        className={({ isActive }) => {
                            return isActive ? 'btn text-primary' : 'btn'
                        }}
                        style={{
                            outline: 'none',
                            border: 'none',
                        }}>
                        <i className="fa fa-list" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>List Project</span>
                    </NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <NavLink to='/Releases'
                        className={({ isActive }) => {
                            return isActive ? 'btn text-primary' : 'btn'
                        }}
                        style={{
                            outline: 'none',
                            border: 'none',
                        }}
                    >
                        <i className="fa fa-truck" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Releases</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/Issues_and_filters' className={({ isActive }) => {
                        return isActive ? 'btn text-primary' : 'btn'
                    }} style={{
                        outline: 'none',
                        border: 'none',
                    }}>
                        <i className="fa fa-equals" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Issues and filters</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/Pages' className={({ isActive }) => {
                        return isActive ? 'btn text-primary' : 'btn'
                    }} style={{
                        outline: 'none',
                        border: 'none',
                    }}>
                        <i className="fa fa-paste" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Pages</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/Reports' className={({ isActive }) => {
                        return isActive ? 'btn text-primary' : 'btn'
                    }} style={{
                        outline: 'none',
                        border: 'none',
                    }}>
                        <i className="fa fa-location-arrow" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Reports</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/Component' className={({ isActive }) => {
                        return isActive ? 'btn text-primary' : 'btn'
                    }} style={{
                        outline: 'none',
                        border: 'none',
                    }}>
                        <i className="fa fa-box" />
                        <span style={{
                            paddingLeft: '5px',
                        }}>Components</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Menu;