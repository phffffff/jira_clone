function Header({ projectDetail }) {
    const { projectName, description } = projectDetail;
    return (
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">CyberLearn</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {projectName}
                    </li>
                </ol>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </nav>
        </div>
    );
}

export default Header;