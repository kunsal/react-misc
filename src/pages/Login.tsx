import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { LoginRequest, login } from '../services/auth-service';
import { AxiosError } from 'axios';
import { setTokens, setUserData } from '../store/slices/auth-slice';
import { redirect } from 'react-router-dom';

export type ApiResponse = {
    error: boolean,
    message: string,
    data?: any
}

const Login = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [ e.target.name]: e.target.value});
  }

  useEffect(() => {
    setError('');
  }, [formData])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {email, password} = formData;

    if (email === '' && password === '') {
        setError('Username and password are required');
    } else {
        try {
            const response = await login(formData);
            const tokenData = {
                accessToken: response?.accessToken,
                refreshToken: response?.refreshToken
            } 
            dispatch(setTokens(tokenData));
            delete response.accessToken;
            delete response.refreshToken;
            dispatch(setUserData(response))
            window.location.href = '/create-question';
        } catch (error) {
            setError((((error as AxiosError).response?.data) as ApiResponse).message)
        }
        
    }
  }

  return (
    <div className="d-flex gap-4 flex-column justify-content-center align-items-center mt-4">
        <h1>Login</h1>
        {error.length > 0 && <div className="alert alert-danger">{error}</div> }
        <form className="form d-flex flex-column gap-4">
            <div className="form-group">
                <label htmlFor="email" className="control-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="password" className="control-label">Password</label>
                <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange}/>
            </div>

            
            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </form>
    </div>
  )
}

export default Login