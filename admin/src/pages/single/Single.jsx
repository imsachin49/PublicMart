import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/charts/Chart'
import MyTable from '../../components/table/Table'
import './Single.scss'

const Single = () => {
  return (
    <div className='single'>
        <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='edit'>Edit</div>
            <div className='title'>Information</div>
            
            <div className='item'>
              <img src='https://randomuser.me/api/portraits/men/21.jpg' alt='no-item-img' className='itemImg'/>
              <div className='details'>
                <h1 className='detail-name'>David Harry</h1>
                
                <div className='detailItem'>
                  <div className='detailKey'>Email:</div>
                  <div className='detailValue'>&nbsp;davidharry@mail.com</div>
                </div>

                <div className='detailItem'>
                  <div className='detailKey'>Phone:</div>
                  <div className='detailValue'>&nbsp;+91 7352738722</div>
                </div>
                
                <div className='detailItem'>
                  <div className='detailKey'>Address:</div>
                  <div className='detailValue'>&nbsp;Smartcity,Jumpi,Ranchi</div>
                </div>
                
                <div className='detailItem'>
                  <div className='detailKey'>Country:</div>
                  <div className='detailValue'>&nbsp;India</div>
                </div>
              </div>
            </div>

          </div>
          <div className='right'>
            <Chart aspect={3/1} title="User Spending last 6 months." />
          </div>

        </div>

        <div className='bottomb'>
          <div className='title'>Recent Transactions</div>
          <MyTable />
        </div>

      </div>
    </div>
  )
}

export default Single

