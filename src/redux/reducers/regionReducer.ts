import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TWOid} from "../../Types/CommonTypes";
import {RegionAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TRegion} from "../../Types/MainEntities";

const reducerPath = 'mif/region'

export type TInitialState = {
    data: Array<TRegion>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const RegionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TRegion>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        initSelectArr: (state, action: PayloadAction) => {
            selectFieldsOptions['region'] = state.data.map(v => v.name)
        },
        addOne: (state, action: PayloadAction<Array<TRegion>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TRegion }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TRegion)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(RegionThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(RegionThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(RegionThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(RegionThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = RegionAPI;
const CurSlice = RegionSlice;
export type TRegionThunks = typeof RegionThunks;
export const RegionThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.region = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            thunkAPI.dispatch(CurSlice.actions.initSelectArr())
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TRegion>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TRegion }, thunkAPI) => {
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
