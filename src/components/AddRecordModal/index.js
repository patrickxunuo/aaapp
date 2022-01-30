import React, { useEffect, useState } from "react";
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
  Stack, Box, LinearProgress,
} from "@mui/material";
import { Form } from "antd";
import LinearProgressWithLabel from "../../LinearProgressWithLabel";

const AddRecordModal = (props) => {
  const { visible, onClose } = props;
  const [mode, setMode] = useState(true);
  const [checked, setChecked] = useState([]);
  const [userAmountArr, setUserAmountArr] = useState([])
  const [totalAmount, setTotalAmount] = useState(0);
  const [progress, setProgress] = useState(10);

  const [form] = Form.useForm();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        mode,
      });
    }
  }, [mode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCalculate = (index) => {
    if(mode){
      if(checked.includes(index)){
        return (totalAmount/checked.length).toFixed(2)
      }
      return 0
    }
  }

  return (
    <div>
      <Dialog open={visible} onClose={onClose}  fullWidth={true} maxWidth="xs">
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <Form
            form={form}
            onFinish={(values) => {
              console.log(values);
            }}
            layout="vertical"
          >
            <Stack direction="row" spacing={2}   alignItems="center">
              <Typography variants="h6">Not AA</Typography>
              <Switch
                onChange={() => {
                  setMode((m) => !m);
                }}
                checked={mode === true}
              />
              <Typography variants="h6">AA</Typography>
            </Stack>
            {/*{*/}
            {/*  !mode &&*/}
            {/*  <LinearProgressWithLabel value={10} />*/}
            {/*}*/}
            <Form.Item name="mode" initialValue={mode} hidden>
              <Switch />
            </Form.Item>
            <Form.Item label="Participators" name="user-list">
              <List >
                {[0, 1, 2, 3].map((value,index) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem key={value} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={`Item ${value + 1}`}
                        />
                          <Input disabled={mode} sx={{ marginLeft: 10}} onClick={e=>e.stopPropagation()}/>
                          <Typography ml={10} >
                            {`$${handleCalculate(index)}`}
                          </Typography>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Form.Item>
            <Form.Item
              initialValue={totalAmount}
              label="Total Amount"
              name="totalAmount"
            >
              <Input
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                type="number"
                value={totalAmount}
                onChange={e=>{
                  const {value} = e.target
                  setTotalAmount(value)
                }}
                sx={{width: '100%'}}
              />
            </Form.Item>
            <Form.Item name="name" label="Remarks">
              <Input sx={{width: '100%'}}/>
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
