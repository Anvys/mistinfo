import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {resourcesSlice} from "./reducers/resourceReducer";
import {NpcSlice} from "./reducers/npcReducer";
import {MaterialSlice} from "./reducers/materialReducer";
import {ComponentSlice} from "./reducers/componentReducer";


export const store = configureStore({
    reducer: {
        // resources: resourcesSlice.reducer,
        material: MaterialSlice.reducer,
        component: ComponentSlice.reducer,
        npc: NpcSlice.reducer,

    },
})

export type TAppState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TAppDispatch>()