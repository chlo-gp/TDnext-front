import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const Context = createContext({
    user: null,
    token: null
});

function UserContext({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token == null) {
            setUser(null)
            return
        } else {
            axios.get('http://localhost:5000/profile', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(res => {
                setUser(res.data)
            })
        }
    }, [token]);

    const logout = useCallback(() => {
        setUser(null)
        console.log('deco',user)
    }, [])

    return (
        
        <Context.Provider
            value={{ user, token, setUser, setToken, logout }}
        >
            {children}
        </Context.Provider>
    );
}

export const useUser = () => useContext(Context);
export default UserContext;
