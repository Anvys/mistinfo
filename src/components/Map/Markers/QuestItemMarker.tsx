import {TQuestItemSource} from "../../../Types/MainEntities";
import {TMapPosition} from "../../../Types/CommonTypes";
import {Marker, Tooltip} from "react-leaflet";
import {Icon} from "leaflet";
import React from "react";
import {iconPicker} from "./MarkerCreator";

export const QuestItemMarker = (data: TQuestItemSource, zoom: number, pos: TMapPosition, icon: string) => {

    return (
        <Marker
            icon={new Icon({

                iconUrl: iconPicker(icon),
                iconSize: [15 * (zoom - 4) * 0.5, 15 * (zoom - 4) * 0.5],
                tooltipAnchor: [10 * (zoom - 4) * 0.5, 0],
            })}
            position={{lat: pos.x, lng: pos.y}}>
            <Tooltip>
                {data.name}
            </Tooltip>
        </Marker>
    )
}