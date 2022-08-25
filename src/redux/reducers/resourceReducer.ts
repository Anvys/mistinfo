import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    TComponents,
    TMaterials,
    TMaterialType,
    TResResponse,
    TTranslateLangObj,
    TTranslateLangObjFull
} from "../../Types/ResourceTypes";
import {StatusCodes} from "../../Types/Utils";
import {useDispatch} from "react-redux";
import {ComponentAPI, MaterialAPI} from "../../API/ResourceAPI";

export interface CounterState {
    materials: Array<TMaterials>
    isMaterialsInit: boolean
    components: Array<TComponents>
    isComponentsInit: boolean
}

const initialState: CounterState = {
    materials: [{
        _id: '123456789012345678901234',
        name: '',
        type: 'Bone' as TMaterialType,
        durability: 0,
        difficulty: 0,
        tier: 0,
        attributes: {
            Absorbity: 0,
            Density: 0,
            Flexibility: 0,
            Hardness: 0,
            Lightness: 0,
            Purity: 0,
            Radiance: 0,
            Rigidity: 0,
        },
        goldCost: 0,
        encumbrance: 0,
        translate: {En: '',Fr:'', Ru:''} as TTranslateLangObjFull,
    }],
    isMaterialsInit: false,
    components: [],
    isComponentsInit: false,
}

const checkError = (data: TResResponse): boolean => {
    if (data.status !== StatusCodes.Ok) data.msg.forEach(v => console.log(v))

    return data.status === StatusCodes.Ok
}

export const ResourcesThunks = {
    getAllResources: createAsyncThunk('resources/getAll', async (_, thunkAPI) => {
            thunkAPI.dispatch(ResourcesThunks.getMaterials())
            thunkAPI.dispatch(ResourcesThunks.getComponents())
        }
    ),
    getMaterials: createAsyncThunk('resources/getMaterials', async (_, thunkAPI) => {
            const res = await MaterialAPI.getAll()
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.initMaterials(res.data))
        }
    ),
    getComponents: createAsyncThunk('resources/getComponents', async (_, thunkAPI) => {
            const res = await ComponentAPI.getAll()
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.initComponents(res.data))
        }
    ),
    getMaterial: createAsyncThunk('resources/getMaterial', async (id: string, thunkAPI) => {
            const res = await MaterialAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    getComponent: createAsyncThunk('resources/getComponent', async (id: string, thunkAPI) => {
            const res = await ComponentAPI.getOne(id)
            if (checkError(res)) return res.data
        }
    ),
    addMaterial: createAsyncThunk('resources/addMaterial', async (material: TMaterials, thunkAPI) => {
            const res = await MaterialAPI.addOne(material)
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.addMaterial(res.data))
        }
    ),
    addComponent: createAsyncThunk('resources/addComponent', async (component: TComponents, thunkAPI) => {
            const res = await ComponentAPI.addOne(component)
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.addComponent(res.data))
        }
    ),
    updateMaterial: createAsyncThunk('resources/updateMaterial', async (resInfo: { id: string, res: TMaterials }, thunkAPI) => {
            const res = await MaterialAPI.updateOne(resInfo.id, resInfo.res)
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.updateMaterial({
                id: resInfo.id,
                res: resInfo.res
            }))
        }
    ),
    updateComponent: createAsyncThunk('resources/updateComponent', async (resInfo: { id: string, res: TComponents }, thunkAPI) => {
            const res = await ComponentAPI.updateOne(resInfo.id, resInfo.res)
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.updateComponent({
                id: resInfo.id,
                res: resInfo.res
            }))
        }
    ),
    deleteMaterial: createAsyncThunk('resources/deleteMaterial', async (id: string, thunkAPI) => {
            const res = await MaterialAPI.deleteOne(id)
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.deleteMaterial({id: id}))
        }
    ),
    deleteComponent: createAsyncThunk('resources/deleteComponent', async (id: string, thunkAPI) => {
            const res = await ComponentAPI.deleteOne(id)
            if (checkError(res)) thunkAPI.dispatch(resourcesSlice.actions.deleteComponent({id: id}))
        }
    ),
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        initMaterials: (state, action: PayloadAction<Array<TMaterials>>) => {
            console.log('in mat')
            state.materials = [...action.payload];
            state.isMaterialsInit = true;
        },
        initComponents: (state, action: PayloadAction<Array<TComponents>>) => {
            console.log('in comp')
            state.components = [...action.payload];
            state.isComponentsInit = true;
        },
        addMaterial: (state, action: PayloadAction<Array<TMaterials>>) => {
            state.materials.push(action.payload[0])
        },
        addComponent: (state, action: PayloadAction<Array<TComponents>>) => {
            state.components.push(action.payload[0])
        },
        updateMaterial: (state, action: PayloadAction<{ id: string, res: TMaterials }>) => {
            state.materials[state.materials.indexOf(state.materials.find((v) => v.name === action.payload.id) as TMaterials)] = action.payload.res
        },
        updateComponent: (state, action: PayloadAction<{ id: string, res: TComponents }>) => {
            state.components[state.components.indexOf(state.components.find((v) => v.name === action.payload.id) as TComponents)] = action.payload.res
        },
        deleteMaterial: (state, action: PayloadAction<{ id: string }>) => {
            state.materials = state.materials.filter(v => v.name !== action.payload.id)
        },
        deleteComponent: (state, action: PayloadAction<{ id: string }>) => {
            state.components = state.components.filter(v => v.name !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(ResourcesThunks.getAllResources.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.getMaterials.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.getComponents.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.getMaterial.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.getComponent.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.updateMaterial.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.updateComponent.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.deleteMaterial.fulfilled, (state, action) => {
        })
        builder.addCase(ResourcesThunks.deleteComponent.fulfilled, (state, action) => {
        })
    }
})

// Action creators are generated for each case reducer function
export const {initMaterials, initComponents} = resourcesSlice.actions

export default resourcesSlice.reducer