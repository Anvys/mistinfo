import axios, {AxiosResponse} from "axios";
import {TMaterials, TRequestBody, TResponseAllBody, TResponseSingleBody} from "../Types/ResourceTypes";


const baseURL = 'http://127.0.0.1'
const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/`,
});

export const ResourceAPI = {
    getAll: () => instance.get<TResponseAllBody>('/All').then(data => data.data),
    addMaterial: (res: TMaterials) => instance.post<TResponseSingleBody, AxiosResponse<TResponseSingleBody>, TRequestBody>('/material', {
        type: "Material",
        resource: res
    }).then(data => data.data)
}