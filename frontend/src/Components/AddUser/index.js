import React, {useState} from 'react'
import './style.css'
import {client} from '../../Client'
import { useNavigate } from 'react-router-dom';

export default function AddUser() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const addUser = async (e) => {
    e.preventDefault()
  
    const username = e.target.username.value
    const email = e.target.email.value     
    const first_name = e.target.first_name.value     
    const last_name = e.target.last_name.value      
    const password = e.target.password.value

    let response = await client.post('/user/add',{
      username,
      email,
      first_name,
      last_name,
      username,
      password
    })
    if (response.data?.code === "P2002"){
      setError(`User with that ${response.data.meta.target[0]} already exists. Please input different ${response.data.meta.target[0]}`)
      return
    }

    const responseData = response.data

    if(
      responseData.username &&
      responseData.first_name &&
      responseData.last_name &&
      responseData.password
    ){
      navigate('/?page=0')
    }
  }

  return (
    <form className="addUserForm" onSubmit={addUser}>
          <>
            <label htmlFor="username">Username:</label>
            <input required type="text" id="username" name="user_name"/>
          </>
          <>
            <label htmlFor="email">Email:</label>
            <input required type="email" id="email" name="email"/>
          </>
          <>
            <label htmlFor="first_name">First name:</label>
            <input required type="text" id="first_name" name="first_name"/>
          </>
          <>
            <label htmlFor="last_name">Last name:</label>
            <input required type="text" id="last_name" name="last_name"/>
          </>
          <>
            <label htmlFor="password">Password:</label>
            <input required type="password" id="password" name="password"/>
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
