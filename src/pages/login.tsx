import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase.ts';
import { useLoginMutation } from '../redux/api/userAPI.ts';
import { MessageResponse } from '../types/api-types.ts';

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [login] = useLoginMutation();
const loginHandler=async () => {
    try {
        const provider = new GoogleAuthProvider();

        const { user } = await signInWithPopup(auth, provider);

      const res=  await login({
            name: user.displayName!,
            _id: user.uid,
            gender,
            photo: user.photoURL!,
            email: user.email!,
            dob: date,
            role:"user"
            
      })
        if ("data" in res) {
            toast.success(res.data.message)
        } else {
            const error = res.error as FetchBaseQueryError;
            const message = (error.data as MessageResponse).message;
            toast.error(message);
        }
        
    } catch (error) {
        toast.error("Sign in fail !")
        console.log(error);
        
    }
} 
    return (
        <div className='login'>
      <main>
          <h1 className='heading'>Login</h1>
          <div>
              <label >Gender</label>
              <select value={gender}  onChange={(e) => setGender(e.target.value)}>
                  <option value="" >Select your gender</option>
                  <option value="male" >Male</option>
                  <option value="female" >Female</option>
              </select>
          </div>
          <div>
              <label >Date of Birth</label>
             <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          </div>
          <div>
              <p>Already Signed In Before</p>
              <button onClick={loginHandler}>
                  <FcGoogle/> <span>Sign in with google</span>
              </button>
          </div>
      </main>
      </div>
  )
}

export default Login