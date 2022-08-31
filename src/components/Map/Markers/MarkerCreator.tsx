import React from 'react';
import {Icon} from "leaflet";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {TGatherPoint, TLocation} from "../../../Types/ResourceTypes";
// import styles from './MarkerCreator.module.css';

const iconPicker = (type: string) =>{
    switch (type){
        case 'Lumberjacking': return require('./../../../assets/icons/Material/Wood/t1.png')
        default : return require('./../../../assets/icons/temp.png')
    }
}
const locationIconPicker = (type: string) =>{
    switch (type) {
        case type: return require(`./../../../assets/icons/location/${type}.png`)
        default: return require('./../../../assets/icons/location/Unknown.png')
    }
}
export const MC = {
    location: (loc: TLocation) => {
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    iconAnchor: [25,60],
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: locationIconPicker(loc.icon),
                    iconSize: [50, 60],
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
    gatherPoint: (loc: TGatherPoint) => {
        // const icon = `./../../../assets/icons/${iconPicker(loc.type)}.png`
        // console.log(icon)
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: iconPicker(loc.type),
                    iconSize: [50, 50],
                    popupAnchor: [0, -25],
                })}
                position={{lat: loc.pos.x, lng: loc.pos.y}}>
                <Popup>
                    <p>{loc.name}</p>
                    <p>{loc.type}</p>
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