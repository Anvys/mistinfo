import {TQuest, TQuestItemSource} from "../../../Types/MainEntities";
import {TMapPosition} from "../../../Types/CommonTypes";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {Icon} from "leaflet";
import React from "react";
import {iconPicker} from "./MarkerCreator";
import s from "./MarkerCreator.module.css";

export const QuestItemMarker = (data: TQuestItemSource, zoom: number, pos: TMapPosition, icon: string, forQuests: Array<TQuest>) => {

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
            {forQuests.length>0 && <Popup  className={s.popupDiv}>
                {`\t${data.name}\n`}
                {`Used for quests: \n`}
                {forQuests.map(v=>`> ${v.name} <${v.link}>\n`)}
            </Popup>}
        </Marker>
    )
}