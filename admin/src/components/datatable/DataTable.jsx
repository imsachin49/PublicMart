import './Datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import {userColumns,userRows} from '../datatablesource'
import { Link } from 'react-router-dom';

const DataTable = () => {
  const actionColumn = [
    {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                  <Link to='/users/test' style={{textDecoration:'none'}}>
                    <button className='action__view'>View</button>
                  </Link>
                  <Link to='/' style={{textDecoration:'none'}}>
                    <button className='action__delete'>Delete</button>
                  </Link>
                </div>
            )
        }
    }
  ]  
  return (
    <div className='datatable'>
      <div className='dataTableTitle'>Add New User
        <Link to='/users/new' style={{textDecoration:'none'}} className='addBtn'>Add New</Link>
      </div>
        <div style={{ height: 580, width: '100%',boxShadow: "box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"}}>
        <DataGrid
            rows={userRows}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection/>
        </div>
    </div>
  )
}

export default DataTable