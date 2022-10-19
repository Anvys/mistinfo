import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TWOid} from "../../Types/CommonTypes";
import {NpcAPI, QuestItemAPI, QuestItemSourceAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TQuestItemSource} from "../../Types/MainEntities";

const reducerStr = 'questItemSource'
const reducerPath = `mif/${reducerStr}`

export type TInitialState = {
    data: Array<TQuestItemSource>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const QuestItemSourceSlice = createSlice({
    name: reducerStr,
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TQuestItemSource>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TQuestItemSource>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TQuestItemSource }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TQuestItemSource)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(QuestItemSourceThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(QuestItemSourceThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(QuestItemSourceThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(QuestItemSourceThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = QuestItemSourceAPI;
const CurSlice = QuestItemSourceSlice;
export type TQuestItemSourceThunks = typeof QuestItemSourceThunks;
export const QuestItemSourceThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.questitemsource = res.data.map(v => v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TQuestItemSource>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TQuestItemSource }, thunkAPI) => {
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
