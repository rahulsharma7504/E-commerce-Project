import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';


const UserDataContext=createContext();

export const UserDataProvider = ({ children }) => {



    // useEffect(() => {
    //     if (localStorage.getItem('user')) {
    //         const storedUser = JSON.parse(localStorage.getItem('user'));
    //         if (storedUser.role === 'user') {

    //         }
    //     }

    // }, []);

    return (
        <UserDataContext.Provider value={{}}>
            {children}
        </UserDataContext.Provider>
    );
};


export const useUserData = () => {
    return useContext(UserDataContext);
  };

