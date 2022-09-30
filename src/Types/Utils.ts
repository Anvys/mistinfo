export enum StatusCodes {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    LoginSuccess = 203,

    badRequest = 420,
    badId = 421,
    notFound = 422,
    duplicateFound = 423,
    multipleFound = 424,
    unknownError = 499,
}

export const getDefaultFormikValues = (str: string) => {
    switch (str) {
        case 'name':
        case 'En':
        case 'Ru':
        case 'Fr':
        case 'time':
        case 'location':
        case 'terrain':
        case 'icon':
        case 'region':
        case 'type':
            return ''
        case 'count':
        case 'cooldown':
        case 'durability':
        case 'difficulty':
        case 'encumbrance':
        case 'goldCost':
        case 'tier':
        case 'x':
        case 'y':
        case 'terrainReq':
        case 'exploreReq':
        case 'Activator':
        case 'Binder':
        case 'Deteriorator':
        case 'Energizer':
        case 'Focuser':
        case 'Fortifier':
        case 'Putrefier':
        case 'Stimulator':
        case 'Toner':
        case 'Tranquilizer':
        case 'Elioam':
        case 'Frimam':
        case 'Hydram':
        case 'Lectram':
        case 'Lithram':
        case 'Magnam':
        case 'Psycham':
        case 'Pyram':
        case 'Stratam':
        case 'Absorbity':
        case 'Density':
        case 'Flexibility':
        case 'Hardness':
        case 'Lightness':
        case 'Purity':
        case 'Radiance':
        case 'Rigidity':
            return 0
        default:
            console.log(`not defined default formik value for ${str}`)
            return 0
    }
}
export type TSelectFieldsKeys = keyof typeof selectFieldsOptions
export type TAdventureType = typeof selectFieldsOptions['adventure'][number]
export type TWeaponType = typeof selectFieldsOptions['weapon.type'][number]
export type TCraftingType = typeof selectFieldsOptions['crafting'][number]
export type TShopContentType = typeof selectFieldsOptions["shopContentItemTypes"][number]


export const selectFieldsOptions = {
    'material.type': ['Bone', 'Fiber', 'Leather', 'Metal', 'Stone', 'Wood'],
    'material.attributes': ['Absorbity', 'Density', 'Flexibility', 'Hardness', 'Lightness', 'Purity', 'Radiance', 'Rigidity',],
    'component.attributes': [
        'Activator', 'Binder', 'Deteriorator', 'Energizer', 'Focuser', 'Fortifier', 'Putrefier', 'Stimulator', 'Toner',
        'Tranquilizer', 'Elioam', 'Frimam', 'Hydram', 'Lectram', 'Lithram', 'Magnam', 'Psycham', 'Pyram','Radiam', 'Stratam',
    ],
    // 'material.tier': [0, 1, 2, 3, 4, 5],
    'adventure': ['Academic', 'Athletics', 'Exploration', 'Perception', 'Persuasion', 'Strategy', 'Subterfuge'] as const,
    'weapon.type': ['Axe', 'Dagger', 'Mace', 'Polearm', 'Staff', 'Sword'] as const,
    'crafting': ['Alchemy', 'Forge', 'Herbalism', 'Sewing', 'Stoneworking', 'Tanning', 'Woodworking'] as const,
    'reputation.guild': ['Arcanists', 'Circle of the Great Tree', 'Claw Assembly', 'Lunar caravan', 'Mistwalkers', 'Order of the Hippogriff', 'Protector of the Rose'],
    'reputation.town': ['Gantras', 'Kortombe', 'Larcen', 'Thorval', 'Wellnear'],
    'component.type': ['Plant', 'Gem', 'Substance', 'Powder', 'Sap', 'Pollen', 'Artefact'],
    'tier': [0, 1, 2, 3, 4, 5],
    'terrain': ['Forest', 'Mountain', 'Swamp', 'Underground', 'Desert', 'Mists', 'Urban'],
    'gatherpoint.type': ['Botany', 'Hunting', 'Lumberjacking', 'Mining'],
    'event.type':['BlueFlag'],
    'quest.type':['Quest'],
    'stage.type': ['Adventure', 'QuestItem', 'Equip','Resource' ,'Battle', 'Kill'],
    'eStage.type': ['Adventure', 'Resource', 'Battle'],
    'stage.expr': ['or', 'and'],
    'stage.postype': ['pos' , 'npc' , 'location'],
    'questItem.postype': ['pos' , 'monster' , 'location'] as const,

    'ability.type': ['Passive' , 'Active'],
    'monster.type' : ['Monster' , 'Boss'],
    'recipe.type' : ['Alchemy' , 'Forge' , 'Herbalism' , 'Sewing' , 'Stoneworking' , 'Tanning' , 'Woodworking'],
    'resultType' : ['Helmet', 'Torso' , 'Glove' , 'Legs' , 'Boots' , 'Weapon' , 'Lantern' , 'Cape' , 'Coat'
        , 'Shirt' , 'Pants' , 'Offhand' , 'Pendant' , 'Ring' , 'Bracelet' , 'Crowns'],
    'companion.type': ['Human' , 'Transport' , 'Tamed'],
    'evoType': ['Gold' , 'Silver'],
    'weapon' : ['Axe', 'Dagger', 'Mace', 'Polearm', 'Staff', 'Sword'],
    'equip': ['Helmet', 'Torso' , 'Glove' , 'Legs' , 'Boots' , 'Weapon' , 'Lantern' , 'Cape' , 'Coat'
    , 'Shirt' , 'Pants' , 'Offhand' , 'Pendant' , 'Ring' , 'Bracelet' , 'Crowns'],
    // 'ability.type': [],
    'shopContentItemTypes': ['Recipe' , 'Ability' , 'Equip' , 'Empty', 'Book'] as const,
    'currency':['Gold', 'Aureate Claw'],


    'material': undefined as Array<string> | undefined,
    'component': undefined as Array<string> | undefined,
    'location': undefined as Array<string> | undefined,
    'region': undefined as Array<string> | undefined,
    'npc': undefined as Array<string> | undefined,
    'loot': undefined as Array<string> | undefined,
    'event': undefined as Array<string> | undefined,
    'mapobject': undefined as Array<string> | undefined,
    'quest': undefined as Array<string> | undefined,
    'recipe': undefined as Array<string> | undefined,
    'monster': undefined as Array<string> | undefined,
    'ability': undefined as Array<string> | undefined,
    'companion': undefined as Array<string> | undefined,
    'questitem': undefined as Array<string> | undefined,
    'questitemsource': undefined as Array<string> | undefined,
    'shop': undefined as Array<string> | undefined,
    'trainer': undefined as Array<string> | undefined,


    'gatherpoint.Botany': undefined as Array<string> | undefined,
    'gatherpoint.Hunting': undefined as Array<string> | undefined,
    'gatherpoint.Lumberjacking': undefined as Array<string> | undefined,
    'gatherpoint.Mining': undefined as Array<string> | undefined,
}
export const getSkillsArr = ()=>[...selectFieldsOptions["adventure"], ...selectFieldsOptions["weapon"],
    ...selectFieldsOptions["crafting"], ...selectFieldsOptions["terrain"],...selectFieldsOptions["gatherpoint.type"]]