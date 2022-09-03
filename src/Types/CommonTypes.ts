export type TCombineData = TNpc | TRegion | TLocation
    | TMaterial | TComponent | TGatherPoint | TLoot
    | TStaminaElixir | TEvent | TMapObject

export type TResources<T, U> = {
    _id: string
    name: string
    icon: string

    type: T
    durability: number
    craftDifficulty: number
    gatherDifficulty: number
    tier: number
    attributes: U
    goldCost: number
    encumbrance: number
    translate: TTranslateData
}
export type TNpc = {
    _id: string
    name: string
    location: string
    time: string
    translate: TTranslateData
}
export type TRegion = {
    _id: string
    name: string
    terrain: TTerrain
    terrainReq: number
    bound: Array<Array<number>>
    pos: TMapPosition
    translate: TTranslateData
}
export type TLocation = {
    _id: string
    name: string
    exploreReq: number
    pos: TMapPosition
    icon: string
    region: string
    translate: TTranslateData
}
export type TGatherPoint = {
    _id: string
    name: string
    icon: string
    type: TGathering
    loot: string
    // drop: Array<TDrop<TDropTypes>>
    count: number
    cooldown: number
    pos: TMapPosition
    region: string
    translate: TTranslateData
    notes: Array<string>
}
export type TLoot = {
    _id: string
    name: string
    loot: Array<TDrop<TDropTypes>>
    translate: TTranslateData
    notes: Array<string>
}
export type TStaminaElixir = {
    _id: string
    name: string
    icon: string
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}
export type TStage = {
    name: string
    type: string
    require: string
    loot: TLoot | null
}
export type TEvent = {
    _id: string
    name: string
    type: string
    stages: Array<TStage>
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}

export type TMapObject = {
    _id: string
    name: string
    icon: string
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}


export type TWOid<T> = Omit<T, '_id'>


export type TMapPosition = { x: number, y: number }

export type TWeapons = 'Axe' | 'Dagger' | 'Mace' | 'Polearm' | 'Staff' | 'Sword';
export type TAdventure = 'Academic' | 'Athletics' | 'Exploration'
    | 'Perception' | 'Persuasion' | 'Strategy' | 'Subterfuge';
export type TCrafting = 'Alchemy' | 'Forge' | 'Herbalism' | 'Sewing' | 'Stoneworking' | 'Tanning' | 'Woodworking'
export type TGathering = 'Botany' | 'Hunting' | 'Lumberjacking' | 'Mining'
export type TTerrain = 'Forest' | 'Mountain' | 'Swamp' | 'Underground' | 'Desert' | 'Mists' | 'Urban'
export type TGuild =
    'Arcanists'
    | 'Circle of the Great Tree'
    | 'Claw Assembly'
    | 'Lunar caravan'
    | 'Mistwalkers'
    | 'Order of the Hippogriff'
    | 'Protector of the Rose'
export type TReputation = 'Gantras' | 'Kortombe' | 'Larcen' | 'Thorval' | 'Wellnear'


export type TTranslateLang = 'En' | 'Fr' | 'Ru'
export type TTranslateLangObj = Partial<Record<TTranslateLang, string>>
export type TTranslateLangObjFull = Record<TTranslateLang, string>

export type TTranslateData = TTranslateLangObjFull//Array<TTranslateLangObj>

export type TMaterialType = 'Bone' | 'Fiber' | 'Leather' | 'Metal' | 'Stone' | 'Wood'
export type TMaterialAttributes = {
    Absorbity: number
    Density: number
    Flexibility: number
    Hardness: number
    Lightness: number
    Purity: number
    Radiance: number
    Rigidity: number
}
export type TMaterial = TResources<TMaterialType, TMaterialAttributes>
export type TComponentType = 'Plant' | 'Gem' | 'Substance' | 'Powder' | 'Sap' | 'Pollen' | 'Artefact'
export type TComponentAttributes = {
    Activator: number
    Binder: number
    Deteriorator: number
    Energizer: number
    Focuser: number
    Fortifier: number
    Putrefier: number
    Stimulator: number
    Toner: number
    Tranquilizer: number
    Elioam: number
    Frimam: number
    Hydram: number
    Lectram: number
    Lithram: number
    Magnam: number
    Psycham: number
    Pyram: number
    Stratam: number
}
export type TComponent = TResources<TComponentType, TComponentAttributes>


export type TDropTypes = TComponentType | TMaterialType
export type TDrop<T extends TDropTypes> = {
    type: T
    name: string
    count: number
    chance: number
}


export type TRequestType = 'Material' | 'Component' | 'Npc'
    | 'Location' | 'Region' | 'GatherPoint' | 'Loot'
    | 'StaminaElixir' | 'Event' | 'MapObject'
export type TRequestBody<T extends TRequestType, D> = {
    type: T
    data: D
}
export type TResponse<T> = {
    status: number
    msg: Array<string>
    data: T
}
export type TResponseBody<T> = {
    status: number
    msg: Array<string>
    data: Array<T>
}
export type TResResponse<T = TComponent | TMaterial> = TResponse<Array<T>>
export type TResponseAllBody = TResponse<{ materials: Array<TMaterial>, components: Array<TComponent> }>


export type KeysOfUnion<T> = T extends T ? keyof T : never;
export type TPrimKeys<T> = keyof T
export type TSubKeys<T> = KeysOfUnion<T[keyof T]>
