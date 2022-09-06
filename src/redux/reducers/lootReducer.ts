import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TLoot, TWOid} from "../../Types/CommonTypes";
import {LootAPI, RegionAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";

const reducerPath = 'mif/loot'

export type TInitialState = {
    data: Array<TLoot>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const LootSlice = createSlice({
    name: 'loot',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TLoot>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TLoot>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TLoot }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TLoot)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(LootThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(LootThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(LootThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(LootThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = LootAPI;
const CurSlice = LootSlice;
export type TLootThunks = typeof LootThunks;
export const LootThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.loot = res.data.map(v=>v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TLoot>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TLoot }, thunkAPI) => {
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
