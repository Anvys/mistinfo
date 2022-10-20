import {selectFieldsOptions, TShopContentType} from "./Utils";
import {TShopItemReputation} from "../components/DataAdd/Fields/ShopContentField";
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
} from "./MainEntities";

export const NO_LOOT = '--No loot--' as const
export type TCombineData = TNpc | TRegion | TLocation
    | TMaterial | TComponent | TGatherPoint | TLoot
    | TStaminaElixir | TEvent | TMapObject | TQuest
| TRecipe | TAbility | TCompanion | TMonster | TQuestItem | TQuestItemSource
| TShop | TTrainer

export type TQuestItemPosType = typeof selectFieldsOptions['questItem.postype'][number]

export type TEquip = {
    recipe: TRecipe
    components:Array<string>
}

export type TShopContentItem = TRecipe | TAbility | TEquip | TBook | undefined
export type TBook = {
    skill: TSkills
    count: number
}

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

export type TAbilityType = 'Passive' | 'Active'
export type TSkills = TWeapons | TAdventure | TCrafting | TGathering | TTerrain
export type TBonus = {
    skill: TSkills
    count: number
}
export type TMonsterType = 'Monster' | 'Boss'
export type TRecipePart = {
    name: string
    component: string
    count: number
    type: TCrafting
    baseReq: number
}
export type TResultType = TEquipSlot
export type TRewCost = { type: string, name: string, count: number }


export type TStageRequire = TRequireAdventure | TRequireQuestItem | TRequireEquip | TRequireResource | TRequireKill | TRequireBattle
export type TStageRequireType = 'Adventure' | 'QuestItem' | 'Equip' | 'Resource' | 'Kill' | 'Battle'
export type TRequireAdventure = {
    type: TSkills
    count: number
}
export type TRequireResource = {
    type: TMaterial | TComponent
    count: number
}
export type TRequireKill = {
    type: TMonster
    count: number
}
export type TRequireBattle = {
    type: Array<TMonster>
    count: number
}
export type TRequireEquip = {
    type: TEquip
    count: number
}
export type TRequireQuestItem = {
    type: TQuestItem
    count: number
}
export type TStagePosType = 'pos' | 'npc' | 'location'
export type TStagePos = TMapPosition | TNpc | TLocation
export type TQuestStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: TStageRequireType
    require: TStageRequire
    timeAvailable: string
    timeSpend: number
    stagePosType: TStagePosType
    stagePos: TMapPosition | TNpc | TLocation
    // loot: TLoot | null
}
export type TStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: TStageRequireType
    require: TStageRequire
    time: number
}



export type TExpr = 'or' | 'and'

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

export const translateLang = ['En' , 'Fr' , 'Ru'] as const
export type TTranslateLang = typeof translateLang[number] //'En' | 'Fr' | 'Ru'
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



export type TDropTypes = TComponentType | TMaterialType | 'Book' | 'Reputation'| 'Ability'
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
| 'Monster' | 'QuestItemSource' | 'Shop' | 'Trainer'
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
