import React from 'react';
import Leaf, {Icon, LatLngExpression} from "leaflet";
import {CircleMarker, ImageOverlay, Marker, Polygon, Polyline, Popup, Tooltip} from "react-leaflet";
import {
    TComponent,
    TEvent,
    TGatherPoint,
    TLocation,
    TLoot,
    TMapPosition,
    TMaterial,
    TNpc,
    TQuest,
    TQuestItemSource,
    TRegion,
    TShop,
    TStagePos,
    TStagePosType,
    TStaminaElixir
} from "../../../Types/CommonTypes";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import {useSelector} from "react-redux";
import {getAddMarkerIconSelector, getAddMarkerSizeSelector} from "../../../redux/dataSelectors";
import {iconUrlPicker} from "../../IconPicker/IconPicker";
import {getStagesStr, getStageStr, getTimeStr} from "../../../Unils/utilsFunctions";
import s from './MarkerCreator.module.css';


const colors = {
    activeEvents: '#D7C72DFF',
    activeGathers: '#ffa817',
}
const iconSetting = {
    townIcons: ['Kortombourg'],
    toIncrease: ['Gris Domain'],
}
const iconPicker = (type: string) => {
    if (!type) return require('./../../../assets/icons/temp.png')
    const iPath = type.split('/')
    if (iPath.length === 2) {
        return iconUrlPicker(iPath[0], iPath[1])
    } else {
        return require('./../../../assets/icons/temp.png')
    }
}

type TAddDataMarkerProps = {
    pos: { lat: number, lng: number }
    markerRef: React.RefObject<Leaf.Marker>
    eventHandlers: { dragend(): void }
};
const getResizeForTowns = (zoom: number): number => {
    switch (zoom) {
        case 5:
            return 25
        case 6:
            return 12
        case 7:
            return 6
        case 8:
            return 3
        default:
            return 1
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
export const MC = {
    region: (data: TRegion, zoom: number, locations: Array<TLocation>, gatherPoints: Array<TGatherPoint>,
             events: Array<TEvent>, loots: Array<TLoot>, resources: Array<TMaterial | TComponent>, activeRegion: string | undefined) => {
        if (!data) return <></>
        const isActive = activeRegion === data.name
        const ownLocations = locations.filter(v => v.region === data.name)
        const ownGather = gatherPoints.filter(v => v.region === data.name)
        const ownEvent = events.filter(v => v.region === data.name)
        const bounds = data.bound
        // if(bounds.length > 0){
        //     const path = bounds.map(bound => (
        //
        //     ))
        // }else return null

        return <Polygon
            pathOptions={{color: `${isActive ? 'orange' : 'lime'}`, fillColor: `${isActive ? 'none' : 'lime'}`}}
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
                        const gatherDifficult = loots.find(loot => loot.name === v.loot)?.loot.reduce((p, c) => {
                            const dif = resources.find(res => res.name === c.name)?.gatherDifficulty
                            if (!!dif) return dif > p ? dif : p
                            else return p
                        }, 0)
                        return ` ~ ${v.count}x${v.name}(${getTimeStr(v.cooldown)}) [${v.type.substring(0, 1)}. ${gatherDifficult}]`
                    }).join('\n')}
                </details>}

            </Popup>
        </Polygon>
    },
    questItem: (data: TQuestItemSource, zoom: number, pos: TMapPosition, icon: string) => {

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
    },
    quest: (data: TQuest, zoom: number, locations: Array<TLocation> | null = null, npc: Array<TNpc>) => {
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
    },
    events: (data: TEvent, zoom: number, activeRegion: string | undefined) => {
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
    },
    getTowns: (zoom: number) => {
        const t = new Image()
        t.src = require('./../../../assets/icons/mapobject/CityKortombourgNew.png')
        // console.log(`${t.width} : ${t.height}`)
        const coef = getResizeForTowns(zoom)
        // console.log(`coef ${coef}`)
        let size = [1875 / coef, 1602 / coef]
        let size1 = size[0]
        let size2 = size[1]
        const dopCoef = 1000
        const dopCoefX = 0.15
        const dopCoefY = 0.15
        const towns = [
            <ImageOverlay
                url={require('./../../../assets/icons/mapobject/CityKortombourgNew.png')}
                bounds={[[-0.18 - size1 / dopCoef + dopCoefX, -45.68 - size2 / dopCoef + dopCoefY], [-0.18 + size2 / dopCoef + dopCoefX, -45.68 + size2 / dopCoef + dopCoefY]]}
            />,

        ]
        return towns
    },
    addDataMarker: (pos: { lat: number, lng: number }, markerRef: React.RefObject<Leaf.Marker>, eventHandlers: { dragend(): void }) =>
        <AddDataMarker pos={pos} markerRef={markerRef} eventHandlers={eventHandlers}/>,
    mapObjects: () => {

    },
    staminaElixir: (loc: TStaminaElixir, zoom: number) => {
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    // iconAnchor: [25*(zoom-4)*0.5,60*(zoom-4)*0.5],
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: iconPicker(loc.icon),
                    iconSize: [30 * (zoom - 4) * 0.5, 30 * (zoom - 4) * 0.5],
                    tooltipAnchor: [10 * (zoom - 4) * 0.5, 0],
                })}
                position={{lat: loc.pos.x, lng: loc.pos.y}}>
                {/*<Popup>*/}
                {/*    <p>{loc.name}</p>*/}
                {/*    {loc.exploreReq > 0 && <p>explore: {loc.exploreReq}</p>}*/}
                {/*</Popup>*/}
                <Tooltip>
                    {loc.name}
                </Tooltip>

            </Marker>
        )
    },
    location: (data: TLocation, zoom: number, moveTo: TLocation | undefined,
               onMoveToClickHandler: (pos: { lat: number, lng: number }) => void, npcIn: Array<TNpc>, shopIn: Array<TShop>) => {
        const t = new Image()
        t.src = iconPicker(data.icon)
        const resizeCoef = iconSetting.townIcons.includes(data.region) || iconSetting.toIncrease.includes(data.name) ? 1.5 : 1
        const iW = t.width * resizeCoef / 4 * (zoom - 4) * 0.5
        const iH = t.height * resizeCoef / 4 * (zoom - 4) * 0.5
        // console.log(zoom)
        const onClick = () => {
            if (moveTo !== undefined) {
                const pos = {lat: moveTo.pos.x, lng: moveTo.pos.y}
                onMoveToClickHandler(pos)
            }
        }
        const pos = {lat: data.pos.x, lng: data.pos.y}
        return (
            <Marker
                draggable={false}
                autoPan={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    // iconAnchor: [25 * (zoom - 4) * 0.5, 60 * (zoom - 4) * 0.5],
                    // // iconUrl: require(`./../../../assets/icons/${data.icon}.png`),
                    // iconUrl: locationIconPicker(data.icon),
                    // iconSize: [40 * (zoom - 4) * 0.5, 50 * (zoom - 4) * 0.5],
                    // popupAnchor: [0, -25],
                    iconAnchor: [iW / 2, iH * 5 / 6],
                    iconUrl: t.src,
                    iconSize: [iW, iH],
                    popupAnchor: [iW / 2 - iW / 2, 0 - iH * 5 / 6],
                })}
                position={pos}>
                <Tooltip offset={[15, -5]}>{data.name}</Tooltip>
                <Popup autoPan={false}>
                    <p>{data.name}</p>
                    <div className={s.popupDiv}>
                        {data.exploreReq > 0 && <p>explore: {data.exploreReq}</p>}
                        {npcIn.length > 0 && <details>
                            <summary>{`Npc: ${npcIn.length}`}</summary>
                            {npcIn.map(v => {
                                const shop = shopIn.find(s => s.npc === v.name)
                                return `${v.name} ${!!shop ? `Shop: [${shop.content.length} items]\n` : ``}\n`
                            })}
                        </details>}
                        {/*{shopIn.length>0 && shopIn.map(v=>`Shop: ${v.name} [${v.content.length} items]\n`)}*/}
                        {moveTo !== undefined &&
                            <button className={s.controlButton} type={"button"} onClick={onClick}>Move
                                to {`${moveTo.name}`}</button>}
                    </div>

                </Popup>

            </Marker>
        )
    },
    gatherPoint: (data: TGatherPoint, zoom: number, gatherDifficult: number, activeRegion: string | undefined, activeResource: string) => {
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
                {(activeRegion === data.region || activeResource.length > 0 && data.loot.toLowerCase().includes(activeResource.toLowerCase())) &&
                    <CircleMarker center={pos} radius={25}
                                  pathOptions={{
                                      color: colors.activeGathers,
                                      fillColor: colors.activeGathers,
                                      fillOpacity: 0.7
                                  }}/>}
            </>
        )
    },
}

const AddDataMarker: React.FC<TAddDataMarkerProps> = (props) => {
    const {pos, markerRef, eventHandlers} = props
    const dispatch = useAppDispatch()
    const icon = useSelector(getAddMarkerIconSelector)
    const iconSize = useSelector(getAddMarkerSizeSelector)
    // const isActive = useSelector(getIs)
    const onAddHereHandler = () => {
        const mPos = markerRef.current?.getLatLng();
        dispatch(MapSlice.actions.setMarkerForAddPos({
            x: Number(mPos?.lat?.toFixed(3)) || 0,
            y: Number(mPos?.lng?.toFixed(3)) || 0
        }))
        dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
        console.log(`markeradd x:${Number(mPos?.lat?.toFixed(4))}| y:${Number(mPos?.lng?.toFixed(4))}`)
    }
    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
            icon={new Icon({
                iconUrl: icon,
                iconSize: [iconSize[0], iconSize[1]],
                iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
                popupAnchor: [0, -25],
            })}
            position={pos}
            // zIndex={9999}
            pane={'popupPane'}
        >
            <Popup>

                <div>
                    {`x:${Number(pos?.lat?.toFixed(3))} | y:${Number(pos?.lng?.toFixed(3))}`}

                </div>
                <div>
                    <button onClick={onAddHereHandler}>AddHere</button>
                </div>
            </Popup>
        </Marker>
    );
}
// type TProps = {};
// export const MarkerCreator: React.FC<TProps> = (props) => {
//     return (
//         <div>
//
//         </div>
//     );
// }