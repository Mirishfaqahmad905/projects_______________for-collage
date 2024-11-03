// // src/redux/userSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// // Retrieve user data and login status from localStorage if available
// const savedEmail = localStorage.getItem('email');
// const savedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
// const savedUserData = JSON.parse(localStorage.getItem('userData')) || null;
// const savedAdminId = localStorage.getItem('adminId');
// const savedIsAdminLoggedIn = JSON.parse(localStorage.getItem('isAdminLoggedIn')) || false;

// const initialState = {
//     user: {
//         email: savedEmail || null,
//         data: savedUserData, // Store other user data (if available)
//     },
//     isLoggedIn: savedIsLoggedIn, // Set login status based on localStorage
//     admin: {
//         adminId: savedAdminId || null,
//         isAdminLoggedIn: savedIsAdminLoggedIn, // Set admin login status
//     }
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.user.email = action.payload.email || null;
//             state.user.data = action.payload.data || null; // Store additional user data if available
//             state.isLoggedIn = true;

//             // Save email, login status, and user data to localStorage
//             localStorage.setItem('email', action.payload.email);
//             localStorage.setItem('isLoggedIn', true);
//             if (action.payload.data) {
//                 localStorage.setItem('userData', JSON.stringify(action.payload.data));
//             }
//         },
//         logout: (state) => {
//             state.user.email = null;
//             state.user.data = null;
//             state.isLoggedIn = false;

//             // Clear localStorage when user logs out
//             localStorage.removeItem('email');
//             localStorage.removeItem('isLoggedIn');
//             localStorage.removeItem('userData');
//         },
//          setAdmin:(state,action)=>{
//              state.admin.adminId=action.payload.adminId || null;
//              state.admin.isAdminLoggedIn=true;
//              localStorage.setItem('adminId',action.payload.adminId);
//              localStorage.setItem('isAdminLoggedIn',true);
//          },
//          adminLogOut:(state)=>{
//              state.admin.adminId=null;
//              state.admin.isAdminLoggedIn=false;
//              localStorage.removeItem('adminId');
//              localStorage.removeItem('isAdminLoggedIn');
//          }

//     },
// });
// export const { setUser, logout ,setAdmin,adminLogOut} = userSlice.actions;
// export default userSlice.reducer;

// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Retrieve user and admin data from localStorage if available
const savedEmail = localStorage.getItem('email');
const savedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
const savedUserData = JSON.parse(localStorage.getItem('userData')) || null;
const savedAdminId = localStorage.getItem('adminId');
const savedIsAdminLoggedIn = JSON.parse(localStorage.getItem('isAdminLoggedIn')) || false;

const initialState = {
    user: {
        email: savedEmail || null,
        data: savedUserData, // Store other user data (if available)
    },
    isLoggedIn: savedIsLoggedIn, // Set login status based on localStorage
    admin: {
        adminId: savedAdminId || null,
        isAdminLoggedIn: savedIsAdminLoggedIn, // Set admin login status
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Function to set user login data
        setUser: (state, action) => {
            state.user.email = action.payload.email || null;
            state.user.data = action.payload.data || null; // Store additional user data if available
            state.isLoggedIn = true;

            // Save email, login status, and user data to localStorage
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('isLoggedIn', true);
            if (action.payload.data) {
                localStorage.setItem('userData', JSON.stringify(action.payload.data));
            }
        },
        // Function to log the user out
        logout: (state) => {
            state.user.email = null;
            state.user.data = null;
            state.isLoggedIn = false;

            // Clear localStorage for user data
            localStorage.removeItem('email');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
        },

        // Function to set admin login data
        setAdmin: (state, action) => {
            state.admin.adminId = action.payload.adminId || null;
            state.admin.isAdminLoggedIn = true;

            // Save adminId and admin login status to localStorage
            localStorage.setItem('adminId', action.payload.adminId);
            localStorage.setItem('isAdminLoggedIn', true);
        },
        // Function to log the admin out
        adminLogout: (state) => {
            state.admin.adminId = null;
            state.admin.isAdminLoggedIn = false;

            // Clear localStorage for admin data
            localStorage.removeItem('adminId');
            localStorage.removeItem('isAdminLoggedIn');
        }
    },
});

// Export actions for user and admin login/logout
export const { setUser, logout, setAdmin, adminLogout } = userSlice.actions;
export default userSlice.reducer;
