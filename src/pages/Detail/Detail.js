import React from 'react'
import { useParams } from 'react-router-dom'
export default function Detail() {
    /**
     * useParams help this componet (aka detail page) get the information from the URL according to parameter from URL 
     *      <Route path="/detail/:id/:name" element={<Detail></Detail>}/>
     * params = {id:...,name:...} 
     * => we can get id or name from the URL
     * 
     */
    let params = useParams(); 
    console.log("params",params);
  return (
    <div>
        Detail: {params.name}
    </div>
  )
}
