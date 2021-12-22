import style from '../styles/signin.module.css'
import React, { useState,useEffect } from 'react'
import app from "./firebase/clientApp";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth';
import { BiCameraMovie } from 'react-icons/bi';
import { useRouter } from 'next/router';


export default function Signin() {

    const [user,setUser] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [hasAccount, setHasAccount] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const router = useRouter();

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        signInWithEmailAndPassword(getAuth(app),email,password).then(
            function onSuccess(){
                router.push('/Dashboard');
            }
        )
        .catch((err) => {
            switch(err.code){
                case "auth/invalid-email":
                    setEmailError('invalid email');
                    break;
                case "auth/user-disabled":
                    setEmailError('your account is disabled');
                    break;
                case "auth/user-not-found":
                    setEmailError('User not found');
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        });
    }

    const handleSignup = () => {
        clearErrors();
        console.log(app.name);
        createUserWithEmailAndPassword(getAuth(app),email,password).then(
            function onSuccess(){
                router.push('/join');
            }
        )
        .catch((err) => {
            switch(err.code){
                case "auth/email-already-in-use":
                    setEmailError('Email Already in use');
                    break;
                case "auth/invalid-email":
                    setEmailError('Invalid Email');
                    break;
                case "auth/weak-password":
                    setPasswordError('Password must be atleast 6 Characters long');
                    break;
            }
        });
    }

    

    const authListener = () => {
        onAuthStateChanged(getAuth(),user => {
            if(user){
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        })
    }


    useEffect(() => {
        authListener();
    },[user])

    useEffect(() => {
        
    },[user])

    return (
        <div className={style.signin}>
            <div className={style.signinContainer}>
                <div className={style.signinTitle}>Sign in to CineList<BiCameraMovie color='rgba(93,85,249,255)' size={50} marginLeft='10px'/></div>
                <label>Email</label>
                <input type="text" 
                autoFocus 
                placeholder="Enter Your Email" 
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                ></input>
                <p className={style.error}>{emailError}</p>
           
           <label>password</label>
           <input type="password" 
                placeholder="Enter Your Password" 
                required
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                ></input>
                <p className={style.error}>{passwordError}</p>

                <div className={style.btnContainer}>
                {
                    hasAccount ? (
                        <>
                        <button onClick={handleLogin}>
                            Sign In
                        </button>
                        <p>Don`&#39;`t have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>
                            Sign up
                        </button>
                        <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )
                }
            </div>
            </div>
        </div>
    )
}

