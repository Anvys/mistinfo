import React, {useState} from 'react';
import styles from './IconPicker.module.css';
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";


const iconUrlPicker = (folder: string, icon: string) => {
    if(icon==='Unknown') return require(`./../../assets/icons/location/Unknown.png`)
    const str = `./../../assets/icons/${folder}/${icon}.png`
    console.log(folder)
    // return require(`./../../assets/icons/${folder}/${icon}.png`)
    switch (folder) {
        case 'location':
            return require(`./../../assets/icons/location/${icon}.png`)
        case 'mapobject':
            return require(`./../../assets/icons/mapobject/${icon}.png`)
        case 'material/Wood':
            return require(`./../../assets/icons/material/Wood/${icon}.png`)
        case 'mapGatherTree':
            return require(`./../../assets/icons/mapGather/wood/${icon}.png`)
        case 'mapGatherBoulder':
            return require(`./../../assets/icons/mapGather/boulder/${icon}.png`)
        case 'mapGatherAnimal':
            return require(`./../../assets/icons/mapGather/animal/${icon}.png`)
        case 'mapGatherHerb':
            return require(`./../../assets/icons/mapGather/herb/${icon}.png`)
        case 'mapGatherOre':
            return require(`./../../assets/icons/mapGather/ore/${icon}.png`)
        case 'mapGatherPlant':
            return require(`./../../assets/icons/mapGather/plant/${icon}.png`)
        default : {
            console.log(`./../../assets/icons/${folder}/${icon}.png`)
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
    mapGatherTree: ['Tree-1-Grown_olf','Tree-1-Grown_pan','Tree-1-Grown_salancedre','Tree-1-Grown_supon',
    'Tree-2-Grown_acacia','Tree-2-Grown_chanderene','Tree-2-Grown_chomne','Tree-2-Grown_erilid','Tree-2-Grown_Korupto',
    'Tree-3-Grown_elvinos','Tree-3-Grown_exanese','Tree-3-Grown_gurdismo','Tree-3-Grown_melize','Tree-3-Grown_solone',
    'Tree-4-Grown_mif','Tree-4-Grown_nuertesilicio','Tree-4-Grown_ociosto','Tree-4-Grown_salandrin',
    'Tree-5-Grown_azulio','Tree-5-Grown_soletto',
    ],
    mapGatherBoulder:[
        'Boulder-1-Ardosite_boulder','Boulder-1-Blancite_boulder','Boulder-1-Gresotis_boulder','Boulder-1-Marnite_boulder',
        'Boulder-2-Argilu_boulder','Boulder-2-Diorite_boulder','Boulder-2-Granita_boulder','Boulder-2-Marbrane_boulder','Boulder-2-Ridantite_rock',
        'Boulder-3-Borm_boulder','Boulder-3-Grimalroc_boulder','Boulder-3-Lanferite_boulder','Boulder-3-Marapis_boulder',
        'Boulder-4-Lithosnow_boulder','Boulder-4-Oceanite_boulder','Boulder-4-Simblior_boulder','Boulder-4-Xuran_boulder',
        'Boulder-5-Grimalpure_boulder','Boulder-5-Palvable_boulder','Boulder-5-Volcanite_boulder','Boulder-5-Yrrandanilde_boulder',
    ],
    mapGatherAnimal:[
        'Animal-1-Boar','Animal-1-Buffalo','Animal-1-Deer','Animal-1-Hare',
        'Animal-2-Auroch','Animal-2-Bear','Animal-2-Larcen_Hare','Animal-2-Marebouc','Animal-2-Varan',
        'Animal-3-Chimeric_eagle','Animal-3-Mountain_bear','Animal-3-Root_boar','Animal-3-Wolf',
        'Animal-4-Black_bear','Animal-4-Mountain_deer','Animal-4-Red_hill_bear','Animal-4-Wodjik_boar',
        'Animal-5-Darkblade_Deer','Animal-5-Green_bear',
    ],
    mapGatherHerb:[
        'Herb-1-Wild_chinvre','Herb-1-Wild_jot','Herb-1-Wild_lan','Herb-1-Wild_ortas',
        'Herb-2-Wild_caton','Herb-2-Wild_doussoie','Herb-2-Wild_jutug','Herb-2-Wild_lanos','Herb-2-Wild_ridilande',
        'Herb-3-Wild_blacknester','Herb-3-Wild_Cirous','Herb-3-Wild_mohus','Herb-3-Wild_olkznar',
        'Herb-4-Wild_araknol','Herb-4-Wild_goldnester','Herb-4-Wild_huberois','Herb-4-Wild_massilan',
        'Herb-5-Wild_bemesoft','Herb-5-Wild_kingnester','Herb-5-Wild_lanosap',
    ],
    mapGatherOre:[
        'Ore-1-Branzos_ore','Ore-1-Feros_ore','Ore-1-Kutel_ore','Ore-1-Laidor_ore',
        'Ore-2-Aciel_ore','Ore-2-Aziblue_ore','Ore-2-Eliandel_ore','Ore-2-Kulivrine_ore','Ore-2-Odiemel_ore',
        'Ore-3-Arkinik_Ore','Ore-3-Domane_ore','Ore-3-Sorontile_ore','Ore-3-Swarpver_ore','Ore-3-Zincol_ore',
        'Ore-4-Blueroc_ore','Ore-4-Orus_ore','Ore-4-Silvanil_ore','Ore-4-Soraverse_ore',
        'Ore-5-Galandor_ore','Ore-5-Icyluxa_ore','Ore-5-Titanron_ore',
    ],
    mapGatherHPlant:[
        'Plant-1-Carouge','Plant-1-Eperviere','Plant-1-Killasadra','Plant-1-Morinette','Plant-1-Orchis','Plant-1-Papyrus','Plant-1-Safran','Plant-1-Tricinias','Plant-1-Varacias','Plant-1-Viperines',
        'Plant-2-Allecorde','Plant-2-Cascardent','Plant-2-Grondanite','Plant-2-Julno','Plant-2-Limotarsus','Plant-2-Mandradon','Plant-2-Maredoce','Plant-2-Morilla','Plant-2-Nordinia','Plant-2-Russule',
        'Plant-3-Amphrose','Plant-3-Antracienne','Plant-3-Brindor','Plant-3-Maladivienne','Plant-3-Mazhevite','Plant-3-Mortalese','Plant-3-Ruidel','Plant-3-Sinerane','Plant-3-Slork','Plant-3-Valarianne',
        'Plant-4-Blimfroid','Plant-4-Hicko','Plant-4-Julso','Plant-4-Norl','Plant-4-Plianto','Plant-4-Qualso','Plant-4-Quilla','Plant-4-Rudulux','Plant-4-Savouran','Plant-4-Tresaima',
        'Plant-5-Brulm','Plant-5-Couantila','Plant-5-Evilli','Plant-5-Firenina','Plant-5-Illogia','Plant-5-Killjulu','Plant-5-Nouni','Plant-5-Pilisilla','Plant-5-Purila','Plant-5-Trollusan',
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
    const [icons, setIcons] = useState(iconData.mapGatherTree)
    const [folder, setFolder] = useState(iconKeys[0])
    const path = './../../assets/icons/'
    const iconDataKeys = Object.keys(iconData)
    const iconDataValues = Object.values(iconData)

    const changeIconsHandler = (iconDataKey: keyof typeof iconData) => {
        console.log(`change to ${iconDataKey}`)
        setIcons(iconData[iconDataKey])
        setFolder(iconDataKey)

    }
    const iconPickHandler = (path: string, url: string) => {
        console.log(`${path}`)
        props.onIconPickHandler(path, url)
        dispatch(MapSlice.actions.setAddMarkerIcon({icon:url}))
        dispatch(MapSlice.actions.setAddMarkerSize({size:folder === 'mapobject' ? [200,200]:[50,50]}))
    }
    const onClose = () =>{
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
                                onClick={() => changeIconsHandler(v as keyof typeof iconData)}>{v}</button>
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
