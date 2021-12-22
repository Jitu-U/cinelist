import style from '../styles/signin.module.css'
import React, { useState } from 'react'
import { doc, Firestore, getFirestore, setDoc } from 'firebase/firestore'
import app from './firebase/clientApp';
import { getAuth } from 'firebase/auth';
import swal from 'sweetalert';
import { useRouter } from 'next/router';








export default function Join(props) {

    const router = useRouter();

    const [username,setUsername] = useState('');
    const [name,setName] = useState('');

    const handleUser = async () => {
        const db = getFirestore(app);
        const user = {
            email: getAuth(app).currentUser.email,
            name: name,
        };
        await setDoc(doc(db,"users",username),user).then(  ()=> {
            getAuth().currentUser.username = username;
            swal({
                text:"Welcome "+name+" ("+username+")",
                title:"Signed up",
                icon:"success",
                button:{
                    text: "Home"
                }
            });
            router.push('/Dashboard');
        }).catch( (error) =>{

        });
    }

    return (
        <div className={style.signin}>
            <div className={style.signinContainer}>
                <div className={style.signinTitle} style={{fontSize: 'larger'}}> Please introduce yourself</div>
                <label> Select a username</label>
                <input
                type='text'
                placeholder='Ex. johny17'
                autoFocus
                value={username}
                onChange={(e) => { setUsername(e.target.value)}}
                ></input>
                <label> Display Name</label>
                <input
                type='text'
                placeholder='Ex. Johny Depp'
                autoFocus
                value={name}
                onChange={(e) => { setName(e.target.value)}}
                ></input>
                <div className={style.btnContainer}>
                    <button onClick={handleUser}>Join</button>
                </div>
            </div>
        </div>
    )
}
