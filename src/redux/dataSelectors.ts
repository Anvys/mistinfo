import {TAppState} from "./store";

export const getMaterialsSelector = (state:TAppState) => state.material.data
export const getIsMaterialsInitSelector = (state:TAppState) => state.material.isInit

export const getComponentsSelector = (state:TAppState) => state.component.data
export const getIsComponentsInitSelector = (state:TAppState) => state.component.isInit

export const getNpcSelector = (state:TAppState) => state.npc.data
export const getIsNpcInitSelector = (state:TAppState) => state.npc.isInit

export const getLocationSelector = (state:TAppState) => state.location.data
export const getIsLocationInitSelector = (state:TAppState) => state.location.isInit

export const getRegionSelector = (state:TAppState) => state.region.data
export const getIsRegionInitSelector = (state:TAppState) => state.region.isInit