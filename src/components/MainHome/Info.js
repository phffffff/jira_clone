import { render } from "@testing-library/react";

function Info({ projectDetail }) {
    let { members } = projectDetail;

    const renderMenber = () => {
        return (
            members?.length && members?.map(member => {
                return (
                    <div className="avatar" key={member.userId}>
                        <img src={member.avatar} alt={member.name} />
                    </div>
                )
            })
        )
    }

    return (
        <div className="info" style={{ display: 'flex', margin: '0px 5px' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderMenber()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    );
}

export default Info;