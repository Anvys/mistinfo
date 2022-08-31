import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TMaterial, TWOid} from "../../Types/ResourceTypes";
import {MaterialAPI} from "../../API/ResourceAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../components/DataAdd/AddFields";

const reducerPath = 'mif/material'

export type TInitialState = {
    data: Array<TMaterial>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const MaterialSlice = createSlice({
    name: 'material',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TMaterial>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TMaterial>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TMaterial }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TMaterial)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(MaterialThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(MaterialThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(MaterialThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(MaterialThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = MaterialAPI;
const CurSlice = MaterialSlice;
export type TMaterialThunks = typeof MaterialThunks;
export const MaterialThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) {
                selectFieldsOptions.material = res.data.map(v => v.name);
                selectFieldsOptions["gatherpoint.Botany"] = res.data.filter(v => v.type === 'Fiber').map(v => v.name)
                selectFieldsOptions["gatherpoint.Hunting"] = res.data.filter(v => (v.type === 'Bone' || v.type === 'Leather')).map(v => v.name)
                selectFieldsOptions["gatherpoint.Mining"] = res.data.filter(v => v.type === 'Metal' || v.type === 'Stone').map(v => v.name)
                selectFieldsOptions["gatherpoint.Lumberjacking"] = res.data.filter(v => v.type === 'Wood').map(v => v.name)
                console.log(selectFieldsOptions)

            }

            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TMaterial>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TMaterial }, thunkAPI) => {
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
export const {} = MaterialSlice.actions
