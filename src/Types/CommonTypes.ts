import {selectFieldsOptions} from "./Utils";
import {TShopItemReputation} from "../components/DataAdd/Fields/ShopContentField";

export type TCombineData = TNpc | TRegion | TLocation
    | TMaterial | TComponent | TGatherPoint | TLoot
    | TStaminaElixir | TEvent | TMapObject | TQuest
| TRecipe | TAbility | TCompanion | TMonster | TQuestItem | TQuestItemSource
| TShop

export type TComponent = TResources<TComponentType, TComponentAttributes>
export type TMaterial = TResources<TMaterialType, TMaterialAttributes>

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
    bound: Array<[number, number]>
    pos: TMapPosition
    translate: TTranslateData
}
export type TLocation = {
    _id: string
    name: string
    exploreReq: number
    quest: string
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
export type TExpr = 'or' | 'and'
export type TStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: string
    require: TStageRequire
    time: number
    loot: TLoot | null
}
export type TStageRequire = TRequireAdventure | TRequireQuestItem | TRequireEquip
export type TRequireAdventure = {
    type: TAdventure
    count: number
}
export type TRequireResource = {
    type: TMaterial | TComponent
    count: number
}
export type TQuestItem = {
    _id: string
    name: string
    icon: string

    translate: TTranslateData
    notes: Array<string>
}
export type TQuestItemPosType = typeof selectFieldsOptions['questItem.postype'][number]
export type TQuestItemPosition = {
    type: TQuestItemPosType,
    position: TMapPosition | TLocation | TMonster
}
export type TQuestItemSource = {
    _id: string
    name: string
    posQuestItem: TQuestItemPosition

    translate: TTranslateData
    notes: Array<string>
}
export type TRequireQuestItem = {
    type: TQuestItem
    count: number
}
export type TEquip = {
    recipe: TRecipe
    components:Array<string>
}
export type TRequireEquip = {
    type: TEquip
    count: number
}
export type TEvent = {
    _id: string
    name: string
    type: string
    icon: string
    stages: Array<TStage>
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}
export type TShopContentItem = TRecipe | TAbility | TEquip | undefined
export type TShopContentType = 'Recipe' | 'Ability' | 'Equip' | 'Empty'

export type TReputationRequire = {
    reputation: TShopItemReputation
    count: number
}
export type TShopContent = {
    type: TShopContentType
    item: TShopContentItem
    count: number
    price: number
    reputationRequire: TReputationRequire | null
}
export type TShop = {
    _id: string
    name: string
    npc: string
    content: Array<TShopContent>

    icon: string
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


export type TStagePosType = 'pos' | 'npc' | 'location'
export type TStagePos = TMapPosition | TNpc | TLocation
export type TQuestStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: string
    require: TStageRequire
    timeAvailable: string
    timeSpend: number
    stagePosType: TStagePosType
    stagePos: TMapPosition | TNpc | TLocation
    loot: TLoot | null
}
export type TQuest = {
    _id: string
    name: string
    type: string
    availableAfter: Array<string>
    stages: Array<TQuestStage>
    translate: TTranslateData
    notes: Array<string>
}
export type TAbilityType = 'Passive' | 'Active'
export type TAbility = {
    _id: string
    name: string
    type: TAbilityType
    level: number
    stamina: number
    cd: number
    effect: string
    icon: string
    translate: TTranslateData
    notes: Array<string>
}
export type TSkills = TWeapons | TAdventure | TCrafting | TGathering | TTerrain
export type TBonus = {
    skill: TSkills
    count: number
}
export type TCompanion = {
    _id: string
    name: string
    type: 'Human' | 'Transport' | 'Tamed'
    evoType: 'Gold' | 'Silver'
    levelMax: number
    lifeMax: number
    staminaMax: number
    armorMax: number
    location: string
    evoQuests: Array<string>
    weapon: TWeapons
    weaponMaxSkill: number
    comfort: number
    skills: Array<TBonus>

    icon: string
    translate: TTranslateData
    notes: Array<string>
}
export type TMonsterType = 'Monster' | 'Boss'
export type TMonster = {
    _id: string
    name: string
    type: TMonsterType
    level: number
    life: number
    stamina: number
    attack: number
    armor: number
    abilities: Array<TAbility>
    loot: TLoot | null
    region: string
    icon: string
    translate: TTranslateData
    notes: Array<string>
}
export type TRecipePart = {
    name: string
    component: string
    count: number
}
export type TResultType = TEquipSlot
export type TRecipe = {
    _id: string
    name: string
    icon: string
    type: TCrafting
    resultType: TResultType
    baseReq: number
    parts : Array<TRecipePart>
    translate: TTranslateData
    notes: Array<string>
}



export type TUserType = 'User' | 'Mod' | 'Admin'
export type TUser = {
    _id: string | undefined
    login: string | undefined
    // type: TUserType | undefined
    icon: string
    token: string | undefined
}


export type TWOid<T> = Omit<T, '_id'>


export type TMapPosition = { x: number, y: number }


export type TEquipSlot = 'Helmet'| 'Torso' | 'Glove' | 'Legs' | 'Boots' | 'Weapon' | 'Lantern' | 'Cape' | 'Coat'
    | 'Shirt' | 'Pants' | 'Offhand' | 'Pendant' | 'Ring' | 'Bracelet' | 'Crowns'
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
    Radiam: number
    Stratam: number
}



export type TDropTypes = TComponentType | TMaterialType
export type TDrop<T extends TDropTypes> = {
    type: T
    name: string
    countMin: number
    countMax: number
    chance: number
}


export type TRequestType = 'Material' | 'Component' | 'Npc'
    | 'Location' | 'Region' | 'GatherPoint' | 'Loot'
    | 'StaminaElixir' | 'Event' | 'MapObject' | 'Quest' | 'Recipe' | 'Companion' | 'Ability' | 'QuestItem'
| 'Monster' | 'QuestItemSource' | 'Shop'
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
