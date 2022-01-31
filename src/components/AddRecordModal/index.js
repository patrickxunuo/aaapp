import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  List,
  InputAdornment,
  Switch,
  Typography,
  Stack,
  Select, MenuItem,
  InputLabel,
} from "@mui/material";
import { Form } from "antd";
import {useLocation} from "react-router";
import {queryGroupUsers} from "./service";
import './styles.css'

const AddRecordModal = (props) => {
  const { visible, onClose } = props;
  const [type, setType] = useState(true);
  const [checked, setChecked] = useState([]);
  const [userAmountArr, setUserAmountArr] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [groupUsers, setGroupUsers] = useState([])

  const {pathname} = useLocation()
  const groupId = pathname.split('/')[2]

  const [form] = Form.useForm();

  useEffect(()=>{
    if(groupId){
      queryGroupUsers(groupId).then(res=>{
        setGroupUsers(res)
      })
    }
  },[groupId])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setUserAmountArr((s) => {
        const copyArr = { ...s };
        copyArr[value] = 0;
        return copyArr;
      });
    } else {
      newChecked.splice(currentIndex, 1);
      setUserAmountArr(s=>{
        const copyArr = { ...s };
        delete copyArr[value]
        return copyArr
      })
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        type,
      });
    }
  }, [type]);

  const handleCalculate = useCallback((index) => {
    if (type) {
      if (checked.includes(index)) {
        const average = (totalAmount / checked.length).toFixed(2)
        return average;
      }
      return (0).toFixed(2);
    } else {
      let currentTotal = 0
      for (const [key, value] of Object.entries(userAmountArr)) {
        currentTotal += value
      }
      return (userAmountArr[index]/currentTotal * totalAmount || 0).toFixed(2);
    }
  },[userAmountArr,totalAmount]);

  const onSubmit = async values => {
    console.log(values)
    console.log(userAmountArr)
  }

  return (
    <div>
      <Dialog open={visible} onClose={onClose} fullWidth={true} maxWidth="sm">
        {/*<DialogTitle>New Event</DialogTitle>*/}
        <DialogContent>
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
          >
            <Form.Item name="name">
              <InputLabel>Event</InputLabel>
              <Input sx={{ width: "100%" }} />
            </Form.Item>
            <br/>
            <InputLabel>Type</InputLabel>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variants="h6">Not AA</Typography>
              <Switch
                onChange={() => {
                  setType((m) => !m);
                }}
                checked={type === true}
              />
              <Typography variants="h6">AA</Typography>
            </Stack>
            <br/>
            <Form.Item name="type" initialValue={type} hidden>
              <Switch />
            </Form.Item>
            <Form.Item name="payer">
              <InputLabel>Payer</InputLabel>
              <Select onChange={e=>{
                if(!form) return
                const {value} = e.target
                form.setFieldsValue({
                  payer: value,
                })
              }} sx={{ width: 200 }} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                {groupUsers.map((user, index)=>(
                  <MenuItem key={index} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </Form.Item>
            <br/>
            <Form.Item
              initialValue={totalAmount}
              name="totalAmount"
            >
              <InputLabel>Total Amount</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                step=".01"
                type="number"
                value={totalAmount}
                onChange={(e) => {
                  const { value } = e.target;
                  setTotalAmount(parseInt(value));
                }}
                sx={{ width: "100%" }}
              />
            </Form.Item>
            <br/>
            <Form.Item name="user-list">
              <InputLabel>Participators</InputLabel>
              <List>
                {groupUsers.map((user, index) => {
                  const labelId = `checkbox-list-label-${user.userId}`;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(index)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(index) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={user.name}
                          sx={{width: 200}}
                        />
                        <Input
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          type="number"
                          disabled={!checked.includes(index) || type}
                          sx={{ marginLeft: 10 }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          step=".01"
                          value={userAmountArr[index]}
                          onChange={(e) => {
                            const { value } = e.target;
                            setUserAmountArr((s) => {
                              const copyArr = { ...s };
                              copyArr[index] = parseInt(value);
                              return copyArr;
                            });
                          }}
                        />
                        <Typography ml={10}>
                          {`$${handleCalculate(index)}`}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Form.Item>
            <br/>
            <Form.Item name="remark">
              <InputLabel>Remark</InputLabel>
              <Input sx={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (form) form.submit();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default AddRecordModal;
