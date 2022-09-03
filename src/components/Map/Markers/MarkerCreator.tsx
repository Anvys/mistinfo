import React from 'react';
import Leaf, {Icon} from "leaflet";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {TGatherPoint, TLocation, TStaminaElixir} from "../../../Types/CommonTypes";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import {useSelector} from "react-redux";
import {getAddMarkerIconSelector, getAddMarkerSizeSelector} from "../../../redux/dataSelectors";
// import styles from './MarkerCreator.module.css';

const iconPicker = (type: string) => {
    if (!type) return require('./../../../assets/icons/temp.png')
    const iPath = type.split('/')
    if (iPath.length === 3) {
        return require(`./../../../assets/icons/material/${iPath[1]}/${iPath[2]}.png`)
        // switch (type){
        //     case 'Lumberjacking': return require('./../../../assets/icons/material/Wood/t1.png')
        //     // case 'Lumberjacking': return require('./../../../assets/icons/material/Wood/t1.png')
        //     default : return require('./../../../assets/icons/temp.png')
        // }
    } else {
        return require('./../../../assets/icons/temp.png')
    }

}
const locationIconPicker = (type: string) => {
    switch (type) {
        case type:
            return require(`./../../../assets/icons/location/${type}.png`)
        default:
            return require('./../../../assets/icons/location/Unknown.png')
    }
}
type TAddDataMarkerProps = {
    pos: { lat: number, lng: number }
    markerRef: React.RefObject<Leaf.Marker>
    eventHandlers: { dragend(): void }
};
const getResizeForTowns = (zoom: number): number=> {
    switch (zoom) {
        case 5:
            return 25
        case 6:
            return 12
        case 7:
            return 6
        case 8:
            return 3
        default: return 1
    }
}
export const MC = {
    getTowns: (zoom: number) => {
        const t = new Image()
        t.src = require('./../../../assets/icons/mapobject/CityKortombourgNew.png')
        console.log(`${t.width} : ${t.height}`)
        const coef = getResizeForTowns(zoom)
        let size = [1875/coef,	1602/coef]
        let size1 = size[0]
        let size2 = size[1]
        const towns = [
            <Marker
            icon={new Icon({
                iconUrl: require('./../../../assets/icons/mapobject/CityKortombourgNew.png'),
                iconSize: [1875/coef, 1602/coef],
                iconAnchor: [1875/coef / 2, 1602/coef / 2],
            })} position={[-0.18, -45.68]}        />,
            <Marker
                icon={new Icon({
                    iconUrl: require('./../../../assets/icons/mapobject/CityQuara.png'),
                    iconSize: [1360/coef, 773/coef],
                    iconAnchor: [1360/coef / 2, 773/coef / 2],
                })} position={[3.56, -64.64]}            />
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
                    iconUrl: loc.icon,
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
    location: (loc: TLocation, zoom: number) => {
        // console.log(zoom)
        return (
            <Marker
                draggable={false}
                // eventHandlers={eventHandlers}
                // ref={markerRef}
                icon={new Icon({
                    iconAnchor: [25 * (zoom - 4) * 0.5, 60 * (zoom - 4) * 0.5],
                    // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                    iconUrl: locationIconPicker(loc.icon),
                    iconSize: [40 * (zoom - 4) * 0.5, 50 * (zoom - 4) * 0.5],
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
                    iconSize: [50 * (zoom - 4) * 0.3, 50 * (zoom - 4) * 0.3],
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

const AddDataMarker: React.FC<TAddDataMarkerProps> = (props) => {
    const {pos, markerRef, eventHandlers} = props
    const dispatch = useAppDispatch()
    const icon = useSelector(getAddMarkerIconSelector)
    const iconSize = useSelector(getAddMarkerSizeSelector)
    // const isActive = useSelector(getIs)
    const onAddHereHandler = () => {
        const mPos = markerRef.current?.getLatLng();
        dispatch(MapSlice.actions.setMarkerForAddPos({
            x: Number(mPos?.lat?.toFixed(2)) || 0,
            y: Number(mPos?.lng?.toFixed(2)) || 0
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
                popupAnchor: [0, -25],
            })}
            position={pos}>
            <Popup>

                <div>
                    {`x:${Number(pos?.lat?.toFixed(2))} | y:${Number(pos?.lng?.toFixed(2))}`}

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