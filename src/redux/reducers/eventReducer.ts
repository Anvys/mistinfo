import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TEvent, TWOid} from "../../Types/CommonTypes";
import {EventAPI, RegionAPI} from "../../API/ResourceAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../components/DataAdd/AddFields";

const reducerPath = 'mif/event'

export type TInitialState = {
    data: Array<TEvent>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TEvent>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TEvent>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TEvent }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TEvent)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(EventThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(EventThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(EventThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(EventThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = EventAPI;
const CurSlice = EventSlice;
export type TEventThunks = typeof EventThunks;
export const EventThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.event = res.data.map(v=>v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TEvent>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TEvent }, thunkAPI) => {
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
