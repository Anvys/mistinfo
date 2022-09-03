import axios, {AxiosResponse} from "axios";
import {
    TComponent, TEvent,
    TGatherPoint,
    TLocation, TLoot, TMapObject,
    TMaterial,
    TNpc,
    TRegion,
    TRequestBody,
    TRequestType,
    TResponseBody,
    TResResponse, TStaminaElixir,
    TWOid
} from "../Types/CommonTypes";


const baseURL = 'http://127.0.0.1'
const port = 3333;
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
//     // getAll: () => instance.get<TResponseAllBody>('/resources').then(data => data.data),
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