import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TWOid} from "../../Types/CommonTypes";
import {ComponentAPI} from "../../API/DataAPI";
import {checkError} from "../../Unils/utilsFunctions";
import {selectFieldsOptions} from "../../Types/Utils";
import {TComponent} from "../../Types/MainEntities";

const reducerPath = 'mif/component'

export type TInitialState = {
    data: Array<TComponent>
    isInit: boolean
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
}

export const ComponentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TComponent>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        addOne: (state, action: PayloadAction<Array<TComponent>>) => {
            state.data.push(action.payload[0])
        },
        updateOne: (state, action: PayloadAction<{ id: string, data: TComponent }>) => {
            state.data[state.data.indexOf(state.data.find((v) => v._id === action.payload.id) as TComponent)] = action.payload.data
        },
        deleteOne: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(v => v._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(ComponentThunks.getAll.fulfilled, (state, action) => {
        })
        builder.addCase(ComponentThunks.getOne.fulfilled, (state, action) => {
        })
        builder.addCase(ComponentThunks.updateOne.fulfilled, (state, action) => {
        })
        builder.addCase(ComponentThunks.deleteOne.fulfilled, (state, action) => {
        })
    }
})

const CurAPI = ComponentAPI;
const CurSlice = ComponentSlice;
export type TComponentThunks = typeof ComponentThunks;
export const ComponentThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
            const res = await CurAPI.getAll()
            if (res.data.length) {
                selectFieldsOptions.component = res.data.map(v => v.name);
                // selectFieldsOptions["gatherpoint.Botany"] = selectFieldsOptions["gatherpoint.Botany"] === undefined
                //     ? res.data.filter(v => v.type === 'Plant' || v.type === 'Pollen').map(v => v.name)
                //     : selectFieldsOptions["gatherpoint.Botany"]?.concat(res.data.filter(v => v.type === 'Plant' || v.type === 'Pollen').map(v => v.name))

            }
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
        }
    ),
    getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
            const res = await CurAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TComponent>, thunkAPI) => {
            const res = await CurAPI.addOne(data)
            if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
        }
    ),
    updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TComponent }, thunkAPI) => {
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
export const {} = ComponentSlice.actions
