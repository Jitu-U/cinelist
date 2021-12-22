import style from '../styles/Dashboard.module.css'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React from 'react'
import app from './firebase/clientApp';
import { useEffect,useState } from 'react';
import {IoIosSearch} from 'react-icons/io'
import { apiKey } from './firebase/clientApp';


const Search = () => {
    const [searchField,setSearchField] = useState('');
    

    
    async function handleSearch(event){
        
            const url = `http://www.omdbapi.com/?s=${searchField}&apikey=${apiKey}`
            const res = await fetch(url);
            const data = await res.json();
    
            if(data){
                console.log(data);
            }
        
       
    }

    return(
        <>
           <div className={style.searchContainer}>
               <input 
               type="text"
               placeholder='Search for movie'
               value={searchField}
               onChange={(e)=>{ setSearchField(e.target.value)}}
               ></input>
               <div className={style.searchButton} onClick={handleSearch}><IoIosSearch style={{color:'white'}} size={25}/> </div>
           </div>
        </>
    )
   }
   




export default function Dashboard() {
    const db = getFirestore(app);
    const user = getAuth().currentUser;
    useEffect(() => {
        if(user != null){
            async function fetch(){
                const snap =  await getDoc(doc(db,"users",user.username));

            }
            fetch();
        } else{
            console.log('No User Logged in');
        }
    }, [])
    return (
        <div className={style.Dashboard}>
            <Search/>
        </div>
    )
}
