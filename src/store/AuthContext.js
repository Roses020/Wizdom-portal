import {useState, useEffect, useCallback, createContext, useContext } from 'react';

let logoutTimer

const AuthContext = createContext({
    token: '',
    login: () => {},
    logout: () => {},
    userVideos: null,
    saveUserVideos: () => {},
    userId: null

})

const calculateRemainingTime = (exp) => {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}


const getLocalData = () => {
    const storedToken = localStorage.getItem('token')
    const storedExp = localStorage.getItem('exp')
    const storedID = localStorage.getItem('userId')

    const remainingTime = calculateRemainingTime(storedExp)

    if (remainingTime <= 1000 * 60 * 30) {
        localStorage.removeItem('token')
        localStorage.removeItem('exp')
        localStorage.removeItem('userId')
        return null
    }

     return {
        token: storedToken,
        duration: remainingTime,
        userId: storedID
     }

}
 

export const AuthContextProvider = (props) => {
    const localData = getLocalData()

    let initialToken
    let initialId
    if (localData) {
        initialToken = localData.token
        initialId = localData.userId
    }

    const [token, setToken,] = useState(initialToken)
    const [userId, setUserId] = useState(initialId)
    const [userVideos, setUserVideos] = useState(null)


    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationTime')
        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }

    const login = (tok, expiration, user) => {
        //console.log(tok, expiration, user)
        setToken(tok)
        setUserId(user)
        localStorage.setItem('token',tok)
        localStorage.setItem('userId', user)
        localStorage.setItem('exp', expiration)
        const remainingTime = calculateRemainingTime(expiration)
        logoutTimer = setTimeout(logout, remainingTime)
    }
    const saveUserVideos = ( searchResults ) => {
        setUserVideos(searchResults)
    }
   //console.log(login)
   const contextValue = {
    token,
    login,
    logout,
    userVideos,
    saveUserVideos, 
    userId:+userId
   }

   return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
   )
}
    
export default AuthContext