import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TComponents, TMaterials} from "../../Types/ResourceTypes";
import {ResourceAPI} from "../../API/ResourceAPI";
import {StatusCodes} from "../../Types/Utils";
import {useDispatch} from "react-redux";

export interface CounterState {
    materials: Array<TMaterials>
    components: Array<TComponents>
}

const initialState: CounterState = {
    materials: [],
    components: [],
}

export const getAllResources = createAsyncThunk(
    'resources/getAll',
    async (_, thunkAPI) => {
        const res = await ResourceAPI.getAll()
        if(res.status !== StatusCodes.Ok) console.log(res.msg[0])
        thunkAPI.dispatch(resourcesSlice.actions.initMaterials(res.data.materials))
        thunkAPI.dispatch(resourcesSlice.actions.initComponents(res.data.components))
        console.log('dispatched')
        // res.data.components.length && initComponents()
        // return res.data
    }
)

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        initMaterials: (state, action: PayloadAction<Array<TMaterials>>) =>{
            console.log('in mat')
            state.materials = [...action.payload];
        },
        initComponents: (state, action: PayloadAction<Array<TComponents>>) =>{
            console.log('in comp')
            state.components = [...action.payload];
        },
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllResources.fulfilled, (state, action) => {
            // Add user to the state array
            // state.materials = [...action.payload.materials];
            // state.components = [...action.payload.components];
        })
    }
})

// Action creators are generated for each case reducer function
export const { initMaterials, initComponents } = resourcesSlice.actions

export default resourcesSlice.reducer