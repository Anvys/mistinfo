import React from 'react';
import Leaf from "leaflet";
import {TMapPosition, TStagePos, TStagePosType} from "../../../Types/CommonTypes";
import {iconUrlPicker} from "../../IconPicker/IconPicker";
import {TLocation, TNpc} from "../../../Types/MainEntities";
import {RegionMarker} from "./RegionMarker";
import {QuestItemMarker} from "./QuestItemMarker";
import {QuestMarker} from "./QuestMarker";
import {EventMarker} from "./EventMarker";
import {StaminaElixirMarker} from "./StaminaElixirMarker";
import {LocationMarker} from "./LocationMarker";
import {GatherPointMarker} from "./GatherPointMarker";
import {TownsLayer} from "./TownsLayer";
import {AddDataMarker} from "./AddDataMarker";


export const colors = {
    activeEvents: '#D7C72DFF',
    activeGathers: '#ffa817',
}
export const iconSetting = {
    townIcons: ['Kortombourg'],
    toIncrease: ['Gris Domain'],
}
export const Markers = {
    region: RegionMarker,
    questItem: QuestItemMarker,
    quest: QuestMarker,
    events: EventMarker,
    getTowns: TownsLayer,
    staminaElixir: StaminaElixirMarker,
    location: LocationMarker,
    gatherPoint: GatherPointMarker,

    mapObjects: () => {},
    addDataMarker: (pos: { lat: number, lng: number }, markerRef: React.RefObject<Leaf.Marker>, eventHandlers: { dragend(): void }) =>
        <AddDataMarker pos={pos} markerRef={markerRef} eventHandlers={eventHandlers}/>,
}

export const iconPicker = (type: string) => {
    if (!type) return require('./../../../assets/icons/temp.png')
    const iPath = type.split('/')
    if (iPath.length === 2) {
        return iconUrlPicker(iPath[0], iPath[1])
    } else {
        return require('./../../../assets/icons/temp.png')
    }
}
export const getPosFromQuestStage = (pos: TStagePos, type: TStagePosType, locations: Array<TLocation> | null = null): TMapPosition => {
    switch (type) {
        case "pos":
            // console.log(`pos: ${getPosStr(pos, type)}`)
            return pos as TMapPosition

        case "location":
            const locPos = pos as TLocation
            // console.log(`loc: ${locPos}`)
            return locPos.pos
        case "npc":
            const npcPos = pos as TNpc
            // console.log(locations)
            // console.log(npcPos)
            const findLocPos = locations?.find(v => v.name === npcPos.location)?.pos
            // console.log(`npc: ${findLocPos}`)
            return findLocPos ? findLocPos : {x: 0, y: 0}
        default:
            // console.error('Failo2')
            return {x: 0, y: 0}
    }
}