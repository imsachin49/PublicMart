import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.scss'

const rows = [
    {id:11223344,product:'Product-A',name:'Page A',customer:'Customer-1',date:'1 Jan',method:'COD',status:'Approved',amount: 2400,img:'https://randomuser.me/api/portraits/women/19.jpg'},
    {id:11223345,product:'Product-B',name:'Page B',customer:'Customer-2',date:'2 Jan',method:'COD',status:'Approved',amount: 2210,img:'https://randomuser.me/api/portraits/men/21.jpg'},
    {id:11223346,product:'Product-C',name:'Page C',customer:'Customer-3',date:'3 Jan',method:'ONLINE',status:'Pending',amount: 2290,img:'https://randomuser.me/api/portraits/men/68.jpg'},
    {id:11223347,product:'Product-D',name:'Page D',customer:'Customer-4',date:'4 Jan',method:'ONLINE',status:'Approved',amount: 2000,img:'https://randomuser.me/api/portraits/women/90.jpg'},
    {id:11223348,product:'Product-E',name:'Page E',customer:'Customer-5',date:'5 Jan',method:'COD',status:'Pending',amount: 2181,img:'https://randomuser.me/api/portraits/men/81.jpg'},
    {id:11223349,product:'Product-F',name:'Page F',customer:'Customer-6',date:'6 Jan',method:'COD',status:'Approved',amount: 2500,img:'https://randomuser.me/api/portraits/women/71.jpg'},
    {id:11223350,product:'Product-G',name:'Page G',customer:'Customer-7',date:'7 Jan',method:'ONLINE',status:'Approved',amount: 2100,img:'https://randomuser.me/api/portraits/men/39.jpg'},
  ];

const MyTable = () => {
    
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Tracking ID</TableCell>
            <TableCell className='tableCell'>Products</TableCell>
            <TableCell className='tableCell'>Customer</TableCell>
            <TableCell className='tableCell'>Date</TableCell>
            <TableCell className='tableCell'>Amount</TableCell>
            <TableCell className='tableCell'>Payment Method</TableCell>
            <TableCell className='tableCell'>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='imageContainer'>
                  <img src={row.img} alt='img' className='image' />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className='tableCell'>{row.customer}</TableCell>
              <TableCell className='tableCell'>{row.date}</TableCell>
              <TableCell className='tableCell'>{row.amount}</TableCell>
              <TableCell className='tableCell'>{row.method}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MyTable