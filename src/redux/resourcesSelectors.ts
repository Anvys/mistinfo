import {TAppState} from "./store";

export const getMaterialsSelector = (state:TAppState) => state.resources.materials
export const getComponentsSelector = (state:TAppState) => state.resources.components