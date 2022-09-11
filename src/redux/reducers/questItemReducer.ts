import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TQuestItem, TWOid} from "../../Types/CommonTypes";
import {NpcAPI, QuestItemAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";

const reducerStr = 'questItem'
const reducerPath = `mif/${reducerStr}`

export type TInitialState = {
    data: Array<TQuestItem>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const QuestItemSlice = createSlice({
    name: reducerStr,
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TQuestItem>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TQuestItem>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TQuestItem }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TQuestItem)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(QuestItemThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(QuestItemThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(QuestItemThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(QuestItemThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = QuestItemAPI;
const CurSlice = QuestItemSlice;
export type TQuestItemThunks = typeof QuestItemThunks;
export const QuestItemThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.questitem = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TQuestItem>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TQuestItem }, thunkAPI) => {
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
