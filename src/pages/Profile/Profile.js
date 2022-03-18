import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';


export default function Profile(props) {

    
    if (localStorage.getItem('userLogin')) {
        return (
            <div>
                My Profile
            </div>
        )
    } else {
        alert("Please login ");
        // Su dung <Navigate> thay cho Redirect in v5
        return <Navigate to="/login" replace={true} />
    }

}
