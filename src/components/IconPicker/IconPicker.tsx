import React, {useState} from 'react';
import styles from './IconPicker.module.css';
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";


export const iconUrlPicker = (folder: string, icon: string) => {

    if (icon === 'Unknown') return require(`./../../assets/icons/location/Unknown.png`)
    const str = `./../../assets/icons/${folder}/${icon}.png`
    // console.log(folder)
    // return require(`./../../assets/icons/${folder}/${icon}.png`)
    switch (folder) {
        // case 'location':
        //     return require(`./../../assets/icons/location/${icon}.png`)
        // case 'mapobject':
        //     return require(`./../../assets/icons/mapobject/${icon}.png`)
        // case 'material/Wood':
        //     return require(`./../../assets/icons/material/Wood/${icon}.png`)
        case 'mapGather_Tree':
            return require(`./../../assets/icons/mapGather/wood/${icon}.png`)
        case 'mapGather_Boulder':
            return require(`./../../assets/icons/mapGather/boulder/${icon}.png`)
        case 'mapGather_Animal':
            return require(`./../../assets/icons/mapGather/animal/${icon}.png`)
        case 'mapGather_Herb':
            return require(`./../../assets/icons/mapGather/herb/${icon}.png`)
        case 'mapGather_Ore':
            return require(`./../../assets/icons/mapGather/ore/${icon}.png`)
        case 'mapGather_Plant':
            return require(`./../../assets/icons/mapGather/plant/${icon}.png`)

        case 'resource_Bone':
            return require(`./../../assets/icons/resource/bone/${icon}.png`)
        case 'resource_Fiber':
            return require(`./../../assets/icons/resource/fiber/${icon}.png`)
        case 'resource_Leather':
            return require(`./../../assets/icons/resource/leather/${icon}.png`)
        case 'resource_Metal':
            return require(`./../../assets/icons/resource/metal/${icon}.png`)
        case 'resource_Stone':
            return require(`./../../assets/icons/resource/stone/${icon}.png`)
        case 'resource_Wood':
            return require(`./../../assets/icons/resource/wood/${icon}.png`)

        case 'component_Artifact':
            return require(`./../../assets/icons/component/artifact/${icon}.png`)
        case 'component_Gem':
            return require(`./../../assets/icons/component/gem/${icon}.png`)
        case 'component_Pollen':
            return require(`./../../assets/icons/component/pollen/${icon}.png`)
        case 'component_Powder':
            return require(`./../../assets/icons/component/powder/${icon}.png`)
        case 'component_Sap':
            return require(`./../../assets/icons/component/sap/${icon}.png`)
        case 'component_Substance':
            return require(`./../../assets/icons/component/substance/${icon}.png`)

        default : {
            console.error(`FAILED ICON PICK:: folder: ${folder}/ icon: ${icon}`)
            // return require()
        }
    }
}
const iconData = {
    // location: ['Unknown'],
    // material: ['Wood/t1', 'Wood/t2', 'Wood/t3', 'Wood/t4'],
    // // material: ['t1','t2','t3','t4'],
    // component: [],
    // mapobject:['CityAranbourg','CityEnorwen','CityGiltanbourg2','CityKortombourgNew',
    // 'CityQuara','CityThorgbourg',],
    mapGather_Tree: ['Tree-1-Grown_olf', 'Tree-1-Grown_pan', 'Tree-1-Grown_salancedre', 'Tree-1-Grown_supon',
        'Tree-2-Grown_acacia', 'Tree-2-Grown_chanderene', 'Tree-2-Grown_chomne', 'Tree-2-Grown_erilid', 'Tree-2-Grown_Korupto',
        'Tree-3-Grown_elvinos', 'Tree-3-Grown_exanese', 'Tree-3-Grown_gurdismo', 'Tree-3-Grown_melize', 'Tree-3-Grown_solone',
        'Tree-4-Grown_mif', 'Tree-4-Grown_nuertesilicio', 'Tree-4-Grown_ociosto', 'Tree-4-Grown_salandrin',
        'Tree-5-Grown_azulio', 'Tree-5-Grown_soletto',
    ],
    mapGather_Boulder: [
        'Boulder-1-Ardosite_boulder', 'Boulder-1-Blancite_boulder', 'Boulder-1-Gresotis_boulder', 'Boulder-1-Marnite_boulder',
        'Boulder-2-Argilu_boulder', 'Boulder-2-Diorite_boulder', 'Boulder-2-Granita_boulder', 'Boulder-2-Marbrane_boulder', 'Boulder-2-Ridantite_rock',
        'Boulder-3-Borm_boulder', 'Boulder-3-Grimalroc_boulder', 'Boulder-3-Lanferite_boulder', 'Boulder-3-Marapis_boulder',
        'Boulder-4-Lithosnow_boulder', 'Boulder-4-Oceanite_boulder', 'Boulder-4-Simblior_boulder', 'Boulder-4-Xuran_boulder',
        'Boulder-5-Grimalpure_boulder', 'Boulder-5-Palvable_boulder', 'Boulder-5-Volcanite_boulder', 'Boulder-5-Yrrandanilde_boulder',
    ],
    mapGather_Animal: [
        'Animal-1-Boar', 'Animal-1-Buffalo', 'Animal-1-Deer', 'Animal-1-Hare',
        'Animal-2-Auroch', 'Animal-2-Bear', 'Animal-2-Larcen_Hare', 'Animal-2-Marebouc', 'Animal-2-Varan',
        'Animal-3-Chimeric_eagle', 'Animal-3-Mountain_bear', 'Animal-3-Root_boar', 'Animal-3-Wolf',
        'Animal-4-Black_bear', 'Animal-4-Mountain_deer', 'Animal-4-Red_hill_bear', 'Animal-4-Wodjik_boar',
        'Animal-5-Darkblade_Deer', 'Animal-5-Green_bear',
    ],
    mapGather_Herb: [
        'Herb-1-Wild_chinvre', 'Herb-1-Wild_jot', 'Herb-1-Wild_lan', 'Herb-1-Wild_ortas',
        'Herb-2-Wild_caton', 'Herb-2-Wild_doussoie', 'Herb-2-Wild_jutug', 'Herb-2-Wild_lanos', 'Herb-2-Wild_ridilande',
        'Herb-3-Wild_blacknester', 'Herb-3-Wild_Cirous', 'Herb-3-Wild_mohus', 'Herb-3-Wild_olkznar',
        'Herb-4-Wild_araknol', 'Herb-4-Wild_goldnester', 'Herb-4-Wild_huberois', 'Herb-4-Wild_massilan',
        'Herb-5-Wild_bemesoft', 'Herb-5-Wild_kingnester', 'Herb-5-Wild_lanosap',
    ],
    mapGather_Ore: [
        'Ore-1-Branzos_ore', 'Ore-1-Feros_ore', 'Ore-1-Kutel_ore', 'Ore-1-Laidor_ore',
        'Ore-2-Aciel_ore', 'Ore-2-Aziblue_ore', 'Ore-2-Eliandel_ore', 'Ore-2-Kulivrine_ore', 'Ore-2-Odiemel_ore',
        'Ore-3-Arkinik_Ore', 'Ore-3-Domane_ore', 'Ore-3-Sorontile_ore', 'Ore-3-Swarpver_ore', 'Ore-3-Zincol_ore',
        'Ore-4-Blueroc_ore', 'Ore-4-Orus_ore', 'Ore-4-Silvanil_ore', 'Ore-4-Soraverse_ore',
        'Ore-5-Galandor_ore', 'Ore-5-Icyluxa_ore', 'Ore-5-Titanron_ore',
    ],
    mapGather_Plant: [
        'Plant-1-Carouge', 'Plant-1-Eperviere', 'Plant-1-Killasadra', 'Plant-1-Morinette', 'Plant-1-Orchis', 'Plant-1-Papyrus', 'Plant-1-Safran', 'Plant-1-Tricinias', 'Plant-1-Varacias', 'Plant-1-Viperines',
        'Plant-2-Allecorde', 'Plant-2-Cascardent', 'Plant-2-Grondanite', 'Plant-2-Julno', 'Plant-2-Limotarsus', 'Plant-2-Mandradon', 'Plant-2-Maredoce', 'Plant-2-Morilla', 'Plant-2-Nordinia', 'Plant-2-Russule',
        'Plant-3-Amphrose', 'Plant-3-Antracienne', 'Plant-3-Brindor', 'Plant-3-Maladivienne', 'Plant-3-Mazhevite', 'Plant-3-Mortalese', 'Plant-3-Ruidel', 'Plant-3-Sinerane', 'Plant-3-Slork', 'Plant-3-Valarianne',
        'Plant-4-Blimfroid', 'Plant-4-Hicko', 'Plant-4-Julso', 'Plant-4-Norl', 'Plant-4-Plianto', 'Plant-4-Qualso', 'Plant-4-Quilla', 'Plant-4-Rudulux', 'Plant-4-Savouran', 'Plant-4-Tresaima',
        'Plant-5-Brulm', 'Plant-5-Couantila', 'Plant-5-Evilli', 'Plant-5-Firenina', 'Plant-5-Illogia', 'Plant-5-Killjulu', 'Plant-5-Nouni', 'Plant-5-Pilisilla', 'Plant-5-Purila', 'Plant-5-Trollusan',
    ],

    resource_Bone: [
        'Bone-1-Heavy_bone', 'Bone-1-Light_bone', 'Bone-1-Soft_bone', 'Bone-1-Solid_bone',
        'Bone-2-Absorbent_bone', 'Bone-2-Ghostly_bone', 'Bone-2-Rigid_bone', 'Bone-2-Strong_bone',
        'Bone-3-Conductive_bone', 'Bone-3-Demonic_bone', 'Bone-3-Radiant_bone', 'Bone-3-Stiff_bone',
        'Bone-4-Draconian_bone', 'Bone-4-Luminous_bone', 'Bone-4-Mighty_bone', 'Bone-4-Resilient_bone', 'Bone-4-Resonating_bone',
        'Bone-5-Elemental_bone', 'Bone-5-Incorruptible_Bone', 'Bone-5-Petrificatus_bone', 'Bone-5-Tentacle_bone',
    ],
    resource_Fiber: [
        'Fiber-1-Chinvre', 'Fiber-1-Jot', 'Fiber-1-Lan', 'Fiber-1-Ortas',
        'Fiber-2-Caton', 'Fiber-2-Doussoie', 'Fiber-2-Jutug', 'Fiber-2-Lanos', 'Fiber-2-Ridilande',
        'Fiber-3-Blacknester', 'Fiber-3-Cirous', 'Fiber-3-Mohair', 'Fiber-3-Olkznar',
        'Fiber-4-Araknol', 'Fiber-4-Goldnester', 'Fiber-4-Huberois', 'Fiber-4-Massilan',
        'Fiber-5-Bemesoft', 'Fiber-5-Kingnester', 'Fiber-5-Lanosap', 'Fiber-5-Wontalagu',
    ],
    resource_Leather: [
        'Leather-1-Boar_leather', 'Leather-1-Buffalo_leather', 'Leather-1-Deer_leather', 'Leather-1-Hare_leather',
        'Leather-2-Auroch_leather', 'Leather-2-Bear_leather', 'Leather-2-Larconic_leather', 'Leather-2-Marebouc_leather', 'Leather-2-Varan_leather',
        'Leather-3-Chimeric_leather', 'Leather-3-Mountain_leather', 'Leather-3-Root_leather', 'Leather-3-Wolf_leather',
        'Leather-4-Blackbear_leather', 'Leather-4-Mounking_leather', 'Leather-4-Red_leather', 'Leather-4-Wodjik_leather',
        'Leather-5-Algunar', 'Leather-5-Darkblade_Leather', 'Leather-5-Scarpelskin', 'Leather-5-Ursigreen_leather',
    ],
    resource_Metal: [
        'Metal-1-Branzos', 'Metal-1-Feros', 'Metal-1-Kutel', 'Metal-1-Laidor',
        'Metal-2-Aciel', 'Metal-2-Aziblue', 'Metal-2-Eliandel', 'Metal-2-Kulivrine', 'Metal-2-Odiemel',
        'Metal-3-Arkinik', 'Metal-3-Domane', 'Metal-3-Sorontile', 'Metal-3-Swarpver', 'Metal-3-Zincol',
        'Metal-4-Blueroc', 'Metal-4-Orus', 'Metal-4-Silvanil', 'Metal-4-Soraverse',
        'Metal-5-Elorinal', 'Metal-5-Galandor', 'Metal-5-Icyluxa', 'Metal-5-Titanron',
    ],
    resource_Stone: [
        'Stone-1-Ardosite', 'Stone-1-Blancite', 'Stone-1-Gresotis', 'Stone-1-Marnite',
        'Stone-2-Argilu', 'Stone-2-Diorite', 'Stone-2-Granita', 'Stone-2-Marbrane', 'Stone-2-Ridantite',
        'Stone-3-Borm', 'Stone-3-Grimalroc', 'Stone-3-Lanferite', 'Stone-3-Marapis',
        'Stone-4-Lithosnow', 'Stone-4-Oceanite', 'Stone-4-Simblior', 'Stone-4-Xuran',
        'Stone-5-Grimalpure', 'Stone-5-Palvable', 'Stone-5-Volcanite', 'Stone-5-Yrrandanilde',
    ],
    resource_Wood: [
        'Wood-1-Olf', 'Wood-1-Pan', 'Wood-1-Salancedre', 'Wood-1-Supon',
        'Wood-2-Acacia', 'Wood-2-Chanderene', 'Wood-2-Chomne', 'Wood-2-Erilid', 'Wood-2-Korupto',
        'Wood-3-Elvinos', 'Wood-3-Exanese', 'Wood-3-Gurdismo', 'Wood-3-Melize', 'Wood-3-Solone',
        'Wood-4-Mif', 'Wood-4-Nuertesilicio', 'Wood-4-Ociosto', 'Wood-4-Salandrin',
        'Wood-5-Azulio', 'Wood-5-Grusson', 'Wood-5-Soletto',
    ],

    component_Artifact: [
        'Artefact-Brim_effigy', 'Artefact-Effigy_of_Boen', 'Artefact-Effigy_of_Fira',
        'Artefact-Effigy_of_Ghur', 'Artefact-Effigy_of_Nirm', 'Artefact-Effigy_of_Ocra',
        'Artefact-Effigy_of_Pior', 'Artefact-Effigy_of_Xiru', 'Artefact-Effigy_of_Zius',
        'Artefact-Lodo_effigy', 'Artefact-Sair_effigy', 'Artefact-Ward_effigy',
    ],
    component_Gem:[
        'Gem-1-Ambranos', 'Gem-1-Amethile', 'Gem-1-Azurelle', 'Gem-1-Cassinette', 'Gem-1-Citrinil', 'Gem-1-Grenato', 'Gem-1-Hemolianel', 'Gem-1-Malichone',
        'Gem-2-Morganate', 'Gem-2-Obsidelle', 'Gem-2-Onyxil', 'Gem-2-Opalos', 'Gem-2-Quarzor', 'Gem-2-Rubis', 'Gem-2-Serpentil', 'Gem-2-Tanzanil',
        'Gem-3-Diantine', 'Gem-3-Jaskilo', 'Gem-3-Tukozelle', 'Gem-3-Zirkona',
        'Gem-4-Centaur_Tear', 'Gem-4-Dragon_Tear', 'Gem-4-Glacior_Tear', 'Gem-4-Unicorn_Tear',
    ],
    component_Pollen:[
        'Pollen-1-Beige_pollen', 'Pollen-1-Brown_pollen', 'Pollen-1-Grey_pollen', 'Pollen-1-Orange_pollen',
        'Pollen-2-Blue_pollen', 'Pollen-2-Green_pollen', 'Pollen-2-Purple_pollen', 'Pollen-2-Yellow_pollen',
        'Pollen-3-Algent_pollen', 'Pollen-3-Pink_pollen', 'Pollen-3-Red_pollen', 'Pollen-3-Violet_pollen',
    ],
    component_Powder:[
        'Powder-1-Ardosanos', 'Powder-1-Borasixte', 'Powder-1-Grestor', 'Powder-1-Marnitose',
        'Powder-2-Argile', 'Powder-2-Diorule', 'Powder-2-Graslette', 'Powder-2-Martiros',
        'Powder-3-Borfarine', 'Powder-3-Grimalsable', 'Powder-3-Lansel', 'Powder-3-Marabis',
    ],
    component_Sap:[
        'Sap-1-Elastic_sap', 'Sap-1-Flowing_sap', 'Sap-1-Fragrant_sap', 'Sap-1-Sticky_sap',
        'Sap-2-Cold_sap', 'Sap-2-Gooey_sap', 'Sap-2-Hot_sap', 'Sap-2-Tasty_sap',
        'Sap-3-Iridescent_sap', 'Sap-3-Luminescent_sap', 'Sap-3-Phosphorescent_sap', 'Sap-3-Radiant_sap',
    ],
    component_Substance:[
        'Substance-1-Arachnofur', 'Substance-1-Frapabor_clog', 'Substance-1-Gelatinous_heart', 'Substance-1-Gremfyr_wing', 'Substance-1-Lupus_croc', 'Substance-1-Oryctosensitive_ear', 'Substance-1-Paturon_root', 'Substance-1-Serpentur_scale', 'Substance-1-Sharkateeth', 'Substance-1-Ursinol_claw',
        'Substance-2-Aberantis_feather', 'Substance-2-Duriwood_bark', 'Substance-2-Flexole_wing', 'Substance-2-Greedy_root', 'Substance-2-Lizardis_Phalanx', 'Substance-2-Ondular_wing', 'Substance-2-Pustulus_skin', 'Substance-2-Scorpidus_stinger', 'Substance-2-Sucktopow_tentacle', 'Substance-2-Suilick_horn', 'Substance-2-Sylvan_uvula', 'Substance-2-Vibrato_scale',
        'Substance-3-Cognitive_flower', 'Substance-3-Glutuna_tongle', 'Substance-3-Manticorian_horsehair', 'Substance-3-Scarlet_Sabrofleaf', 'Substance-3-Silvanus_occulus', 'Substance-3-Tortulonus_scale',
        'Substance-4-Cuilivrinus_shell', 'Substance-4-Cybelfly_Egg', 'Substance-4-Draconian_down', 'Substance-4-Dusty_Shards', 'Substance-4-Heavy_Scales', 'Substance-4-Iceblast_Tooth', 'Substance-4-Mucus_gelatinus', 'Substance-4-Nuertoheart', 'Substance-4-Psychotropul_feather', 'Substance-4-Valdiss_spectroflower',
        'Substance-5-Heart_of_Dar\'hon',
    ],

}
type TProps = {
    onIconPickHandler: (path: string, url: string) => void
    onClose: () => void
    iconPossibleFolders: Array<string>
};
export const IconPicker: React.FC<TProps> = (props) => {
    const iconKeys = props.iconPossibleFolders.length ? props.iconPossibleFolders : Object.keys(iconData)
    const dispatch = useAppDispatch()
    const [icons, setIcons] = useState(iconData.mapGather_Tree)
    const [folder, setFolder] = useState(iconKeys[0])
    // const path = './../../assets/icons/'
    // const iconDataKeys = Object.keys(iconData)
    // const iconDataValues = Object.values(iconData)

    const changeIconsHandler = (iconDataKey: keyof typeof iconData) => {
        console.log(`change to ${iconDataKey}`)
        setIcons(iconData[iconDataKey])
        setFolder(iconDataKey)

    }
    const iconPickHandler = (path: string, url: string) => {
        console.log(`${path}`)
        props.onIconPickHandler(path, url)
        dispatch(MapSlice.actions.setAddMarkerIcon({icon: url}))
        dispatch(MapSlice.actions.setAddMarkerSize({size: folder === 'mapobject' ? [200, 200] : [30, 30]}))
    }
    const onClose = () => {
        props.onClose()
    }

    const getIconDiv = (v: string, i: number) => {
        const pathArr = v.split('/')
        const sub = pathArr.length > 1 ? pathArr[0] : ''
        const iconFolder = sub.length > 0 ? `${folder}/${sub}` : folder
        const iconName = pathArr[1] || v
        const iconURL = iconUrlPicker(iconFolder, iconName)
        // console.log(sub)
        const iconStyle = {
            width: '50px',
            height: '50px',
            background: `#575656 url(${iconURL})  center / cover no-repeat`,
        };
        return (
            <div key={i} className={styles.iconDiv} style={iconStyle}
                 onClick={() => iconPickHandler(`${folder}/${v}`, iconURL)}/>)
    }
    return (
        <div className={styles.main}>
            <div className={styles.topMenu}>
                {/*<button className={styles.topMenuButton} type={'button'}>Save</button>*/}
                <button className={styles.topMenuButton} onClick={onClose} type={'button'}>Close</button>
            </div>

            <div className={styles.navMenu}>
                {iconKeys.map((v, i) =>
                    <div key={i}>
                        <button className={styles.navMenuButton} type={'button'}
                                onClick={() => changeIconsHandler(v as keyof typeof iconData)}>{v.split('_')[1]}</button>
                    </div>
                )}
            </div>
            <div className={styles.iconMenu}>
                {icons.length === 0
                    ? <div>Empty icons folder</div>
                    : icons.map((v: string, i) => getIconDiv(v, i)
                    )}
            </div>
        </div>
    );
}
