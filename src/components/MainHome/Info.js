function Info() {
    return (
        <div className="info" style={{ display: 'flex', margin: '0px 5px' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src={require("../../assets/img/download (1).jfif")} alt={"../../assets/img/download (1).jfif"} />
                </div>
                <div className="avatar">
                    <img src={require("../../assets/img/download (2).jfif")} alt={"../../assets/img/download (2).jfif"} />
                </div>
                <div className="avatar">
                    <img src={require("../../assets/img/download (3).jfif")} alt={"../../assets/img/download (3).jfif"} />
                </div>
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    );
}

export default Info;