import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './ReviewModal.css'
import {MdReviews} from 'react-icons/md'

const ReviewModal = ({
    onClose,
}) => {

    return (
        <Modal open={()=>{}} onClose={onClose}>
            <Box className="Rcontainer">
                <AiOutlineCloseCircle size={24} className="close" onClick={onClose} />
                <Box className="offer_img">
                    <MdReviews size={24} />
                </Box>
                <Box className="offer_content">
                    <input type="text" placeholder="Title" className="title" />
                    <textarea placeholder="Description" className="description" />
                </Box>
            </Box>
        </Modal>
    )
}

export default ReviewModal
