import { Drawer, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCloseDrawer } from '../redux/actions/actionForm/actionForm';

function DraweHoc(props) {

  const dispatch = useDispatch();
  const { isOpen, componentForm, title, handleSubmit } = useSelector(state => state.stateForm);

  const handleCancel = () => {
    dispatch(actionCloseDrawer());
  };

  return (
    <Drawer
      title={title}
      placement='right'
      width={650}
      onClose={handleCancel}
      visible={isOpen}
      footer={
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Space>
      }
    >
      {componentForm}
    </Drawer>

  );
};

export default DraweHoc;