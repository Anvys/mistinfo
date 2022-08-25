import axios, {AxiosResponse} from "axios";
import {
    TComponents,
    TMaterials, TNpc,
    TRequestBody, TRequestType,
    TResponseAllBody,
    TResponseBody,
    TResResponse
} from "../Types/ResourceTypes";


const baseURL = 'http://127.0.0.1'
const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/api`,
});


type TMatResponse = TResResponse<TMaterials>
type TComResponse = TResResponse<TComponents>
const materialURI = `/materials`
const componentURI = `/components`

const getDataAPI = <D, T extends TRequestType>(uri: string, type: T) => {
    type axRes = TResponseBody<D>
    return {
        getAll: () => instance.get<axRes>(`${uri}/all`).then(data => data.data),
        getOne: (id: string) => instance.get<axRes>(`${uri}/one/:${id}`).then(data => data.data),
        addOne: (data: D) => instance.post<axRes, AxiosResponse<axRes>, TRequestBody<T, D>>(
            `${uri}/one`, {type: type, data: data}).then(data => data.data),
        updateOne: (id: string, data: D) => instance.put<axRes, AxiosResponse<axRes>, TRequestBody<T, D>>(
            `${uri}/one/:${id}`, {type: type, data: data}).then(data => data.data),
        deleteOne: (id: string) => instance.delete<axRes>(
            `${uri}/one/:${id}`).then(data => data.data),
    }
}
export const MaterialAPI = getDataAPI<TMaterials, 'Material'>(`/materials`, 'Material')
export const ComponentAPI = getDataAPI<TComponents, 'Component'>(`/components`, 'Component')
export const NpcAPI = getDataAPI<TNpc, 'Npc'>(`/npc`, 'Npc')
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