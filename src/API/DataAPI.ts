import axios, {AxiosResponse} from "axios";
import {
    TAbility, TCompanion,
    TComponent, TEvent,
    TGatherPoint,
    TLocation, TLoot, TMapObject,
    TMaterial, TMonster,
    TNpc, TQuest, TQuestItem, TQuestItemSource, TRecipe,
    TRegion,
    TRequestBody,
    TRequestType,
    TResponseBody,
    TResResponse, TShop, TStaminaElixir, TTrainer,
    TWOid
} from "../Types/CommonTypes";


// export const baseURL = 'http://127.0.0.1'
export const baseURL = 'http://62.84.122.87'
export const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/api`,
});

const getDataAPI = <D, T extends TRequestType>(uri: string, type: T) => {
    type axRes = TResponseBody<D>
    return {
        getAll: () => instance.get<axRes>(`${uri}/all`).then(data => data.data),
        getOne: (id: string) => instance.get<axRes>(`${uri}/one/${id}`).then(data => data.data),
        addOne: (data: TWOid<D>) => instance.post<axRes, AxiosResponse<axRes>, TRequestBody<T, TWOid<D>>>(
            `${uri}/one`, {type: type, data: data}).then(data => data.data),
        updateOne: (id: string, data: D) => instance.put<axRes, AxiosResponse<axRes>, TRequestBody<T, D>>(
            `${uri}/one/${id}`, {type: type, data: data}).then(data => data.data),
        deleteOne: (id: string) => instance.delete<axRes>(
            `${uri}/one/${id}`).then(data => data.data),
    }
}
export const MaterialAPI = getDataAPI<TMaterial, 'Material'>(`/materials`, 'Material')
export const ComponentAPI = getDataAPI<TComponent, 'Component'>(`/components`, 'Component')
export const NpcAPI = getDataAPI<TNpc, 'Npc'>(`/npc`, 'Npc')
export const LocationAPI = getDataAPI<TLocation, 'Location'>(`/location`, 'Location')
export const RegionAPI = getDataAPI<TRegion, 'Region'>(`/region`, 'Region')
export const GatherPointAPI = getDataAPI<TGatherPoint, 'GatherPoint'>(`/gatherpoint`, 'GatherPoint')
export const LootAPI = getDataAPI<TLoot, 'Loot'>(`/loot`, 'Loot')
export const StaminaElixirAPI = getDataAPI<TStaminaElixir, 'StaminaElixir'>(`/staminaelixir`, 'StaminaElixir')
export const EventAPI = getDataAPI<TEvent, 'Event'>(`/event`, 'Event')
export const MapObjectAPI = getDataAPI<TMapObject, 'MapObject'>(`/mapobject`, 'MapObject')
export const QuestAPI = getDataAPI<TQuest, 'Quest'>(`/quest`, 'Quest')
export const RecipeAPI = getDataAPI<TRecipe, 'Recipe'>(`/recipe`, 'Recipe')
export const AbilityAPI = getDataAPI<TAbility, 'Ability'>(`/ability`, 'Ability')
export const MonsterAPI = getDataAPI<TMonster, 'Monster'>(`/monster`, 'Monster')
export const CompanionAPI = getDataAPI<TCompanion, 'Companion'>(`/companion`, 'Companion')
export const QuestItemAPI = getDataAPI<TQuestItem, 'QuestItem'>(`/questitem`, 'QuestItem')
export const QuestItemSourceAPI = getDataAPI<TQuestItemSource, 'QuestItemSource'>(`/questitemsource`, 'QuestItemSource')
export const ShopAPI = getDataAPI<TShop, 'Shop'>(`/shop`, 'Shop')
export const TrainerAPI = getDataAPI<TTrainer, 'Trainer'>(`/trainer`, 'Trainer')
//     {
//     getAll: () => instance.get<TMatResponse>(`${materialURI}/all`).then(data => data.data),
//     getOne: (id: string) => instance.get<TMatResponse>(`${materialURI}/one/:${id}`).then(data => data.data),
//     addOne: (res: TMaterials) => instance.post<TMatResponse, AxiosResponse<TMatResponse>, TRequestBody>(
//         `${materialURI}/one`, {type: "Material", data: res}).then(data => data.data),
//     updateOne: (id: string, res: TMaterials) => instance.put<TMatResponse>(
//         `${materialURI}/one/:${id}`, {type: "Material", resource: res}).then(data => data.data),
//     deleteOne: (id: string) => instance.delete<TMatResponse>(
//         `${materialURI}/one/:${id}`).then(data => data.data),
// }
// export const ComponentAPI =
//     {
//     getAll: () => instance.get<TComResponse>(`${componentURI}/all`).then(data => data.data),
//     getOne: (id: string) => instance.get<TComResponse>(`${componentURI}/one/:${id}`).then(data => data.data),
//     addOne: (res: TMaterials) => instance.post<TComResponse, AxiosResponse<TMatResponse>, TRequestBody>(
//         `${componentURI}/one`, {type: "Material", data: res}).then(data => data.data),
//     updateOne: (id: string, res: TMaterials) => instance.put<TMatResponse>(
//         `${componentURI}/one/:${id}`, {type: "Material", resource: res}).then(data => data.data),
//     deleteOne: (id: string) => instance.delete<TMatResponse>(
//         `${componentURI}/one/:${id}`).then(data => data.data),
// }

// export const ResourceAPI = {
//     // getAll: () => instance.get<TResponseAllBody>('/resource').then(data => data.data),
//
//
//
//     getComponents: () => instance.get<TComResponse>('/components/all').then(data => data.data),
//     getComponent: (name: string) => instance.get<TComResponse>(`/components/one?name=${name}`).then(data => data.data),
//     addComponent: (res: TComponents) => instance.post<TComResponse, AxiosResponse<TComResponse>, TRequestBody>(
//         '/components/one', {type: "Component", resource: res}).then(data => data.data),
//     updateComponent: (name: string, res: TComponents) => instance.put<TComResponse>(
//         `/components/one?name=${name}`, {type: "Component", resource: res}).then(data => data.data),
//     deleteComponent: (name: string) => instance.delete<TComResponse>(
//         `/components/one?name=${name}`).then(data => data.data),
// }