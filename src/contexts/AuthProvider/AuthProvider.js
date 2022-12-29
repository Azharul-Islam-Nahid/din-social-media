import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import Loading from '../../Components/UseLoader/Loading';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }






    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            console.log("🚀 ~ file: AuthProvider.js ~ line 36 ~ unsubscribe ~ 'user observing'")
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const { data: userData = [], isLoading, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <Loading />;
    }



    const authInfo = {
        createUser,
        signIn,
        updateUser,
        logOut,
        user,
        loading,
        userData,
        refetch
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;