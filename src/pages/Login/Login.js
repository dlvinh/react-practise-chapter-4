import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    
    const [user,setUser] = useState({userName:"", password:""});
    const [isBlocking,setIsBlocking] = useState (false); // khi false thi se khong back ve duoc

    let navigate = useNavigate();
    console.log("user",user);

    const onSubmitHandler = (e)=>{
        e.preventDefault();
        if (user.userName === "vinh" & user.password === "vinh"){
            // navigate('/home'); // to go back home when login success <=> history.push
            // navigate(-1); // to go back the previous page <=> history.goback
            //If you need to do a replace instead of a push, use navigate('success', { replace: true }). If you need state, use navigate('success', { state }).
            localStorage.setItem('userLogin',JSON.stringify(user));
            navigate('/profile');
        }else{
            alert("login fail");
        }
        /**
         * props mac dinh se duoc created khi dat ben trong Route
         * Use history => xem video de xem cach hoat dong voi history 
         * However, voi version 6 thi react router dom cung cap useNavigate()
         * If you need to do a replace instead of a push, use navigate('success', { replace: true }). If you need state, use navigate('success', { state }).
         */
    }

    return (
        <React.Fragment>
            <div className='container'>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" onChange={(event)=>{
                        
                        setUser({...user,userName:event.target.value})
                    }}/>
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" name="password" id="password" aria-describedby="emailHelpId" placeholder="Password" onChange={(event=>{
                        
                        setUser({...user,password:event.target.value})
                        
                    })}/>
                    <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>
                </form>
            </div>

        </React.Fragment>

    )
}
