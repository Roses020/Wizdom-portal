import axios from 'axios'
import {useContext, useState} from 'react'
import AuthContext from '../store/AuthContext'
import "./Auth.css"

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
    const authCtx = useContext(AuthContext)
    // console.log(authCtx)
    const submitHandler = e => {
        e.preventDefault()

        const body = {
            username,
            password
        }
        axios.post(register ? '/register' : '/login', body)
        .then(({data})=> {
            //console.log('AFTER AUTH', data)
            //console.log(authCtx)
            authCtx.login(data.token, data.exp, data.userId)
        })
        .catch(function (error) {
            setPassword('')
                setUsername('')
            console.log(error);
          });
    
           //console.log('submitHandler called')
       }
    
       return (
           <main className='form_container'>
              <div className='form_div'>
               <form className='form auth-form' onSubmit={submitHandler}>
                   <input
                       type="text"
                       placeholder='username'
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       className='form-input'/>
                   <input
                       type='text'
                       placeholder='password'
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className='form-input'/>
                   <button className='form-btn'>
                       {register ? 'Sign Up' : 'Login'}
               <div className='profilewizardPic'> <img alt="headerpic" src="https://t3.ftcdn.net/jpg/02/47/26/12/360_F_247261221_eGirP3pgZpNU8RY3yRG1qEslnRkNGKCk.jpg"width="600"></img></div>
                   </button>
               </form >
               <button  className='form-btn' onClick={e => setRegister(register ? false : true)}> Need to {register ? 'Login' : 'Sign Up'}?</button>
              </div>
           </main>
       )
    }

export default Auth;