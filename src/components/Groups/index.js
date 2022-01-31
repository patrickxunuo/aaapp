import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {queryGroup, queryGroupEvents} from "./service";
import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import './styles.css'
import {useNavigate} from "react-router";

const handleAmountDisplay = (event, userId) => {
  if(event.payer?.userId===userId) return '+'+event.payer.amount
  const debtRecord = event.debtor.find(d=>d.userId===userId)
  if(debtRecord) return '-' + debtRecord.amount
  return 0
}

const Groups = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null)
  const [group, setGroup] = useState(null)
  const {id: groupId} = useParams()

  useEffect(() => {
    if(groupId){
      queryGroup(groupId).then(res=>{
        setGroup(res)
      })
      queryGroupEvents(groupId).then(res=>{
        setEvents(res)
      })
    }
  }, [groupId]);

  return (
    <>
    <div className={group===null?"group-container loading":"group-container"}>
      <Breadcrumbs sx={{padding: 2 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={()=>navigate('/')}>
          Home
        </Link>
        <Typography
          underline="hover"
          color="inherit"
        >
          {group?.name}
        </Typography>
      </Breadcrumbs>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={group===null}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Total Amount</TableCell>
            {
              group?.users?.map((user,index)=>(
                <TableCell key={index}>
                  {user.name}
                </TableCell>
              ))
            }
            <TableCell>Remark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events?.map((event,index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                  {event.eventName}
              </TableCell>
              <TableCell>
                {event.type}
              </TableCell>
              <TableCell>
                {event.totalAmount}
              </TableCell>
              {
                group?.users?.map((user,index)=>(
                  <TableCell key={index}>
                    {handleAmountDisplay(event, user.userId)}
                  </TableCell>
                ))
              }
              <TableCell>{event.remark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>
  )
}

export default Groups
