import {
    NO_LOOT,
    TAbilityType,
    TAdventure,
    TBonus,
    TComponentAttributes,
    TComponentType,
    TDrop,
    TDropTypes,
    TGathering,
    TMapPosition,
    TMaterialAttributes,
    TMaterialType,
    TMonsterType,
    TQuestItemPosType,
    TQuestStage,
    TRecipePart,
    TResultType,
    TRewCost,
    TShopContent,
    TStage,
    TTerrain,
    TTranslateData,
    TWeapons
} from "./CommonTypes";

export type TCommonFields = {
    _id: string
    name: string
    translate: TTranslateData
    notes: Array<string>
    link?: string
}
export type TComponent = TResources<TComponentType, TComponentAttributes>
export type TMaterial = TResources<TMaterialType, TMaterialAttributes>
// Main entities
export type TResources<T, U> = TCommonFields & {
    icon: string
    type: T
    durability: number
    craftDifficulty: number
    gatherDifficulty: number
    tier: number
    attributes: U
    goldCost: number
    encumbrance: number
}
export type TNpc = TCommonFields & {
    location: string
    time: string
}
export type TRegion = TCommonFields & {
    terrain: TTerrain
    terrainReq: number
    bound: Array<[number, number]>
    pos: TMapPosition
}
export type TLocation = TCommonFields & {
    exploreReq: number
    quest: string
    pos: TMapPosition
    icon: string
    region: string
    moveTo: string | ''
}
export type TGatherPoint = TCommonFields & {
    icon: string
    type: TGathering
    loot: TLoot | typeof NO_LOOT
    count: number
    cooldown: number
    pos: TMapPosition
    region: string
}
export type TLoot = TCommonFields & {
    loot: Array<TDrop<TDropTypes>>
}
export type TStaminaElixir = TCommonFields & {
    icon: string
    pos: TMapPosition
}
export type TQuestItem = TCommonFields & {
    icon: string
}
export type TTrainer = TCommonFields & {
    type: TAdventure
    difficult: number
    time: number
    cooldown: number
    cost: TRewCost
    reward: TRewCost
    location: string
}
export type TQuest = TCommonFields & {
    type: string
    availableAfter: Array<string>
    startAt: string | 'auto'
    endAt: string | 'auto'
    qStages: Array<TQuestStage>
    loot: TLoot | typeof NO_LOOT
}
export type TEvent = TCommonFields & {
    type: string
    icon: string
    region: string
    eStages: Array<TStage>
    loot: TLoot | typeof NO_LOOT
    pos: TMapPosition
}
export type TShop = TCommonFields & {
    npc: string
    content: Array<TShopContent>
    icon: string
}
export type TMapObject = TCommonFields & {
    icon: string
    pos: TMapPosition
}
export type TAbility = TCommonFields & {
    type: TAbilityType
    level: number
    stamina: number
    cd: number
    effect: string
    icon: string
}
export type TCompanion = TCommonFields & {
    type: 'Human' | 'Transport' | 'Tamed'
    evoType: 'Gold' | 'Silver'
    isBattle: boolean
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
    abilities: Array<TAbility>

    icon: string
}
export type TMonster = TCommonFields & {
    type: TMonsterType
    level: number
    life: number
    stamina: number
    attack: number
    armor: number
    abilities: Array<TAbility>
    loot: TLoot | typeof NO_LOOT
    region: string
    icon: string
}
export type TRecipe = TCommonFields & {
    icon: string
    resultType: TResultType
    parts: Array<TRecipePart>
}
export type TQuestItemPosition = {
    type: TQuestItemPosType,
    position: TMapPosition | TLocation | TMonster
}
export type TQuestItemSource = TCommonFields & {
    posQuestItem: TQuestItemPosition
}