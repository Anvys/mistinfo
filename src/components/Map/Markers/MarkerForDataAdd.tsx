import React from 'react';
import Leaf, {Icon} from "leaflet";
import {Marker, Popup} from "react-leaflet";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
// import styles from './MarkerForDataAdd.module.css';

type TProps = {
    pos: { lat: number, lng: number }
    markerRef: React.RefObject<Leaf.Marker>
    eventHandlers: { dragend(): void }
};
export const MarkerForDataAdd: React.FC<TProps> = ({pos, markerRef, eventHandlers}) => {
    const dispatch = useAppDispatch()
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
// const map = useMap()
    // useEffect(()=>{pos=map.getCenter()},[])
    // const mCenter = map.getCenter()
    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
            icon={new Icon({
                iconUrl: require('./../../../assets/icons/targetYellow.png'),
                iconSize: [50, 50],
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