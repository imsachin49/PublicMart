import React from 'react'
import './Featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Features = () => {
  const percentage = 66;
  return (
    <div className='featured'>
        <div className='top'>
          <div className='title'>Total Avenue</div>
          <MoreVertIcon fontSize='small'/>
        </div>
        <div className='bottom'>
          <div className='featured-chart'>
            <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth='4' />
          </div>
          <p className='title'>Total Sales made today..</p>
          <p className='amount'>$420</p>
          <p className='desc'>
            some text about the sales made today or previous sales..
          </p>
        </div>
        <div className='income'>
          
          <div className='target1'>
            <p className='target-text'>Target</p>
            <div className='target-result positive'>$456.95k
              <KeyboardArrowDownIcon />
            </div>
          </div>

          <div className='target1'>
            <p className='target-text'>Last Week</p>
            <div className='target-result negative'>$456.95k
              <ExpandLessIcon />
            </div>
          </div>
          
          <div className='target1'>
            <p className='target-text'>Last Month</p>
            <div className='target-result positive'>$456.95k
              <KeyboardArrowDownIcon />
            </div>
          </div>

        </div>
    </div>
  )
}

export default Features
