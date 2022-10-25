import axios, {AxiosResponse} from "axios";
import {TRequestBody, TRequestType, TResponseBody, TWOid} from "../Types/CommonTypes";
import {
    TAbility,
    TCompanion,
    TComponent,
    TEvent,
    TGatherPoint,
    TLocation,
    TLoot,
    TMapObject,
    TMaterial,
    TMonster,
    TNpc,
    TQuest,
    TQuestItem,
    TQuestItemSource,
    TRecipe,
    TRegion,
    TShop,
    TStaminaElixir,
    TTrainer
} from "../Types/MainEntities";
import {store} from "../redux/store";


// export const baseURL = 'http://127.0.0.1'
// export const baseURL = 'http://localhost'
// export const baseURL = 'http://62.84.122.87'
const getToken = () => store.getState().auth.data.token
// export const baseURL = 'http://92.101.149.85'
export const baseURL = 'http://92.101.176.21'
export const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/api`,
});

const getDataAPI = <D, T extends TRequestType>(uri: string, type: T) => {
    type axRes = TResponseBody<D>
    return {
        getAll: () => instance.get<axRes>(`${uri}/all`, {headers: {"Authorization": `Bearer ${getToken()}`}}).then(data => data.data),
        getOne: (id: string) => instance.get<axRes>(`${uri}/one/${id}`, {headers: {"Authorization": `Bearer ${getToken()}`}}).then(data => data.data),
        addOne: (data: TWOid<D>) => instance.post<axRes, AxiosResponse<axRes>, TRequestBody<T, TWOid<D>>>(
            `${uri}/one`, {
                type: type,
                data: data
            }, {headers: {"Authorization": `Bearer ${getToken()}`}}).then(data => data.data),
        updateOne: (id: string, data: D) => instance.put<axRes, AxiosResponse<axRes>, TRequestBody<T, D>>(
            `${uri}/one/${id}`, {
                type: type,
                data: data
            }, {headers: {"Authorization": `Bearer ${getToken()}`}}).then(data => data.data),
        deleteOne: (id: string) => instance.delete<axRes>(
            `${uri}/one/${id}`, {headers: {"Authorization": `Bearer ${getToken()}`}}).then(data => data.data),
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
