import {TLocation, TNpc, TShop} from "../../../Types/MainEntities";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {Icon} from "leaflet";
import s from "./MarkerCreator.module.css";
import React from "react";
import {iconPicker, iconSetting} from "./MarkerCreator";

export const LocationMarker = (data: TLocation, zoom: number, moveTo: TLocation | undefined,
                               onMoveToClickHandler: (pos: { lat: number, lng: number }) => void, npcIn: Array<TNpc>, shopIn: Array<TShop>) => {
    const t = new Image()
    t.src = iconPicker(data.icon)
    const resizeCoef = iconSetting.townIcons.includes(data.region) || iconSetting.toIncrease.includes(data.name) ? 1.5 : 1
    const iW = t.width * resizeCoef / 4 * (zoom - 4) * 0.5
    const iH = t.height * resizeCoef / 4 * (zoom - 4) * 0.5
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
            icon={new Icon({
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
                    {npcIn.length > 0 && <div>
                        {`\tNpc(${npcIn.length}): \n`}
                        {npcIn.map((v,i) => {
                            const shop = shopIn.find(s => s.npc === v.name)
                            return `<${v.name}> ${!!shop ? `Shop: [${shop.content.length} items]\n` : ``}\n`
                        })}
                    </div>}
                    {/*{shopIn.length>0 && shopIn.map(v=>`Shop: ${v.name} [${v.content.length} items]\n`)}*/}
                    {moveTo !== undefined &&
                        <button className={s.controlButton} type={"button"} onClick={onClick}>Move
                            to {`${moveTo.name}`}</button>}
                </div>
            </Popup>
        </Marker>
    )
}