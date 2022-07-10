import React, {useState, useContext} from 'react'
import './styles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'; // version 5.2.0
import { MyContext } from '../../GlobalContext'

export default function UserCard({data}) {
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)
    const navigate = useNavigate()
    const {setEditUser} = useContext(MyContext)


    const openModal = () => {
        document.querySelector("body").style.overflow = 'hidden';
        //TODO: make background black
        // document.querySelector("body").style.ba = 'hidden';
        setShowDeleteModal(true)
    }


  return (
    <div className="cardBox">
        <div className="cardField">
            <div>{new Date(data.created_at).toLocaleString().split(',')[0]}</div>
            <div>{new Date(data.created_at).toLocaleString().split(',')[1]}</div>
        </div>
        <div className="cardField">
            <div>{data.email}</div>
        </div>
        <div className="cardField">
            <div>{data.first_name}</div>
        </div>
        <div className="cardField">
            <div>{data.last_name}</div>
        </div>
        <div className="cardField">
            <div>{data.username}</div>
        </div>
        <div>
            <DeleteIcon className="deleteIcon" onClick={() => openModal()}/>
            <EditIcon className="editIcon" onClick={() => {
                setEditUser(data)
                navigate(`/edit/${data.id}`)
            }}/>
        </div>
        {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} id={data.id} username={data.username} />}
    </div>
  )
}
