import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TrainerAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TWOid} from "../../Types/CommonTypes";
import {TTrainer} from "../../Types/MainEntities";

const reducerPath = 'mif/trainer'

export type TInitialState = {
    data: Array<TTrainer>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const TrainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TTrainer>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TTrainer>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TTrainer }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TTrainer)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(TrainerThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(TrainerThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(TrainerThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(TrainerThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = TrainerAPI;
const CurSlice = TrainerSlice;
export type TTrainerThunks = typeof TrainerThunks;
export const TrainerThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.trainer = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TTrainer>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TTrainer }, thunkAPI) => {
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
export const {} = TrainerSlice.actions
