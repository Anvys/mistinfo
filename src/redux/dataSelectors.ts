import {TAppState} from "./store";

export const getMaterialsSelector = (state:TAppState) => state.material.data
export const getIsMaterialsInitSelector = (state:TAppState) => state.material.isInit

export const getComponentsSelector = (state:TAppState) => state.component.data
export const getIsComponentsInitSelector = (state:TAppState) => state.component.isInit

export const getNpcSelector = (state:TAppState) => state.npc.data
export const getIsNpcInitSelector = (state:TAppState) => state.npc.isInit