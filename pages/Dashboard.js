import style from '../styles/Dashboard.module.css'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React from 'react'
import app from './firebase/clientApp';
import { useEffect,useState } from 'react';


const Search = () => {
    const [searchField,setSearchField] = useState('');

    async function handleSearch(){
        
    }

    return(
        <>
           <div className={style.searchContainer}>
               <input 
               type="text"
               placeholder='Search for movie'
               value={searchField}
               onChange={(e)=>{ setSearchField(e.target.value)}}
               onKeyPress={handleSearch}></input>
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
        <div>
            <Search/>
        </div>
    )
}
