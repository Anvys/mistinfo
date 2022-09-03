import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TGatherPoint, TWOid} from "../../Types/CommonTypes";
import {GatherPointAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";

const reducerPath = 'mif/gatherpoint'

export type TInitialState = {
    data: Array<TGatherPoint>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const GatherPointSlice = createSlice({
    name: 'gatherpoint',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TGatherPoint>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TGatherPoint>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TGatherPoint }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TGatherPoint)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(GatherPointThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(GatherPointThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(GatherPointThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(GatherPointThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = GatherPointAPI;
const CurSlice = GatherPointSlice;
export type TGatherPointThunks = typeof GatherPointThunks;
export const GatherPointThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            // if (res.data.length) selectFieldsOptions.npc = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TGatherPoint>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TGatherPoint }, thunkAPI) => {
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
