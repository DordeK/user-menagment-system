import React, {useContext, useEffect, useState} from 'react'
import { MyContext } from '../../GlobalContext'
import { useParams } from "react-router-dom";
import {client} from "../../Client"
import { useNavigate } from 'react-router-dom'; // version 5.2.0

export default function Edituser({params}) {
  let { userId } = useParams();
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const editUserHandler = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const email = e.target.email.value     
    const first_name = e.target.first_name.value     
    const last_name = e.target.last_name.value      
    const password = e.target.password.value

    let {data} = await client.put('/user/edit',{
      id:userId,
      updateData:{
        username,
        email,
        first_name,
        last_name,
        username,
        password
      }
    })

    if (data?.code === "P2002"){
      setError(`User with that ${data.meta.target[0]} already exists. Please input different ${data.meta.target[0]}`)
      return
    }


    if(
      data.username &&
      data.first_name &&
      data.last_name &&
      data.password
    ){
      navigate('/?page=0')
    }
  }


  const {editUser, setEditUser} = useContext(MyContext)
  useEffect(() => {
    const getUser = async () => {
      let {data} = await client.get(`/user/getOne?id=${userId}`)
      setEditUser(data)
    }

    if(!editUser) getUser()
  }, [editUser])
  console.log({editUser});
  return (
    <form className="addUserForm" onSubmit={editUserHandler}>

    <>
      <label htmlFor="username">Username:</label>
      <input defaultValue={editUser?.username} required type="text" id="username" name="user_name"/>
    </>
    <>
      <label htmlFor="email">Email:</label>
      <input defaultValue={editUser?.email} required type="email" id="email" name="email"/>
    </>
    <>
      <label htmlFor="first_name">First name:</label>
      <input defaultValue={editUser?.first_name} required type="text" id="first_name" name="first_name"/>
    </>
    <>
      <label htmlFor="last_name">Last name:</label>
      <input defaultValue={editUser?.last_name} required type="text" id="last_name" name="last_name"/>
    </>
    <>
      <label htmlFor="password">Password:</label>
      <input defaultValue={editUser?.password} required type="password" id="password" name="password"/>
    </>
    {error && 
      <div className='addUserErrorMessage'>
        {error}
      </div>
    }
    <input type="submit" value="Submit"/>
</form>
  )
}
