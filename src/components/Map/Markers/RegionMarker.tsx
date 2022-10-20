import {TComponent, TEvent, TGatherPoint, TLocation, TLoot, TMaterial, TRegion} from "../../../Types/MainEntities";
import {Polygon, Popup, Tooltip} from "react-leaflet";
import s from "./MarkerCreator.module.css";
import {NO_LOOT} from "../../../Types/CommonTypes";
import {getTimeStr} from "../../../Unils/utilsFunctions";
import React from "react";


export const RegionMarker = (
    data: TRegion,
    zoom: number,
    locations: Array<TLocation>,
    gatherPoints: Array<TGatherPoint>,
    events: Array<TEvent>,
    loots: Array<TLoot>,
    resources: Array<TMaterial | TComponent>,
    activeRegion: string | undefined,
) => {
    if (!data) return <></>
    const isActive = activeRegion === data.name
    const ownLocations = locations.filter(v => v.region === data.name)
    const ownGather = gatherPoints.filter(v => v.region === data.name)
    const ownEvent = events.filter(v => v.region === data.name)
    const bounds = data.bound

    return <Polygon
        pathOptions={{
            color: `${isActive ? 'orange' : 'lime'}`,
            fillColor: `${isActive ? 'rgba(255, 148, 59, 0.09)' : 'lime'}`
        }}
        positions={bounds}>
        <Tooltip>
            {data.terrainReq > 0 ? `${data.terrain} ${data.terrainReq}` : `No land require`}
        </Tooltip>
        <Popup className={s.popupDiv}>
            {`\t${data.name}(${data.terrain} ${data.terrainReq})`}
            {`\nLocations: ${ownLocations.length}`}
            {`\nEvents: ${ownEvent.length}`}
            {ownGather.length > 0 && <details>
                <summary>{`Gathers: ${ownGather.length}`}</summary>
                {ownGather.map(v => {
                    const gatherDifficult = loots.find(loot => v.loot !== NO_LOOT && loot.name === v.loot.name)?.loot.reduce((p, c) => {
                        const dif = resources.find(res => res.name === c.name)?.gatherDifficulty
                        if (!!dif) return dif > p ? dif : p
                        else return p
                    }, 0)
                    return ` ~ ${v.count}x${v.name}(${getTimeStr(v.cooldown)}) [${v.type.substring(0, 1)}. ${gatherDifficult}]`
                }).join('\n')}
            </details>}
        </Popup>
    </Polygon>
}