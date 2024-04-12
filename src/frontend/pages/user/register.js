import React, { useState } from 'react';
import apiUser from '../../../api/apiUser';
import { useNavigate } from 'react-router-dom';
function Register(){
    const [username, setUserName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [phone, setPhone]=useState("");
    const [address, setAddress]=useState("");

    const navigate = useNavigate();
    const handleSumit = async ()=>{
        try {
            const user = {username: username, address: address, email: email, password: password, phone: phone};
            const response = await apiUser.createUser(user);
            console.log('Registration successful:', response);
            alert ('Registration successful');
            navigate('/');
        } catch (error){
            console.error('Registration error:' , error);
        }
    };
    return(
        <div className="registerForm">
            <h1>Đăng ký</h1>
            <form onSubmit={handleSumit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Họ tên:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={username} onChange={(e)=>setUserName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="phone" className="form-label">Số điện thoại:</label>
                    <input type="text" className="form-control" id="phone" placeholder="Enter phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Địa chỉ:</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address" name="address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
} 

export default Register;