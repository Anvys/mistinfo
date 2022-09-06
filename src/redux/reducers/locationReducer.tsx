import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TLocation, TWOid} from "../../Types/CommonTypes";
import {LocationAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";

const reducerPath = 'mif/location'

export type TInitialState = {
    data: Array<TLocation>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const LocationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TLocation>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TLocation>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TLocation }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TLocation)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(LocationThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(LocationThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(LocationThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(LocationThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = LocationAPI;
const CurSlice = LocationSlice;
export type TLocationThunks = typeof LocationThunks;
export const LocationThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) {
                selectFieldsOptions.location = res.data.map(v => v.name);
                // console.log(`1`)
                // const dataMarkerArr = [...res.data.map(v=>MC.location(v))]
                // console.log(dataMarkerArr)
                // if(dataMarkerArr.length) thunkAPI.dispatch(MapSlice.actions.setMarkers(
                //     {type:'location', markers:dataMarkerArr}))
                // console.log(`3`)
            }
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TLocation>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TLocation }, thunkAPI) => {
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
// export const {} = NpcSlice.actions
