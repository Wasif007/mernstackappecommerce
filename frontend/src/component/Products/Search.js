import React, { Fragment, useState } from 'react'
import "./Search.css"
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword]=useState("");
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate("/products")
        }
    }
  return (
    <Fragment>
        <form className='searchBox' onSubmit={onSubmitHandler}>
    <input type='text' placeholder='Enter a Text here...' onChange={e=>{setKeyword(e.target.value)}}/>
     <input type='submit' value="Search"/>
        </form>
       
    </Fragment>
  )
}

export default Search
