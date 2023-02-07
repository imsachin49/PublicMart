import React from 'react'
import './Home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/charts/Chart'
import MyTable from '../../components/table/Table'

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />  
    <div className='home-container'>
      <Navbar/>
      <div className='widgets-container'>
         <Widgets type="user"/> 
         <Widgets type="order"/> 
         <Widgets type="earning"/> 
         <Widgets type="balance"/> 
      </div>
      <div className='charts'>
        <Featured />
        <Chart title="last 6 months income" aspect={2/1}/>
      </div>
      <div className='tableContainer'>
        <div className='title'>Recent Transcations</div>
        <MyTable />
      </div>
    </div>
    </div>
  )
}

export default Home
