import {TEvent} from "../../../Types/MainEntities";
import {CircleMarker, Marker, Popup} from "react-leaflet";
import {Icon} from "leaflet";
import s from "./MarkerCreator.module.css";
import {getStagesStr} from "../../../Unils/utilsFunctions";
import React from "react";
import {colors, iconPicker} from "./MarkerCreator";

export const EventMarker = (data: TEvent, zoom: number, activeRegion: string | undefined) => {
    const t = new Image()
    t.src = iconPicker(data.icon)
    const iW = t.width / 4 * (zoom - 4) * 0.5
    const iH = t.height / 4 * (zoom - 4) * 0.5
    const pos = {lat: data.pos.x, lng: data.pos.y}
    return (<>
            <Marker
                autoPan={false}
                draggable={false}
                icon={new Icon({
                    iconAnchor: [iW / 2, iH * 5 / 6],
                    iconUrl: t.src,
                    iconSize: [iW, iH],
                    popupAnchor: [iW / 2 - iW / 2, 0 - iH * 5 / 6],
                })}
                position={pos}>
                <Popup autoPan={false}>
                    <div className={s.popupDiv}>
                        {`${data.name}\n`}
                        {getStagesStr(data.eStages)}
                    </div>
                </Popup>

            </Marker>
            {activeRegion === data.region &&
                <CircleMarker center={pos} radius={15}
                              pathOptions={{
                                  color: colors.activeEvents,
                                  fillColor: colors.activeEvents,
                                  fillOpacity: 0.7
                              }}/>}
        </>

    )
}