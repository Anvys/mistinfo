import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {NpcSlice, TNpcThunks} from "./reducers/npcReducer";
import {MaterialSlice, TMaterialThunks} from "./reducers/materialReducer";
import {ComponentSlice, TComponentThunks} from "./reducers/componentReducer";
import {LocationSlice, TLocationThunks} from "./reducers/locationReducer";
import {RegionSlice, TRegionThunks} from "./reducers/regionReducer";
import {MapSlice} from "./reducers/mapReducer";
import {GatherPointSlice, TGatherPointThunks} from "./reducers/gatherPointReducer";


export const store = configureStore({
    reducer: {
        material: MaterialSlice.reducer,
        component: ComponentSlice.reducer,
        npc: NpcSlice.reducer,
        location: LocationSlice.reducer,
        region: RegionSlice.reducer,
        map: MapSlice.reducer,
        gatherpoint: GatherPointSlice.reducer,

    },
})

export type TAppState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TAppDispatch>()

export type TCombineThunks = TMaterialThunks | TComponentThunks | TNpcThunks | TLocationThunks | TRegionThunks | TGatherPointThunks