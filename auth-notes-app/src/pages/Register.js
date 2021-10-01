import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import RegisterFormComponent from '../components/RegisterFormComponent';
import AuthContext from '../store/auth-context';

function Register() {
    const {
      setStatusForSuccesfullRegistration,
    } = useContext(AuthContext);

    const history = useHistory();

    const registerUser = formData => {
        axios.post('http://dct-user-auth.herokuapp.com/users/register', formData).then(response => {
            if (response.status === 200) {
                setStatusForSuccesfullRegistration();                
                history.push('/login');
            }
        }).catch(error => {
            console.log(error.message);
        })
    };

    return (
        <div>
            <h2>Register With Us</h2>
            <RegisterFormComponent registerUser={registerUser} />
        </div>
    )
}

export default Register
