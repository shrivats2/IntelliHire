import {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.css";


const makeStyle=(status)=>{
  if(status === 'Interview')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Rejected')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable({details}) {

  return (
      <div className="Table">
      <h3 style={{color:"white"}}>Candidate's Applied</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left">Status</TableCell>
                <TableCell>Candidate Name </TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Test Score</TableCell>
                <TableCell align="left">Education</TableCell>
                <TableCell align="left">Projects</TableCell>
                <TableCell align="left">Experience</TableCell>
                <TableCell align="left">Skills</TableCell>
                <TableCell align="left">Achievements</TableCell>
                <TableCell align="left">Coding Profiles</TableCell>
                <TableCell align="left">Test Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {details?.candidates?.map((row) => (
                <TableRow
                  key={row.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.candidate_score} %</TableCell>
                  <TableCell align="left">{row.Education}</TableCell>
                  <TableCell align="left">{row.Projects}</TableCell>
                  <TableCell align="left">{row.Experience}</TableCell>
                  <TableCell align="left">{row.Skills}</TableCell>
                  <TableCell align="left">{row.Achievements}</TableCell>
                  <TableCell align="left">{row["Coding Profile(s)"]}</TableCell>
                  <TableCell align="left">{row["Test Score"]}</TableCell>
                  {/* <TableCell align="left" className="Details">{row.}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}