import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TWOid} from "../../Types/CommonTypes";
import {EventAPI, QuestAPI, RegionAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TQuest} from "../../Types/MainEntities";

const reducerPath = 'mif/quest'

export type TInitialState = {
    data: Array<TQuest>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const QuestSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TQuest>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        initSelectArr: (state, action: PayloadAction) => {
            selectFieldsOptions['quest'] = state.data.map(v=>v.name)
        },
        addOne: (state, action: PayloadAction<Array<TQuest>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TQuest }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TQuest)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(QuestThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(QuestThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(QuestThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(QuestThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = QuestAPI;
const CurSlice = QuestSlice;
export type TQuestThunks = typeof QuestThunks;
export const QuestThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) selectFieldsOptions.quest = res.data.map(v=>v.name);
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            thunkAPI.dispatch(CurSlice.actions.initSelectArr())
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TQuest>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TQuest }, thunkAPI) => {
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
