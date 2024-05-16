import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentAdmin:null,
    loading:false,
    error:false,
};



const adminSlice= createSlice({
    name:'admin',
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentAdmin=action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFailure:(state,action) =>{
            state.loading=false;
            state.error=action.payload;
        },
        updateUserStart:(state) =>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentAdmin=action.payload;
            state.loading=false;
            state.error=false;
    },
    updateUserFailure:(state,action) =>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteUserStart: (state) => {
        state.loading = true;
      },
      deleteUserSuccess: (state) => {
        state.loading = false;
        state.error = null;
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = { message: action.payload };
      },
    signOut:(state)=>{
        state.currentAdmin=null;
        state.loading=false;
        state.error=false;
    },
    }
})


export const{signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserSuccess,updateUserStart,signOut,deleteUserStart,deleteUserSuccess,deleteUserFailure }=adminSlice.actions;

export default adminSlice.reducer;