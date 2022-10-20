import {TLocation, TNpc, TQuest} from "../../../Types/MainEntities";
import {TMapPosition} from "../../../Types/CommonTypes";
import {LatLngExpression} from "leaflet";
import {CircleMarker, Polyline, Popup, Tooltip} from "react-leaflet";
import s from "./MarkerCreator.module.css";
import {getStageStr} from "../../../Unils/utilsFunctions";
import React from "react";
import {getPosFromQuestStage} from "./MarkerCreator";

export const QuestMarker = (data: TQuest, zoom: number, locations: Array<TLocation> | null = null, npc: Array<TNpc>) => {
    const fillLime = {color: 'lime', fillColor: 'lime', fillOpacity: 0.9}
    const follOrange = {color: 'orange', fillColor: 'orange', fillOpacity: 0}
    const fillBlue = {fillColor: 'blue'}
    const npcStart = npc.find(v => v.name === data.startAt)
    const npcEnd = npc.find(v => v.name === data.endAt)
    const startPos = data.startAt === 'auto' ? '' : locations!.find(v => v.name === npcStart?.location)
    const endPos = data.startAt === 'auto' ? '' : locations!.find(v => v.name === npcEnd?.location)
    const stagePath = data.qStages.map(v => {
        const pos: TMapPosition = getPosFromQuestStage(v.stagePos, v.stagePosType, locations)
        return [pos.x, pos.y]
    }).filter(v => v[0] !== 0 && v[1] !== 0) as LatLngExpression[]
    let path: LatLngExpression[] = []
    if (startPos !== undefined && startPos !== '') path = [[startPos.pos.x, startPos.pos.y]]
    path = [...path, ...stagePath]
    if (endPos !== undefined && endPos !== '') path = [[endPos.pos.x, endPos.pos.y]]
    // console.log(startPos)
    // console.log(endPos)
    // console.log(path)
    return <>
        {path.length > 2 ? // + (!!startPos?1:0)+ (!!endPos?1:0) > 2 ?
            <>
                <Polyline pathOptions={fillLime} positions={[path[0], path[1]]}/>
                <Polyline pathOptions={follOrange} positions={path.filter((v, i) => i > 0)}/>
            </>
            : <Polyline pathOptions={fillLime} positions={path}/>}
        {path.map((v, i) =>
            <CircleMarker center={v} pathOptions={i === 0 ? fillLime : follOrange} radius={10}>
                {!!startPos && i === 0 && <Tooltip offset={[-20, 0]} direction={'left'} permanent>Start</Tooltip>}
                {!!startPos && i > 0 && (!endPos || (endPos && i < path.length - 1)) && <>
                    <Popup>
                        <div className={s.popupDiv}>{getStageStr(data.qStages[i - (!!startPos ? 1 : 0)])}</div>
                    </Popup>
                    <Tooltip offset={[20, 0]}
                             direction={'right'}>{`${data.qStages[i - (!!startPos ? 1 : 0)].num}: ${data.qStages[i - (!!startPos ? 1 : 0)].name}`}</Tooltip>
                </>
                }
                {/*{(path.length > 1 && i === 0) ?*/}
                {/*    <Tooltip offset={[20, 0]} direction={'right'} permanent>Start</Tooltip>*/}
                {/*    : <Tooltip offset={[20, 0]}*/}
                {/*               direction={'right'}>{`${data.qStages[i].num}: ${data.qStages[i].name}`}</Tooltip>}*/}
            </CircleMarker>)}
    </>
}