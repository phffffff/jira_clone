import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';


import { actionGetProjectApiSaga } from '../../redux/actions/actionProject/actionProjectApi'
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

function PageListProject() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const dispatch = useDispatch();

    const dataApi = useSelector(state => state.stateProject.projectList);

    useEffect(() => {
        dispatch(actionGetProjectApiSaga());
    }, [])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'ID',
            key: 'ID',
            width: '5%',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            // render: (text, record, index) => {
            //     return (
            //         <span>
            //             {+index + 1}
            //         </span>
            //     )
            // }
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: '20%',
            ...getColumnSearchProps('projectName'),
            sorter: (a, b) => {
                return a.projectName?.trim().toLowerCase() < b.projectName?.trim().toLowerCase() ? -1 : 1
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            ...getColumnSearchProps('description'),
            render: (text, record, index) => {
                return (
                    <div dangerouslySetInnerHTML={{ __html: text }} key={record.id} />
                )
            }
        },
        {
            title: 'Project Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '20%',
            ...getColumnSearchProps('categoryName'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <Space key={record.id}>
                        <Button
                            type='primary'
                            size="small"
                            onClick={() => {
                                console.log('edit')
                            }}
                            icon={<i className="fa fa-edit" ></i>}
                        />
                        <Button
                            type='danger'
                            size="small"
                            onClick={() => {
                                console.log('del')
                            }}
                            icon={<i className="fa fa-trash"></i>}
                        />
                    </Space>

                )
            }
        },
    ];
    return (
        <div style={{
            margin: '25px 10px',
            width: (window.innerWidth - window.innerWidth * 0.25),
        }}>
            <h2>List Project</h2>
            <Table columns={columns} rowKey={'id'} key={'id'} dataSource={dataApi} />;
        </div>
    )

};

export default PageListProject;