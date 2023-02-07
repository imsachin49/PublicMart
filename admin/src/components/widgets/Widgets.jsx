import React from 'react'
import './Widgets.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SellIcon from '@mui/icons-material/Sell';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Widgets = ({type}) => {
  let data;
  //nodb
  let amount = 1000;
  let diff = 25;
  switch (type) {
    case 'user':
      data = {
        title: 'USERS',
        isMoney: false,
        link: 'See all user',
        icon: <Person2OutlinedIcon className='icon' 
          style={{
            color:'purple',
            // backgroundColor:'lightblue',
          }} />,
      }
      break;
      case 'order':
      data = {
        title: 'ORDERS',
        isMoney: false,
        link: 'view all orders',
        icon: <SellIcon className='icon'
        style={{
            color:'crimson',
            // backgroundColor:'lightCoral',
          }} />,
      }
      break;
      case 'earning':
      data = {
        title: 'EARNINGS',
        isMoney: true,
        link: 'view net earnings',
        icon: <MonetizationOnIcon className='icon'
        style={{
            color:'cyan',
            // backgroundColor:'lightCyan',
          }} 
         />,
      }
      break;
      case 'balance':
      data = {
        title: 'BALANCE',
        isMoney: true,
        link: 'view all balance',
        icon: <AccountBalanceWalletIcon className='icon'
        style={{
            color:'green',
            // backgroundColor:'lightGreen',
          }} 
        />,
      }
    default:
      break;
  }
  return (
    <div className='widgets'>
        <div className='left'>
          <span className='title'>{data.title}</span>
          <span className='counter'>{data.isMoney && "$"} {amount}</span>
          <span className='link'>{data.link}</span>
        </div>
        <div className='right'>
          <div className='percentage negative'>
            <KeyboardArrowUpIcon />
            {diff}%
          </div>
            {/* <AccountBoxIcon className='icon' /> */}
            {data.icon}
        </div>
    </div>
  )
}

export default Widgets
