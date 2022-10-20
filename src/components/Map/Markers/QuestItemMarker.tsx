import {TQuest, TQuestItemSource} from "../../../Types/MainEntities";
import {TMapPosition} from "../../../Types/CommonTypes";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {Icon} from "leaflet";
import React from "react";
import {getPosFromQuestStage, iconPicker} from "./MarkerCreator";
import s from "./MarkerCreator.module.css";
import {Link} from "react-router-dom";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import {useAppDispatch} from "../../../redux/store";

export const QuestItemMarker = (data: TQuestItemSource, zoom: number, pos: TMapPosition, icon: string, forQuests: Array<TQuest>) => {
    const dispatch = useAppDispatch()
    const onQuestClick = (name: string) =>{
        dispatch(MapSlice.actions.setActiveQuest(name))
        dispatch(MapSlice.actions.setIsActiveQuestMap(true))
    }
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
                {forQuests.map(v=>
                    <>
                        {`>`}<Link to={`/quest?name=${v.name}`}>{v.name}</Link>{``}
                        {/*{` (`}<Link to={`/map?quest=${v.name}`}>{`map`}</Link>{`)`}*/}
                        {` (`}<a onClick={()=>onQuestClick(v.name)} className={s.linkA}>{`map`}</a>{`)`}
                        {!!v.link ?`<${v.link}>\n`:'\n'}
                    </>)}
            </Popup>}
        </Marker>
    )
}