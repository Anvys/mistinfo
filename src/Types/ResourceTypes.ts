
export interface IResources<T,U> {
    name: string
    type: T
    durability: number
    difficulty: number
    tier: number
    attributes: U
    goldCost: number
    encumbrance: number
    translate: TTranslateData
}
export type TTranslateLang = 'En' | 'Fr' | 'Ru'
// export type TTranslateLangObj = Partial<Record<TTranslateLang, string>>
export type TTranslateLangObj = {
    En:string,
    Fr?:string,
    Ru?:string
}
export type TTranslateData = TTranslateLangObj
export type TMaterialType = 'Bone' | 'Fiber' | 'Leather' | 'Metal' | 'Stone' | 'Wood'
type TMaterialAttributes = {
    Absorbity: number
    Density: number
    Flexibility: number
    Hardness: number
    Lightness: number
    Purity: number
    Radiance: number
    Rigidity: number
}
export type TMaterials = IResources<TMaterialType, TMaterialAttributes>
type TComponentType = | 'Plant' | 'Gem' | 'Substance' | 'Powder' | 'Sap' | 'Pollen' | 'Artefact'
type TComponentAttributes = {
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
export type TComponents = IResources<TComponentType, TComponentAttributes>

export type TRequestBody = {
    type: 'Component' | 'Material'
    resource: TMaterials | TComponents
}
export type TResponseBody<T> = {
    status: number
    msg: Array<string>
    data: T
}
export type TResponseSingleBody = TResponseBody<Array<TComponents | TMaterials>>
export type TResponseAllBody = TResponseBody<{materials: Array<TMaterials>, components: Array<TComponents>}>
