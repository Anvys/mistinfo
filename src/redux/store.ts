import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {resourcesSlice} from "./reducers/resourceReducer";


export const store = configureStore({
    reducer: {
        resources: resourcesSlice.reducer
    },
})

export type TAppState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TAppDispatch>()