import { Drawer, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCloseDrawer } from '../redux/actions/actionForm/actionForm';

function DraweHoc({ isOpen }) {

  const dispatch = useDispatch();
  const { componentForm, title, handleSubmit, handleReset } = useSelector(state => state.stateForm);

  const handleCancel = () => {
    dispatch(actionCloseDrawer());
    handleReset();
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
          <Button type="primary" onClick={() => {
            handleSubmit();

            dispatch(actionCloseDrawer());
          }}>
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