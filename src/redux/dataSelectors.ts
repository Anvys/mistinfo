import {TAppState} from "./store";

export const getMaterialsSelector = (state: TAppState) => state.material.data
export const getIsMaterialsInitSelector = (state: TAppState) => state.material.isInit

export const getComponentsSelector = (state: TAppState) => state.component.data
export const getIsComponentsInitSelector = (state: TAppState) => state.component.isInit

export const getNpcSelector = (state: TAppState) => state.npc.data
export const getIsNpcInitSelector = (state: TAppState) => state.npc.isInit

export const getLocationSelector = (state: TAppState) => state.location.data
export const getIsLocationInitSelector = (state: TAppState) => state.location.isInit

export const getRegionSelector = (state: TAppState) => state.region.data
export const getIsRegionInitSelector = (state: TAppState) => state.region.isInit

export const getGatherPointSelector = (state: TAppState) => state.gatherpoint.data
export const getIsInitGatherPointSelector = (state: TAppState) => state.gatherpoint.isInit

export const getLootSelector = (state: TAppState) => state.loot.data
export const getIsLootInitSelector = (state: TAppState) => state.loot.isInit
export const getLootByNameSelector = (name: string)=>(state: TAppState ) => state.loot.data.find(v=>v.name===name)

export const getStaminaElixirSelector = (state: TAppState) => state.staminaElixir.data
export const getIsStaminaElixirInitSelector = (state: TAppState) => state.staminaElixir.isInit

export const getEventSelector = (state: TAppState) => state.event.data
export const getIsEventInitSelector = (state: TAppState) => state.event.isInit

export const getMapObjectSelector = (state: TAppState) => state.mapObject.data
export const getIsMapObjectInitSelector = (state: TAppState) => state.mapObject.isInit

export const getQuestSelector = (state: TAppState) => state.quest.data
export const getIsQuestInitSelector = (state: TAppState) => state.quest.isInit

export const getMarkerForAddPosSelector = (state: TAppState) => state.map.markerForAddPos
export const getIsAddPosFieldActiveSelector = (state: TAppState) => state.map.isAddPosFieldActive
export const getAddMarkerIconSelector = (state: TAppState) => state.map.addMarkerIcon
export const getAddMarkerSizeSelector = (state: TAppState) => state.map.addMarkerSize
export const getMarkersSelector = (state: TAppState) => state.map.markers

export const MapSelectors = {
    isBoundActive:  (state: TAppState) => state.map.isAddBoundsActive,
    getBounds: (state: TAppState) => state.map.bounds,
    isMapActive : (state: TAppState) => state.map.isAddBoundsActive || state.map.isAddPosFieldActive || state.map.isActiveQuestMap,
    getActiveQuest : (state: TAppState) => state.map.activeQuest
}

export const LocationSelectors = {
    isInit: (state: TAppState) => state.location.isInit,
    getData: (state: TAppState) => state.location.data,
}
export const RegionSelectors = {
    isInit: (state: TAppState) => state.region.isInit,
    getData: (state: TAppState) => state.region.data,
}

export type TSelectors =  | typeof QuestItemSelectors | typeof RecipeSelectors
| typeof MonsterSelectors | typeof AbilitySelectors | typeof CompanionSelectors


export const QuestSelectors = {
    isInit: (state: TAppState) => state.quest.isInit,
    getData: (state: TAppState) => state.quest.data,
}
export const StaminaElixirSelectors = {
    isInit: (state: TAppState) => state.staminaElixir.isInit,
    getData: (state: TAppState) => state.staminaElixir.data,
}
export const EventSelectors = {
    isInit: (state: TAppState) => state.event.isInit,
    getData: (state: TAppState) => state.event.data,
}
export const GatherPointSelectors = {
    isInit: (state: TAppState) => state.gatherpoint.isInit,
    getData: (state: TAppState) => state.gatherpoint.data,
}
export const QuestItemSelectors = {
    isInit: (state: TAppState) => state.questItem.isInit,
    getData: (state: TAppState) => state.questItem.data,
}
export const QuestItemSourceSelectors = {
    isInit: (state: TAppState) => state.questItemSource.isInit,
    getData: (state: TAppState) => state.questItemSource.data,
}
export const RecipeSelectors = {
    isInit: (state: TAppState) => state.recipe.isInit,
    getData: (state: TAppState) => state.recipe.data,
}
export const MonsterSelectors = {
    isInit: (state: TAppState) => state.monster.isInit,
    getData: (state: TAppState) => state.monster.data,
}
export const AbilitySelectors = {
    isInit: (state: TAppState) => state.ability.isInit,
    getData: (state: TAppState) => state.ability.data,
}
export const CompanionSelectors = {
    isInit: (state: TAppState) => state.companion.isInit,
    getData: (state: TAppState) => state.companion.data,
}

export const AuthSelectors = {
    isInit: (state: TAppState) => state.auth.isInit,
    getData: (state: TAppState) => state.auth.data.login,
    getUserData: (state: TAppState) => state.auth.data,
}