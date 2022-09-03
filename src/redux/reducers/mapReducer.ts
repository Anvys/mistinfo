import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {TMapPosition} from "../../Types/CommonTypes";

const reducerPath = 'mif/map'

export type TInitialState = {
    markerForAddPos: TMapPosition
    isAddPosFieldActive: boolean
    addMarkerIcon: string
    addMarkerSize: Array<number>
    markers: {
        location: Array<JSX.Element>
    }
}
const initialState: TInitialState = {
    markerForAddPos: {x:0,y:0},
    isAddPosFieldActive: false,
    addMarkerIcon: require('./../../assets/icons/targetYellow.png'),
    addMarkerSize:[50, 50],
    markers: {
        location: []
    }
}

export const MapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMarkerForAddPos: (state, action: PayloadAction<TMapPosition>) => {
            state.markerForAddPos = action.payload;
        },
        setIsAddPosFieldActive: (state, action: PayloadAction<boolean>) => {
            state.isAddPosFieldActive = action.payload;
        },
        setMarkers: (state, action: PayloadAction<{ type: keyof typeof state.markers, markers: Array<JSX.Element> }>) => {
            state.markers[action.payload.type] = action.payload.markers
        },
        setAddMarkerIcon: (state, action: PayloadAction<{ icon: string}>) => {
            state.addMarkerIcon = action.payload.icon
        },
        setAddMarkerSize: (state, action: PayloadAction<{ size: Array<number>}>) => {
            state.addMarkerSize = action.payload.size
        },
        resetAddMarkerIcon: (state, action: PayloadAction<{ }>) => {
            state.addMarkerIcon = require('./../../assets/icons/targetYellow.png')
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        // builder.addCase(NpcThunks.getAll.fulfilled, (state, action) => {
        // })
        // builder.addCase(NpcThunks.getOne.fulfilled, (state, action) => {
        // })
        // builder.addCase(NpcThunks.updateOne.fulfilled, (state, action) => {
        // })
        // builder.addCase(NpcThunks.deleteOne.fulfilled, (state, action) => {
        // })
    }
})

export type TMapThunks = typeof MapThunks;
export const MapThunks = {
    // getAll: createAsyncThunk(`${reducerPath}/getAll`, async (_, thunkAPI) => {
    //         const res = await CurAPI.getAll()
    //         if (res.data.length) selectFieldsOptions.npc = res.data.map(v => v.name);
    //         if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.init(res.data))
    //     }
    // ),

}


// Action creators are generated for each case reducer function
// export const {} = NpcSlice.actions
