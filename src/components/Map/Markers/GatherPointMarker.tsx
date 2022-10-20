import {TGatherPoint} from "../../../Types/MainEntities";
import {CircleMarker, Marker, Popup, Tooltip} from "react-leaflet";
import {Icon} from "leaflet";
import s from "./MarkerCreator.module.css";
import {getTimeStr} from "../../../Unils/utilsFunctions";
import React from "react";
import {colors, iconPicker} from "./MarkerCreator";

export const GatherPointMarker = (data: TGatherPoint, zoom: number, gatherDifficult: number, activeRegion: string | undefined, activeResource: string) => {
    if (!data) return <></>
    // const icon = `./../../../assets/icons/${iconPicker(data.type)}.png`
    // console.log(icon)
    // const t = new Image()
    // t.src = iconPicker(data.icon)
    // console.log(`${t.width}:${t.height}`)
    const iconSize = data.type === 'Hunting' ? 200 : 128;
    const iW = iconSize / 6 * (zoom - 4) * 0.5
    const iH = iconSize / 6 * (zoom - 4) * 0.5
    const pos = {lat: data.pos.x, lng: data.pos.y}
    return (
        <>
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    // iconUrl: require(`./../../../assets/icons/${data.icon}.png`),
                    iconUrl: iconPicker(data.icon),
                    iconSize: [iW, iH],
                    iconAnchor: [iW / 2, iH / 2],
                    popupAnchor: [0, -iH / 2],
                    tooltipAnchor: [iW / 2, 0],
                })}
                position={pos}>
                <Popup>
                    <div className={s.popupgDiv}>
                        {`${data.name} [${data.type} ${gatherDifficult}]  (${getTimeStr(data.cooldown)})`}
                    </div>
                </Popup>
                <Tooltip><p>{`${data.count}x${data.name}`}</p></Tooltip>
            </Marker>
            {(activeRegion === data.region || activeResource.length > 0 && typeof data.loot !== 'string' &&
                    data.loot.loot.some(d=>d.name.toLowerCase().includes(activeResource.toLowerCase()))) &&
                <CircleMarker center={pos} radius={25}
                              pathOptions={{
                                  color: colors.activeGathers,
                                  fillColor: colors.activeGathers,
                                  fillOpacity: 0.7
                              }}/>}
        </>
    )
}