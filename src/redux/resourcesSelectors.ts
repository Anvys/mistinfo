import {TAppState} from "./store";

export const getMaterialsSelector = (state:TAppState) => state.resources.materials
export const getIsMaterialsInitSelector = (state:TAppState) => state.resources.isMaterialsInit
export const getComponentsSelector = (state:TAppState) => state.resources.components
export const getIsComponentsInitSelector = (state:TAppState) => state.resources.isComponentsInit