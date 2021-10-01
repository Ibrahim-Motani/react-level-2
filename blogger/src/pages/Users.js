import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const link = `https://jsonplaceholder.typicode.com/users`;

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(link)
            .then(response => {
                const result = response.data;
                setUsers(result);
            }).catch(error => {
                console.log(error.message);
            });
     }, []);

    return (
        <ul>
            <h2>Listing Users - { users.length}</h2>
            {users.map(user => {
                return (
                  <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </li>
                );
            })}
        </ul>
    );
}

export default Users;
