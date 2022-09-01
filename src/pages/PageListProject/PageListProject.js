import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm, Avatar, Popover, AutoComplete, List } from 'antd';
import { useEffect, useRef, useState, useCallback } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

import {
    actionAssignUserProjectSaga,
    actionDelProjectApiSaga,
    actionGetProjectApiSaga,
    actionRemoveUserFromProjectSaga,
} from '../../redux/actions/actionProject/actionProjectApi';

import { actionOpenDrawer } from '../../redux/actions/actionForm/actionForm';

import FormEditer from '../../components/Form/FormEditer';
import { actionSetProject } from '../../redux/actions/actionProject/actionProject';
import { addMenberWithKeyword } from '../../redux/actions/actionUser/actionUserApi';

function PageListProject() {
    //table
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const searchInput = useRef(null);

    //popover
    const [value, setValue] = useState('');
    const [isClear, setIsClear] = useState(false);

    useEffect(() => {
        dispatch(actionGetProjectApiSaga());
    }, [])

    const searchRef = useRef('null');

    //comfirm => yes
    const handleYesDel = useCallback((id) => {
        dispatch(actionDelProjectApiSaga(id))
    }, [])

    const dispatch = useDispatch();

    const dataApi = useSelector(state => state.stateProject.projectList);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const options = useSelector(state => state.stateUser.storeMenberAdd);

    const handleOnClickAddMenber = (title, chilren, projectId) => {
        return (
            <Popover
                content={
                    <AutoComplete
                        style={{
                            width: '100%',
                        }}
                        value={value}
                        onChange={(value) => { setValue(value) }}
                        options={options?.length && options?.map(item =>
                            ({ label: item.name, value: item.userId.toString() }))}
                        filterOption={(inputValue, option) =>
                            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onSearch={(value) => {
                            if (searchRef.current) {
                                clearTimeout(searchRef.current)
                            }
                            searchRef.current = setTimeout(() => {
                                dispatch(addMenberWithKeyword(value))
                            }, 300)
                        }}
                        onSelect={(value, option) => {
                            setValue(option.label);

                            const data = {
                                projectId,
                                userId: option.value,
                            };
                            dispatch(actionAssignUserProjectSaga(data))
                            setTimeout(() => {
                                setIsClear(true);
                            }, 100)
                        }}
                        allowClear={isClear}
                    />
                }
                title={title}
                trigger="click"
                // onVisibleChange={handleVisibleChange}
                placement={"topLeft"}
            >
                {chilren}
            </Popover>
        )
    }

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

    const listUserFromProject = (members, projectId) => {
        return (
            <List
                dataSource={members}
                renderItem={(item) => (
                    <List.Item key={item.userId}
                        actions={[
                            <Button type="danger" shape="circle"
                                onClick={() => dispatch(actionRemoveUserFromProjectSaga({
                                    projectId: projectId,
                                    userId: item.userId,
                                }))}
                            >X</Button>
                        ]}
                    >
                        <Space>
                            <Avatar src={item.avatar} />
                            {item.name}
                        </Space>
                    </List.Item>
                )}
            />
        )
    }

    const columns = [
        {
            title: 'ID',
            key: 'ID',
            width: '5%',
            dataIndex: 'id',
            sorter: (a, b) => +a.id - +b.id,
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: '20%',
            ...getColumnSearchProps('projectName'),
            render: (text, record, index) => {
                return <NavLink to={`/DetailProject/${record.id}`}>{text}</NavLink>
            }
            ,
            sorter: (a, b) => {
                return a.projectName?.trim().toLowerCase() < b.projectName?.trim().toLowerCase() ? -1 : 1
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
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
            title: 'Menber',
            key: 'menber',
            width: '20%',
            render: (text, record, index) => {
                return (
                    <Space key={record.id}>
                        <Popover
                            content={listUserFromProject(record.members, record.id)}
                            title={"List menber"}
                            placement="topLeft"
                        >
                            <Space>
                                {record?.members?.slice(0, 3).map((member) => {
                                    return <Avatar key={member?.userId} size="small" src={member.avatar} />
                                })}
                                {record?.members?.length > 3 ? <Avatar size="small" >...</Avatar> : ''}
                            </Space>
                        </Popover>

                        {handleOnClickAddMenber('Menber',
                            <Avatar shape="circle" size="small"
                                style={{ cursor: 'pointer' }}
                            >+
                            </Avatar>, record.id
                        )}
                    </Space>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <Space key={record.id}>
                        <Button
                            type='primary'
                            size="small"
                            onClick={() => {
                                dispatch(actionOpenDrawer(<FormEditer />))
                                dispatch(actionSetProject(record))
                            }}
                            icon={<i className="fa fa-edit" ></i>}
                        />
                        <Popconfirm
                            title="Có chắc muốn xóa chứ?"
                            onConfirm={() => handleYesDel(record.id)}
                            onCancel={(e) => { console.log(e) }}
                            okText="Yes"
                            cancelText="Cancel"
                        >
                            <Button
                                type='danger'
                                size="small"
                                icon={<i className="fa fa-trash"></i>}
                            />
                        </Popconfirm>
                    </Space>

                )
            }
        },
    ];
    return (
        <div style={{
            margin: '10px 25px',
            marginBottom: '0px',
            width: (window.innerWidth - window.innerWidth * 0.4),
        }}>
            <h2>List Project</h2>
            <Table columns={columns} rowKey={'id'} key={'id'} dataSource={dataApi} size='small'
            />;
        </div>
    )

};

export default PageListProject;