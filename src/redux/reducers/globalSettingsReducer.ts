import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {TTranslateLang} from "../../Types/CommonTypes";

const reducerPath = 'mif/globalSettings'

export type TInitialState = {
    language: TTranslateLang
}
const initialState: TInitialState = {
    language: 'En'
}

export const GlobalSettingsSlice = createSlice({
    name: 'globalSettings',
    initialState,
    reducers: {
        init: (state, action: PayloadAction) => {
            // from local storage
        },
        setLang: (state, action: PayloadAction<TTranslateLang>) => {
            state.language = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

    }
})




// Action creators are generated for each case reducer function

