import React from 'react';
import Leaf, {Icon} from "leaflet";
import {ImageOverlay, Marker, Popup, Tooltip} from "react-leaflet";
import {TEvent, TGatherPoint, TLocation, TStaminaElixir} from "../../../Types/CommonTypes";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import {useSelector} from "react-redux";
import {getAddMarkerIconSelector, getAddMarkerSizeSelector} from "../../../redux/dataSelectors";
import {iconUrlPicker} from "../../IconPicker/IconPicker";
import {getStagesStr} from "../../../Unils/utilsFunctions";
// import styles from './MarkerCreator.module.css';

const iconPicker = (type: string) => {
    if (!type) return require('./../../../assets/icons/temp.png')
    const iPath = type.split('/')
    if (iPath.length === 2) {
        // return require(`./../../../assets/icons/material/${iPath[1]}/${iPath[2]}.png`)
        return iconUrlPicker(iPath[0], iPath[1])
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
export const MC = {
    events: (data: TEvent, zoom: number) => {
        const t = new Image()
        t.src = iconPicker(data.icon)
        const iW = t.width / 4 * (zoom - 4) * 0.5
        const iH = t.height / 4 * (zoom - 4) * 0.5

        return (
            <Marker
                autoPan={false}
                draggable={false}
                icon={new Icon({
                    iconAnchor: [iW/2, iH*5/6],
                    iconUrl: t.src,
                    iconSize: [iW, iH],
                    popupAnchor: [iW / 2 - iW/2, 0 - iH*5/6],
                })}
                position={{lat: data.pos.x, lng: data.pos.y}}>
                <Popup autoPan={false}>
                    <p>{data.name}</p>
                    <p>{getStagesStr(data.stages)}</p>
                </Popup>

            </Marker>
        )
    },
    getTowns: (zoom: number) => {
        const t = new Image()
        t.src = require('./../../../assets/icons/mapobject/CityKortombourgNew.png')
        console.log(`${t.width} : ${t.height}`)
        const coef = getResizeForTowns(zoom)
        console.log(`coef ${coef}`)
        let size = [1875 / coef, 1602 / coef]
        let size1 = size[0]
        let size2 = size[1]
        const dopCoef = 1000
        const dopCoefX = 0.15
        const dopCoefY = 0.15
        const towns = [
            <ImageOverlay
                // autoPan={false}
                // bubblingMouseEvents={false}
                url={require('./../../../assets/icons/mapobject/CityKortombourgNew.png')}
                bounds={[[-0.18-size1/dopCoef+dopCoefX, -45.68-size2/dopCoef+dopCoefY],[-0.18+size2/dopCoef+dopCoefX, -45.68+size2/dopCoef+dopCoefY]]}
                // pane={'overlayPane'}
                // icon={new Icon({
                //     iconUrl: ,
                //     iconSize: [1875 / coef, 1602 / coef],
                //     iconAnchor: [1875 / coef / 2, 1602 / coef / 2],
                //     pane: 'overlayPane',
                //
                // })}
                // position={[-0.18, -45.68]}
            />,
            // <Marker
            //     autoPan={false}
            //     bubblingMouseEvents={false}
            //
            //     pane={'overlayPane'}
            //     icon={new Icon({
            //         iconUrl: require('./../../../assets/icons/mapobject/CityKortombourgNew.png'),
            //         iconSize: [1875 / coef, 1602 / coef],
            //         iconAnchor: [1875 / coef / 2, 1602 / coef / 2],
            //         pane: 'overlayPane',
            //
            //     })} position={[-0.18, -45.68]}/>,
            // <Marker
            //     autoPan={false}
            //
            //     icon={new Icon({
            //         iconUrl: require('./../../../assets/icons/mapobject/CityQuara.png'),
            //         iconSize: [1360 / coef, 773 / coef],
            //         iconAnchor: [1360 / coef / 2, 773 / coef / 2],
            //     })}
            //     position={[3.56, -64.64]}
            //     pane={'shadowPane'}
            //
            // />
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
    location: (data: TLocation, zoom: number) => {
        const t = new Image()
        t.src = iconPicker(data.icon)
        const iW = t.width / 4 * (zoom - 4) * 0.5
        const iH = t.height / 4 * (zoom - 4) * 0.5
        // console.log(zoom)
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
                    iconAnchor: [iW/2, iH*5/6],
                    iconUrl: t.src,
                    iconSize: [iW, iH],
                    popupAnchor: [iW / 2 - iW/2, 0 - iH*5/6],
                })}
                position={{lat: data.pos.x, lng: data.pos.y}}>
                <Popup autoPan={false}>
                    <p>{data.name}</p>
                    {data.exploreReq > 0 && <p>explore: {data.exploreReq}</p>}
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
            position={pos}
            // zIndex={9999}
            pane={'popupPane'}
        >
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