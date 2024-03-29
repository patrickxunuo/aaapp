import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { queryStatus } from "./service";
import { useNavigate } from "react-router";
import "./styles.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Backdrop,
  CircularProgress,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((s) => s.userReducer);
  const [status, setStatus] = useState(null);

  const loadStatus = () => {
    if (userInfo.uid) {
      queryStatus(userInfo.uid).then((res) => {
        setStatus(res);
      });
    }
  };

  useEffect(loadStatus, [userInfo.uid]);

  return (
    <>
      <div className="status-wrap">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={status === null}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>My Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status?.map((stat, index) => (
              <TableRow
                key={index}
                onClick={() => navigate(`/groups/${stat.group?.id}`)}
                sx={[
                  { cursor: "pointer", transition: "all 300ms ease-in-out" },
                  {
                    "&:hover": {
                      backgroundColor: "#b8c1ec",
                    },
                  },
                ]}
              >
                <TableCell>{stat.group?.name}</TableCell>
                <TableCell>{stat.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Home;
