import { useSelector } from "react-redux";
import { selectAllUser } from "./userSlice";
import { Link } from "react-router-dom";

import React from 'react'

const UsersList = () => {
    const user = useSelector(selectAllUser);

    const renderedUser = user.map(user => 
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
        )
  return (
      <>
      <h1>Users</h1>
    <ul>{renderedUser}</ul>
    </>
  )
}

export default UsersList