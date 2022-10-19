import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TWOid} from "../../Types/CommonTypes";
import {MapObjectAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TMapObject} from "../../Types/MainEntities";

const reducerPath = 'mif/mapobject'

export type TInitialState = {
    data: Array<TMapObject>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const MapObjectSlice = createSlice({
    name: 'mapobject',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TMapObject>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TMapObject>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TMapObject }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TMapObject)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(MapObjectThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(MapObjectThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(MapObjectThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(MapObjectThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = MapObjectAPI;
const CurSlice = MapObjectSlice;
export type TMapObjectThunks = typeof MapObjectThunks;
export const MapObjectThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) {
                selectFieldsOptions.mapobject = res.data.map(v => v.name);
            }
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TMapObject>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TMapObject }, thunkAPI) => {
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