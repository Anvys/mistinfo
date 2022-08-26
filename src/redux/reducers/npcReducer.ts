import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TNpc, TWOid} from "../../Types/ResourceTypes";
import {NpcAPI} from "../../API/ResourceAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../components/DataAdd/AddFields";
import {ComponentThunks} from "./componentReducer";

const reducerPath = 'mif/npc'

export type TInitialState = {
    data: Array<TNpc>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const NpcSlice = createSlice({
    name: 'npc',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TNpc>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TNpc>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TNpc }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TNpc)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(NpcThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(NpcThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(NpcThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(NpcThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = NpcAPI;
const CurSlice = NpcSlice;
export type TNpcThunks = typeof NpcThunks;
export const NpcThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.npc = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TNpc>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TNpc }, thunkAPI) => {
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
export const {} = NpcSlice.actions
