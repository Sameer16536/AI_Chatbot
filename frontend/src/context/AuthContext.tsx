
import { ReactNode, createContext, useEffect, useState } from 'react'

type User = {
    name: string;
    email: string;
}
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>
}
const AuthContext = createContext<UserAuth | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(()=>{
        //Fetch if the user cookies are valid then skip login
    },[])

    const login = async(email: string, password: string)=>{

    }

    const signup = async(name:string,email: string, password: string)=>{
        
    }
    const logout = async()=>{
        
    }

}