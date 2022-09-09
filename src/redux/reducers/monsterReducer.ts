import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TMonster, TWOid} from "../../Types/CommonTypes";
import {MonsterAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";

const reducerPath = 'mif/monster'

export type TInitialState = {
    data: Array<TMonster>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const MonsterSlice = createSlice({
    name: 'monster',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TMonster>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TMonster>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TMonster }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TMonster)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(MonsterThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(MonsterThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(MonsterThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(MonsterThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = MonsterAPI;
const CurSlice = MonsterSlice;
export type TMonsterThunks = typeof MonsterThunks;
export const MonsterThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.monster = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TMonster>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TMonster }, thunkAPI) => {
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
