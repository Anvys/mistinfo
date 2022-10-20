import React from "react";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {getAddMarkerIconSelector, getAddMarkerSizeSelector} from "../../../redux/dataSelectors";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import {Marker, Popup} from "react-leaflet";
import Leaf, {Icon} from "leaflet";

type TAddDataMarkerProps = {
    pos: { lat: number, lng: number }
    markerRef: React.RefObject<Leaf.Marker>
    eventHandlers: { dragend(): void }
};
export const AddDataMarker: React.FC<TAddDataMarkerProps> = (props) => {
    const {pos, markerRef, eventHandlers} = props
    console.log(`markeradd:`, pos)
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