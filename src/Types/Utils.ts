export enum StatusCodes {
    Ok = 200,


    badRequest = 420,
    notFound = 422,
    duplicateFound = 423,
    multipleFound = 424,
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