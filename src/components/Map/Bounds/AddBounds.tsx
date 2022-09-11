import React, {useEffect, useState} from 'react';
import {Marker, Polyline, useMap} from "react-leaflet";
import {Icon, LeafletMouseEvent} from "leaflet";
import Control from 'react-leaflet-custom-control'
import s from '../Map.module.css'
import {useSelector} from "react-redux";
import {MapSelectors} from "../../../redux/dataSelectors";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";

type TProps = {
    // onSaveBounds: (bounds: Array<[number, number]>) => void
    // onResetBounds: () => void
};
export const AddBounds: React.FC<TProps> = (props) => {
    // const {onResetBounds, onSaveBounds} = props
    // const isAddActive = useSelector(MapSelectors.isBoundActive)
    const dispatch = useAppDispatch()
    const [isAddActive, setIsAddActive] = useState(false)
    const storedBounds = useSelector(MapSelectors.getBounds)
    const [bounds, setBounds] = useState<Array<[number, number]>>(()=>storedBounds)
    const map = useMap()
    const [polyPath, setPolyPath] = useState<Array<[number, number]>>([])
    const toggleAddMode: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        if (isAddActive) setBounds([])
        // dispatch(MapSlice.actions.setIsAddBoundsActive(!isAddActive))
        setIsAddActive(actual => !actual)
    }
    const onAddPosHandler = (bnd: [number, number]) => {
        setBounds(actual => [...actual, bnd])
    }
    const onSaveBoundsHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        if(bounds.length>2){
            console.log(`Save ${bounds.length}`)
            dispatch(MapSlice.actions.setBounds(bounds))
            dispatch(MapSlice.actions.setIsAddBoundsActive(false))
            setIsAddActive(false)
            // onSaveBounds(bounds)
            setBounds([])
        }else{
            console.log(`Points must be 3 or more`)
        }
    }
    const onResetBoundsHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        console.log(`Reset ${bounds.length}`)
        dispatch(MapSlice.actions.setBounds([]))
        setBounds([])
        // onResetBounds()
    }
    const onMapClick = (e: LeafletMouseEvent) => {
        if (isAddActive) onAddPosHandler([+e.latlng.lat.toFixed(3), +e.latlng.lng.toFixed(3)])
        console.log(`EL click ${isAddActive}`)
    }
    useEffect(() => {
        if (!map) return;
        console.log(`Install EL`)
        map.addEventListener("click", onMapClick);
        return () => {
            console.log(`Remove EL`)
            map.removeEventListener('click', onMapClick)
        }
    }, [map, isAddActive]);
    useEffect(() => {
        if (bounds.length > 2) setPolyPath(actual => [...bounds, bounds[0]])
        if (bounds.length === 0) setPolyPath([])
    }, [bounds])

    return (
        <div className={'leaflet-top'}>
            <div className="leaflet-control leaflet-bar">
                <Control position={"topleft"}>
                    <div className={s.controlBoundMenu}>
                        <button className={isAddActive ? s.controlButtonActive : s.controlButton}
                                onClick={toggleAddMode} type={'button'}>ToogleAddMode
                        </button>
                        {isAddActive && <button className={s.controlButton}
                                                onClick={onSaveBoundsHandler} type={'button'}>Save</button>}
                        {isAddActive && <button className={s.controlButton}
                                                onClick={onResetBoundsHandler} type={'button'}>Reset</button>}
                        {/*{bounds.length > 2 && 'len>2'}*/}
                    </div>

                </Control>

                {bounds.length > 0 && bounds.map(bound => (
                    <Marker
                        // draggable={false}
                        // eventHandlers={eventHandlers}
                        // ref={markerRef}
                        icon={new Icon({
                            // iconAnchor: [25*(zoom-4)*0.5,60*(zoom-4)*0.5],
                            iconUrl: require(`./../../../assets/icons/targetYellow.png`),
                            // iconUrl: iconPicker(loc.icon),
                            iconSize: [30, 30],
                            // tooltipAnchor: [10 * (zoom - 4) * 0.5, 0],
                        })}
                        position={{lat: bound[0], lng: bound[1]}}>
                    </Marker>
                ))}
                {bounds.length > 2 && <Polyline pathOptions={{color: 'lime'}} positions={polyPath}/>}
            </div>
        </div>
    );
}