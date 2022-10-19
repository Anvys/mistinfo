import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TWOid} from "../../Types/CommonTypes";
import {CompanionAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TCompanion} from "../../Types/MainEntities";

const reducerPath = 'mif/companion'

export type TInitialState = {
    data: Array<TCompanion>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const CompanionSlice = createSlice({
    name: 'companion',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TCompanion>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TCompanion>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TCompanion }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TCompanion)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(CompanionThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(CompanionThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(CompanionThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(CompanionThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = CompanionAPI;
const CurSlice = CompanionSlice;
export type TCompanionThunks = typeof CompanionThunks;
export const CompanionThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.companion = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TCompanion>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TCompanion }, thunkAPI) => {
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


