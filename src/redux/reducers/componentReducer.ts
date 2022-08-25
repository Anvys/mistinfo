import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TComponents} from "../../Types/ResourceTypes";
import {ComponentAPI, NpcAPI} from "../../API/ResourceAPI";
import {checkError} from "../../Unils/utilsFunctions";

const reducerPath = 'mif/component'

export type TInitialState = {
    data: Array<TComponents>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const ComponentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TComponents>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TComponents>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TComponents }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TComponents)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(ComponentThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(ComponentThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(ComponentThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(ComponentThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = ComponentAPI;
const CurSlice = ComponentSlice;
export const ComponentThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TComponents, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TComponents }, thunkAPI) => {
            const res = await CurAPI.updateOne(resInfo.id, resInfo.data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.updateOne({
                id: resInfo.id,
                data: resInfo.data
            }))
        }
    ),
    deleteOne: createAsyncThunk(`${reducerPath}/deleteOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.deleteOne(id)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.deleteOne({id: id}))
        }
    ),
}


// Action creators are generated for each case reducer function
export const {} = ComponentSlice.actions
