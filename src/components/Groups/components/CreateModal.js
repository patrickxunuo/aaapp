import {DrawerForm, ProFormGroup, ProFormList, ProFormText} from "@ant-design/pro-form";
import {Button, message, Space, Tooltip} from 'antd'
import React from "react";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import './styles.css'
import {useSelector} from "react-redux";
import {inviteToGroup} from "../service";
import {Box, SwipeableDrawer} from "@mui/material";

// const CreateModal = () => {
//   const userInfo = useSelector(s => s.userReducer)
//
//   return (
//     <DrawerForm
//       width={300}
//       className="create-form"
//       title="Create new group"
//       drawerProps={{
//         destroyOnClose: true,
//       }}
//       onFinish={async values => {
//         console.log(values);
//         // inviteToGroup()
//         message.success('提交成功');
//         // 不返回不会关闭弹框
//         return true;
//       }}
//       trigger={
//         <Tooltip placement="top" title={'Create Group'}>
//           <Button shape="circle" icon={<PlusOutlined/>}/>
//         </Tooltip>
//       }
//       submitter={{
//         // Configure the button text
//         searchConfig: {
//           resetText: 'Cancel',
//           submitText: 'Submit',
//         },
//       }}
//     >
//       <Space direction="vertical" style={{padding: 20, width: '100%'}}>
//       <div>Email</div>
//       <ProFormList
//         name="user"
//         copyIconProps={false}
//         deleteIconProps={false}
//         alwaysShowItemLabel={false}
//         creatorButtonProps={{
//           creatorButtonText: 'Add new user',
//         }}
//         initialValue={[{email: userInfo.email}]}
//       >
//         {
//           (record, index, {remove}) => {
//             return (
//               <Space direction="horizontal">
//                 <ProFormText
//                   width="xl"
//                   name='email'
//                   disabled={index === 0}
//                 />
//                 {
//                   index !== 0 &&
//                   <DeleteOutlined onClick={() => remove(index)}/>
//                 }
//               </Space>
//             )
//           }
//         }
//       </ProFormList>
//       </Space>
//     </DrawerForm>
//   )
// }

const CreateModal = (props) => {
  const {visible, onClose} = props
  return (
    <SwipeableDrawer
      anchor="right"
      open={visible}
      onClose={onClose}
    >
      <Box>

      </Box>
    </SwipeableDrawer >
  )
}

export default CreateModal
