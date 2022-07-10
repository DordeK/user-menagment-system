import React from 'react'
import {client} from '../../../Client'

export default function DeleteModal({id, username, setShowDeleteModal}) {

    const deleteUser = (deleteUserBool) => {
        //TODO: when delete remove from list
        if(deleteUserBool) client.delete(`/user/delete?id=${id}`)
        //TODO: on delete make success message
        document.querySelector("body").style.overflow = 'scroll';
        setShowDeleteModal(false)
    }
  return (
    <div className='deleteModalBox'>
        <h2>Are you sure you want to delete user {username}?</h2>
        <div className='deleteModalButtons'>
            <button onClick={() => deleteUser(true) } type='button' style={{background:'green'}} className='deleteModalButton' >YES</button>
            <button onClick={() => deleteUser(false)} type='button' style={{background:'red'}} className='deleteModalButton' >No</button>
        </div>
    </div>
  )
}
