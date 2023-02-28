import React, {useState} from 'react';
import newRequest from '../../utils/axiosRequest';
import {useNavigate} from "react-router-dom";
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<null>(null);

    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await newRequest.post('auth/login', {username, password});
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            console.log(res.data);
            navigate('/')
        } catch (e: any) {
            setError(e.response.data);
        }
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <label htmlFor="">Username</label>
                <input type="text" name='username' placeholder='johndoe' onChange={e => setUsername(e.target.value)}/>

                <label htmlFor="">Password</label>
                <input type="password" name='password' onChange={e => setPassword(e.target.value)}/>

                <button type='submit'>Login</button>
                {error && error}
            </form>
        </div>
    );
};

export default Login;