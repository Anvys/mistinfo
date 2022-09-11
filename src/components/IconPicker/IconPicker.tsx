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
        case 'alteration_Alterations' :
            return require(`./../../assets/icons/alterations/${icon}.png`)
        case 'portrait_Portrait' :
            return require(`./../../assets/icons/portret/${icon}.png`)
        case 'ability_Ability1' :
            return require(`./../../assets/icons/abilities1/${icon}.png`)
        case 'ability_Ability2' :
            return require(`./../../assets/icons/abilities2/${icon}.png`)
        case 'ability_Ability3' :
            return require(`./../../assets/icons/abilities3/${icon}.png`)
        case 'other_Other' :
            return require(`./../../assets/icons/other/${icon}.png`)
        case 'location_Places':
            return require(`./../../assets/icons/location/${icon}.png`)
        case 'event_Flags':
            return require(`./../../assets/icons/event/${icon}.png`)
        case 'staminaElixir':
            return require(`./../../assets/icons/staminaElixir.png`)
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
            return undefined
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
    component_Gem: [
        'Gem-1-Ambranos', 'Gem-1-Amethile', 'Gem-1-Azurelle', 'Gem-1-Cassinette', 'Gem-1-Citrinil', 'Gem-1-Grenato', 'Gem-1-Hemolianel', 'Gem-1-Malichone',
        'Gem-2-Morganate', 'Gem-2-Obsidelle', 'Gem-2-Onyxil', 'Gem-2-Opalos', 'Gem-2-Quarzor', 'Gem-2-Rubis', 'Gem-2-Serpentil', 'Gem-2-Tanzanil',
        'Gem-3-Diantine', 'Gem-3-Jaskilo', 'Gem-3-Tukozelle', 'Gem-3-Zirkona',
        'Gem-4-Centaur_Tear', 'Gem-4-Dragon_Tear', 'Gem-4-Glacior_Tear', 'Gem-4-Unicorn_Tear',
    ],
    component_Pollen: [
        'Pollen-1-Beige_pollen', 'Pollen-1-Brown_pollen', 'Pollen-1-Grey_pollen', 'Pollen-1-Orange_pollen',
        'Pollen-2-Blue_pollen', 'Pollen-2-Green_pollen', 'Pollen-2-Purple_pollen', 'Pollen-2-Yellow_pollen',
        'Pollen-3-Algent_pollen', 'Pollen-3-Pink_pollen', 'Pollen-3-Red_pollen', 'Pollen-3-Violet_pollen',
    ],
    component_Powder: [
        'Powder-1-Ardosanos', 'Powder-1-Borasixte', 'Powder-1-Grestor', 'Powder-1-Marnitose',
        'Powder-2-Argile', 'Powder-2-Diorule', 'Powder-2-Graslette', 'Powder-2-Martiros',
        'Powder-3-Borfarine', 'Powder-3-Grimalsable', 'Powder-3-Lansel', 'Powder-3-Marabis',
    ],
    component_Sap: [
        'Sap-1-Elastic_sap', 'Sap-1-Flowing_sap', 'Sap-1-Fragrant_sap', 'Sap-1-Sticky_sap',
        'Sap-2-Cold_sap', 'Sap-2-Gooey_sap', 'Sap-2-Hot_sap', 'Sap-2-Tasty_sap',
        'Sap-3-Iridescent_sap', 'Sap-3-Luminescent_sap', 'Sap-3-Phosphorescent_sap', 'Sap-3-Radiant_sap',
    ],
    component_Substance: [
        'Substance-1-Arachnofur', 'Substance-1-Frapabor_clog', 'Substance-1-Gelatinous_heart', 'Substance-1-Gremfyr_wing', 'Substance-1-Lupus_croc', 'Substance-1-Oryctosensitive_ear', 'Substance-1-Paturon_root', 'Substance-1-Serpentur_scale', 'Substance-1-Sharkateeth', 'Substance-1-Ursinol_claw',
        'Substance-2-Aberantis_feather', 'Substance-2-Duriwood_bark', 'Substance-2-Flexole_wing', 'Substance-2-Greedy_root', 'Substance-2-Lizardis_Phalanx', 'Substance-2-Ondular_wing', 'Substance-2-Pustulus_skin', 'Substance-2-Scorpidus_stinger', 'Substance-2-Sucktopow_tentacle', 'Substance-2-Suilick_horn', 'Substance-2-Sylvan_uvula', 'Substance-2-Vibrato_scale',
        'Substance-3-Cognitive_flower', 'Substance-3-Glutuna_tongle', 'Substance-3-Manticorian_horsehair', 'Substance-3-Scarlet_Sabrofleaf', 'Substance-3-Silvanus_occulus', 'Substance-3-Tortulonus_scale',
        'Substance-4-Cuilivrinus_shell', 'Substance-4-Cybelfly_Egg', 'Substance-4-Draconian_down', 'Substance-4-Dusty_Shards', 'Substance-4-Heavy_Scales', 'Substance-4-Iceblast_Tooth', 'Substance-4-Mucus_gelatinus', 'Substance-4-Nuertoheart', 'Substance-4-Psychotropul_feather', 'Substance-4-Valdiss_spectroflower',
        'Substance-5-Heart_of_Dar\'hon',
    ],
    event_Flags: [
        'event', 'event02', 'eventexploration', 'eventmainstory', 'eventrandom', 'eventregiondanger',
        'eventregionrandom', 'tribal', 'tribal02', 'tribal03', 'tribal04', 'tribal05', 'tribal06', 'trogulnus',
    ],
    location_Places: ['1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '21', '22', '23',
        '24', '25', '26', '27', '28', '29', '3', '30', '31', '32', '33', '4 (2)', '4', '5', '6', '7', '8', '9',
        'alcharan', 'alderman', 'ancetre', 'aranbourgcenter', 'azrason', 'barracks', 'barrack_of_the_filouderien',
        'bell', 'bentrocemetery', 'berge_du_thaumaturge', 'berthiers_house', 'blackhorsepavilion', 'bloranossahouse',
        'camp1', 'camp2', 'campement_icon (2)', 'campement_icon', 'camp_tormul', 'captainjoallery',
        'caravanserai_of_the_great_eclipse', 'carvanserai', 'caveentrance', 'caveknowledge', 'city', 'cityinn',
        'cityinnempty', 'citypark', 'clawmarquee', 'combat', 'demalaisemanor', 'dev', 'diademmanor', 'diademquarry',
        'diadem_manor', 'diadem_quarry', 'domaine_sylvestre', 'domanescissors', 'enorwendyery', 'epirponrelay',
        'ergoim', 'event', 'event02', 'eventexploration', 'eventmainstory', 'eventrandom', 'eventregiondanger',
        'eventregionrandom', 'fearpiercingcamp', 'fearpiercing_camp', 'fency', 'fency02', 'fish', 'forgeclif',
        'forsecmine', 'fortressrose', 'gantrasmap', 'gismonsfarm', 'greathousekortombe', 'grisdomain',
        'housesalamandese', 'house_of_the_sleeping_sun', 'inn (2)', 'inn', 'innmap (2)', 'innmap', 'issayashipyard',
        'issaya_shipyard', 'klotosstribe', 'korllightsacademy', 'kortombecastle', 'kortombecenter', 'kortombemarket',
        'kortomis_statue', 'larfungel', 'lighthouselongnight', 'lostwharf', 'mapcrane', 'mapicon', 'marbleworks',
        'marques_du_thaumaturge', 'matteuswoodcutter', 'meat', 'mill', 'mine_icon', 'mini (2)', 'mini',
        'minokiller_outpost', 'multiforge', 'neoaetheraris', 'neoaethernaris', 'none', 'oldrabouf', 'path (2)',
        'path', 'pathstone', 'peoplearmory', 'platteauvores_camp', 'plindorfarm', 'portal (2)', 'portal',
        'portallocked', 'portaranbourg', 'portthorbourg', 'quarawoodfurniture', 'quarawood_furnitures',
        'raboufdomain', 'rabouf_domain', 'raonisblast', 'raven_mansion', 'redmushroom', 'regular', 'roicsantuary',
        'rose', 'ruinsmalasette', 'scarletwarehouse', 'scratched_rock', 'servreshouse', 'shipyardgrandflood',
        'sirturaoutpost', 'snakemine', 'sorka_camp', 'station', 'station2', 'station2locked', 'stationlocked',
        'stone', 'stonebroken', 'struckdowntree', 'theancestor', 'thoraxdistillery', 'thormalekacademy',
        'thorvalcamp', 'thousandeadcavern', 'tiny', 'tomb', 'towerconstructionsite', 'towertarawest',
        'tower_construction_site', 'town', 'tree', 'tribal', 'tribal02', 'tribal03', 'tribal04', 'tribal05',
        'tribal06', 'trogulnus', 'troll_seat', 'watchmanarmory', 'watchmans_armory', 'yolasula',],
    other_Other: ['Channelizer-Grimoire_of_Virtys', 'Coin-Aureate_Claw', 'Coin-Dye_house_tickets',
        'Coin-Kortomis_stars', 'Coin-Myriaden_coins', 'Dye-Dye_Remover', 'Foggy_Manifestation-Elixir_of_Vigor',
        'Food-Fatty_meat', 'Food-Rich_meat', 'Food-Salted_meat', 'Food-Stringy_meat', 'Food-Tender_meat',
        'Food-Tough_meat', 'Manifestation-Ancestral_orb', 'Manifestation-Insignia_of_bravery',
        'Manifestation-Mist_shard', 'Manifestation-Symbol_of_glory', 'Manifestation-Symbol_of_virtue',
        'Manifestation-Symbol_of_wisdom', 'Mastery-Combat_Mastery', 'Mastery-Crafting_Mastery',
        'Mastery-Harvest_Mastery', 'Mistglass-1-Minoris_mistglass', 'Mistglass-2-Noblias_mistglass',
        'Mistglass-3-Baronis_mistglass', 'Mistglass-4-Dominas_Mistglass', 'Mistglass-5-Royonar_mistglass', 'Quest-5-Nuertoritual', 'Quest-5-Suckhop_Nest',
        'Quest-Alcooligron', 'Quest-Alcooligron_concoction', 'Quest-Amanda\'s_necklace', 'Quest-Anodina_plant',
        'Quest-Arachnid_caviar', 'Quest-Arcanists_Crate', 'Quest-Black_Box', 'Quest-Boar_meat',
        'Quest-Broken_Mist_Lantern', 'Quest-Caravan_cargo', 'Quest-Cargo_for_excavations', 'Quest-Cargo_of_berries', 'Quest-Cargo_of_fish', 'Quest-Cargo_of_materials',
        'Quest-Cargo_of_tools_for_Forsec', 'Quest-Carrot', 'Quest-Cliff_sample', 'Quest-Compromising_letter', 'Quest-Corn',
        'Quest-Delivery_certificate', 'Quest-Delivery_for_Leonidas', 'Quest-Elastic_tongue', 'Quest-Forest_inventory', 'Quest-Fresh_fish',
        'Quest-Fresh_trout', 'Quest-Fruit_cargo', 'Quest-Funeral_candle', 'Quest-Giant_spider_leg', 'Quest-Glacier_sample',
        'Quest-Glass_fragment', 'Quest-Grimkush_oil', 'Quest-Grufalo_Mask', 'Quest-Herbarium_pieces', 'Quest-Hop_cargo',
        'Quest-Human_bones', 'Quest-Incantation_book', 'Quest-Keeper\'s_Key', 'Quest-Letter_for_Aranbourg', 'Quest-Life_Pearl',
        'Quest-Magic_Missive_for_the_Rose', 'Quest-Old_box', 'Quest-Orb_of_the_Corinna', 'Quest-Orb_of_the_Crucible', 'Quest-Orb_of_the_Fairy',
        'Quest-Orb_of_the_Maranchons', 'Quest-Orb_of_the_Pandolfo', 'Quest-Orb_of_the_Sleeping', 'Quest-Orb_of_the_Whispers', 'Quest-Package_forQuara',
        'Quest-Package_for_Charles', 'Quest-Package_for_Leonidas', 'Quest-Package_for_Mylena', 'Quest-Poison_vial', 'Quest-Purification_equipment',
        'Quest-Red_apple', 'Quest-Reinforced_domane_crate', 'Quest-Savage_boar_meat', 'Quest-Scandalous_flower', 'Quest-Shellfish',
        'Quest-Shipment_of_dregs', 'Quest-Snap_hook', 'Quest-Stolen_Totem', 'Quest-Tortojaguard_Totem', 'Quest-Tortolion_teeth',
        'Quest-Vial_of_strange_water', 'Quest-Victims_Information', 'Quest-Volcano_sample', 'Quest-Water_snake_nest', 'Quest-Xaxavi\'s_Rune',
        'Recipe-Recipe', 'Skill-Profession', 'Skill-Skill', 'Talent-Talent', 'Treasure-Ancient_trinkets',
        'Treasure-Antique_ornaments', 'Treasure-Common_components', 'Treasure-Fierce_components', 'Treasure-Superior_components',],
    'ability_Ability1': ['1', '10', '101', '102', '103', '104', '105', '106', '107', '108', '109', '11', '110', '111',
        '112', '113', '114', '115', '116', '117', '118', '119', '12', '121', '122', '123', '124', '125', '126', '127',
        '128', '129', '13', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '14', '141', '142',
        '143', '144', '145', '146', '147', '148', '149', '15', '150', '151', '152', '153', '154', '155', '156', '157',
        '158', '159', '16', '161', '162', '163', '164', '165', '166', '167', '168', '169', '17', '170', '171', '172',
        '173', '174', '175', '176', '177', '178', '179', '18', '181', '182', '183', '184', '185', '186', '187', '188',
        '189', '19', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '2', '201', '202', '203',
        '204', '205', '206', '207', '208', '209', '21', '210', '211', '212', '213', '214', '215', '216', '217', '218',
        '219', '22', '221', '222', '223', '224', '225', '226', '227', '228', '229', '23', '230', '231', '232', '233',
        '234', '235', '236', '237', '238', '239', '24', '241', '242', '243', '244', '245', '246', '247', '248', '249',
        '25', '250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '26', '261', '262', '263', '264',
        '265', '266', '267', '268', '269', '27', '270', '271', '272', '273', '274', '275', '276', '277', '278', '279',
        '28', '281', '282', '283', '284', '285', '286', '287', '288', '289', '29', '290', '291', '292', '293', '294',
        '295', '296', '297', '298', '299', '3', '30', '301', '302', '303', '304', '305', '306', '307', '308', '309',
        '31', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '32', '321', '322', '323', '324',
        '325', '326', '327', '328', '329', '33', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339',
        '34', '341', '342', '343', '35', '36', '37', '38', '39', '4', '41', '42', '43', '44', '45', '46', '47', '48',
        '49', '5', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '61', '62', '63', '64', '65', '66',
        '67', '68', '69', '7', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '8', '81', '82', '83', '84',
        '85', '86', '87', '88', '89', '9', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', ],
    'ability_Ability2': ['1', '10', '101', '102', '103', '104', '105', '106', '107', '108', '109', '11', '110', '111',
        '112', '113', '114', '115', '116', '117', '118', '119', '12', '121', '122', '123', '124', '125', '126', '127',
        '128', '129', '13', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '14', '141', '142',
        '143', '144', '145', '146', '147', '148', '149', '15', '150', '151', '152', '153', '154', '155', '156', '157',
        '158', '159', '16', '161', '162', '163', '164', '165', '166', '167', '168', '169', '17', '170', '171', '172',
        '173', '174', '175', '176', '177', '178', '179', '18', '181', '182', '183', '184', '185', '186', '187', '188',
        '189', '19', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '2', '200', '201', '202',
        '203', '204', '205', '206', '207', '208', '209', '21', '210', '211', '212', '213', '214', '215', '216', '217',
        '218', '219', '22', '221', '222', '223', '224', '225', '226', '227', '228', '229', '23', '230', '231', '232',
        '233', '234', '235', '236', '237', '238', '239', '24', '241', '242', '243', '244', '245', '246', '247', '248',
        '249', '25', '250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '26', '260', '261', '262',
        '263', '264', '265', '266', '267', '268', '269', '27', '270', '271', '272', '273', '274', '275', '276', '277',
        '278', '279', '28', '281', '282', '283', '284', '285', '286', '287', '288', '289', '29', '290', '291', '292',
        '293', '294', '295', '296', '297', '298', '299', '3', '30', '301', '302', '303', '304', '305', '306', '307',
        '308', '309', '31', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '32', '321', '322',
        '323', '324', '325', '326', '327', '328', '329', '33', '330', '331', '332', '333', '334', '335', '336', '337',
        '338', '339', '34', '341', '342', '343', '344', '345', '346', '347', '348', '349', '35', '350', '351', '352',
        '353', '354', '355', '356', '357', '358', '359', '36', '361', '362', '363', '364', '365', '366', '367', '368',
        '37', '38', '39', '4', '41', '42', '43', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54',
        '55', '56', '57', '58', '59', '6', '61', '62', '63', '64', '65', '66', '67', '68', '69', '7', '70', '71', '72',
        '73', '74', '75', '76', '77', '78', '79', '8', '81', '82', '83', '84', '85', '86', '87', '88', '89', '9', '90',
        '91', '92', '93', '94', '95', '96', '97', '98', '99', ],
    'ability_Ability3': ['1', '10', '101', '102', '103', '104', '105', '106', '107', '108', '109', '11', '110', '111',
        '112', '113', '114', '115', '116', '117', '118', '119', '12', '121', '122', '123', '124', '125', '126', '127',
        '128', '129', '13', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '14', '141', '142',
        '143', '144', '145', '146', '147', '148', '149', '15', '150', '151', '152', '153', '154', '155', '156', '157',
        '158', '159', '16', '161', '162', '163', '164', '165', '166', '167', '168', '169', '17', '170', '171', '172',
        '173', '174', '175', '176', '177', '178', '179', '18', '181', '182', '183', '184', '185', '186', '187', '188',
        '189', '19', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '2', '201', '202', '203',
        '204', '205', '206', '207', '208', '209', '21', '210', '211', '212', '213', '214', '215', '216', '217', '218',
        '219', '22', '221', '222', '223', '224', '225', '226', '227', '228', '229', '23', '230', '231', '232', '233',
        '234', '235', '236', '237', '238', '239', '24', '241', '242', '25', '26', '27', '28', '29', '3', '30', '31',
        '32', '33', '34', '35', '36', '37', '38', '39', '4', '41', '42', '43', '44', '45', '46', '47', '48', '49', '5',
        '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '61', '62', '63', '64', '65', '66', '67',
        '68', '69', '7', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '8', '81', '82', '83', '84',
        '85', '86', '87', '88', '89', '9', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', ],
    'portrait_Portrait': ['1 (2)', '1', '10 (2)', '10', '100', '101', '102', '103', '104', '105', '106', '107', '108',
        '109', '11 (2)', '11', '110', '111', '113', '114', '115', '116', '117', '118', '119', '12 (2)', '12', '120',
        '121', '122', '123', '124', '125', '127', '128', '129', '13 (2)', '13', '130', '131', '132', '133', '134',
        '135', '136', '137', '138', '139', '141', '142', '143', '144', '145', '146', '147', '148', '149', '15 (2)',
        '15', '150', '151', '152', '153', '155', '156', '157', '158', '159', '16 (2)', '16', '160', '161', '162',
        '163', '164', '165', '166', '167', '169', '17 (2)', '17', '170', '171', '172', '173', '174', '175', '176',
        '177', '178', '179', '18 (2)', '18', '180', '181', '19 (2)', '19', '2 (2)', '2', '20 (2)', '20', '21',
        '22 (2)', '22', '23 (2)', '23', '24 (2)', '24', '25 (2)', '25', '26 (2)', '26', '27 (2)', '27', '29', '3 (2)',
        '3', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '4 (2)', '4', '40', '41', '43', '44', '45',
        '46', '47', '48', '49', '5 (2)', '5', '50', '51', '52', '53', '54', '55', '57', '58', '59', '6 (2)', '6', '60',
        '61', '62', '63', '64', '65', '66', '67', '68', '69', '7', '71', '72', '73', '74', '75', '76', '77', '78',
        '79', '8 (2)', '8', '80', '81', '82', '83', '85', '86', '87', '88', '89', '9 (2)', '9', '90', '91', '92',
        '93', '94', '95', '96', '97', '99', ],
    'alteration_Alterations': ['1', '10', '11', '12', '13', '14', '15', '17', '18', '19', '2', '20', '21', '22', '23',
        '25', '26', '27', '28', '29', '3', '30', '31', '33', '34', '35', '36', '37', '38', '39', '4', '41', '42', '43',
        '44', '45', '46', '47', '49', '5', '50', '51', '52', '53', '54', '55', '57', '58', '59', '6', '60', '61', '62',
        '63', '65', '66', '67', '68', '69', '7', '70', '71', '73', '74', '75', '76', '77', '78', '79', '81', '82', '83',
        '84', '85', '9', ],

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
            // width: '50px',
            // height: '50px',
            // background: `#575656 url(${iconURL})  center / cover no-repeat`,
            backgroundImage: `url(${iconURL})`,
            // backgroundPosition: 'center / cover no-repeat',
            // backgroundRepeat: 'no-repeat',
        };
        return (
            <div key={i} title={iconName} className={styles.iconDiv} style={iconStyle}
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
