import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TStaminaElixir, TWOid} from "../../Types/CommonTypes";
import {LocationAPI, StaminaElixirAPI} from "../../API/ResourceAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../components/DataAdd/AddFields";

const reducerPath = 'mif/staminaElixir'

export type TInitialState = {
    data: Array<TStaminaElixir>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const StaminaElixirSlice = createSlice({
    name: 'staminaElixir',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TStaminaElixir>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TStaminaElixir>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TStaminaElixir }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TStaminaElixir)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(StaminaElixirThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(StaminaElixirThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(StaminaElixirThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(StaminaElixirThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = StaminaElixirAPI;
const CurSlice = StaminaElixirSlice;
export type TStaminaElixirThunks = typeof StaminaElixirThunks;
export const StaminaElixirThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) {
                // selectFieldsOptions.staminaElixir = res.data.map(v => v.name);
            }
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TStaminaElixir>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TStaminaElixir }, thunkAPI) => {
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