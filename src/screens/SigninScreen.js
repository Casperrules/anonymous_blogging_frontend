import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export default function SigninScreen(props){

    //hooks
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const redirect = props.location.search? props.location.search.split('?')[1]:'/';

    const userSignin = useSelector((state)=>state.userSignin);
    const {userInfo, loading, error}=userSignin;

    const dispatch=useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(signin(email,password));
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo]);

    return(
        <dif>
            <form className="form" onSubmit={submitHandler} >
                
            <div >
                    <h1>
                        Sign In
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="enter e-mail" required onChange={
                        e=>setEmail(e.target.value)
                    }></input>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="enter password" required onChange={
                        e=>setPassword(e.target.value)
                    }></input>
                </div>

                <div>
                    <label />
                    <button className="primary" type="submit">SignIn</button>
                </div>

                <div> 
                    <label />
                    <div>
                        New Customer ? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create new account</Link>
                    </div>
                </div>

            </form>
        </dif>
    )
}