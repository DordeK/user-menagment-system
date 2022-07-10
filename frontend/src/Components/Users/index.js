import React, {useEffect, useState} from 'react'
import {client} from '../../Client'
import UserCard from './UserCard'
import { useSearchParams } from "react-router-dom";
import Pagination from './Pagination'
import SearchBox from './SearchBox'
import FilterField from './FilterField'
import {Link} from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || 0)


  const addSearchQuerrys = (name, value) => {
    let params = new URLSearchParams(document.location.search);
    params.set(name, value)
    setSearchParams(params)
  }

  const addQuerry = (name, value) =>{
    let params = new URLSearchParams(document.location.search);
    if(params.get(name) === value){
       params.delete(name)
    }else{
      params.set(name, value)
    }
    setSearchParams(params)
  }


  const changePage = (pageNumber) => {
    let params = new URLSearchParams(document.location.search);
    params.set('page', pageNumber)

    setSearchParams(params, { replace: true });
  }
  
  useEffect(() => {
    const getUsers = async () => {
      let usersResponse = await client.get(`/user/getAll/?${searchParams.toString()}`)
      setUsers(usersResponse.data, { replace: true })
    }
    getUsers()
    if(!searchParams.get('page')) setSearchParams({page:0}, { replace: true });

  },[page, searchParams])


  return (
    <>
      <div className="header">
        <div className='searchAddUser'>
          <SearchBox addQuerry={addSearchQuerrys}/>
          <Link to="/add" className='addNewUserButton'>
            Add New User
          </Link>
        </div>
        {/* //TODO:fix fileds name positioning with user values */}
        <div className='userFields'>
          <FilterField addQuerry={addQuerry} fieldName='Created at'/>
          <FilterField addQuerry={addQuerry} fieldName='Email'/>
          <FilterField addQuerry={addQuerry} fieldName='First name'/>
          <FilterField addQuerry={addQuerry} fieldName='Last name'/>
          <FilterField addQuerry={addQuerry} fieldName='Username'/>
        </div>
      </div>
      {users.map(user => <UserCard key={user.id} data={user} />)}
      <Pagination changePage={changePage} currentPage={page} />
    </>
  )
}

export default Users