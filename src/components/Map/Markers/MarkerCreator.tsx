import React from 'react';
import {Icon} from "leaflet";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {TGatherPoint, TLocation, TStaminaElixir} from "../../../Types/ResourceTypes";
// import styles from './MarkerCreator.module.css';

const iconPicker = (type: string) =>{
    if(!type)return require('./../../../assets/icons/temp.png')
    const iPath = type.split('/')
    if(iPath.length===3){
        return require(`./../../../assets/icons/material/${iPath[1]}/${iPath[2]}.png`)
        // switch (type){
        //     case 'Lumberjacking': return require('./../../../assets/icons/material/Wood/t1.png')
        //     // case 'Lumberjacking': return require('./../../../assets/icons/material/Wood/t1.png')
        //     default : return require('./../../../assets/icons/temp.png')
        // }
    }else{
        return require('./../../../assets/icons/temp.png')
    }

}
const locationIconPicker = (type: string) =>{
    switch (type) {
        case type: return require(`./../../../assets/icons/location/${type}.png`)
        default: return require('./../../../assets/icons/location/Unknown.png')
    }
}
export const MC = {
    staminaElixir : (loc: TStaminaElixir, zoom: number) =>{
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    // iconAnchor: [25*(zoom-4)*0.5,60*(zoom-4)*0.5],
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: loc.icon,
                    iconSize: [30*(zoom-4)*0.5, 30*(zoom-4)*0.5],
                    tooltipAnchor: [10*(zoom-4)*0.5, 0],
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
    location: (loc: TLocation, zoom: number) => {
        // console.log(zoom)
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    iconAnchor: [25*(zoom-4)*0.5,60*(zoom-4)*0.5],
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: locationIconPicker(loc.icon),
                    iconSize: [40*(zoom-4)*0.5, 50*(zoom-4)*0.5],
                    popupAnchor: [0, -25],
                })}
                position={{lat: loc.pos.x, lng: loc.pos.y}}>
                <Popup>
                    <p>{loc.name}</p>
                    {loc.exploreReq > 0 && <p>explore: {loc.exploreReq}</p>}
                </Popup>

            </Marker>
        )
    },
    gatherPoint: (loc: TGatherPoint, zoom: number) => {
        // const icon = `./../../../assets/icons/${iconPicker(loc.type)}.png`
        // console.log(icon)
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: iconPicker(loc.icon),
                    iconSize: [50*(zoom-4)*0.3, 50*(zoom-4)*0.3],
                    popupAnchor: [0, -25],
                })}
                position={{lat: loc.pos.x, lng: loc.pos.y}}>
                <Popup>
                    <p>{loc.name}</p>
                    <p>{loc.type}</p>
                    <p>icon: {loc.icon}</p>
                    {/*<p>dif:{loc.difficult}</p>*/}
                    <p>count:{loc.count}</p>
                    {/*{loc.exploreReq>0 && <p>explore: {loc.exploreReq}</p>}*/}
                </Popup>
                <Tooltip><p>{loc.name}</p></Tooltip>
            </Marker>
        )
    },
}
type TProps = {};
export const MarkerCreator: React.FC<TProps> = (props) => {
    return (
        <div>

        </div>
    );
}