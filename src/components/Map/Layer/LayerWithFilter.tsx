import React from 'react';
import {LayerGroup, LayersControl} from "react-leaflet";
import Control from 'react-leaflet-custom-control';
import {TLayerFilters} from "../MyMap";
import {useSelector} from "react-redux";
import {MapSelectors} from "../../../redux/dataSelectors";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
// import styles from './LayerFilter.module.css';

type TProps = {
    filter: TLayerFilters
    locationMarkers: Array<JSX.Element>
    eventMarkers: Array<JSX.Element>
    gatherMarkers: Array<JSX.Element>
    staminaMarkers: Array<JSX.Element>
    questItemMarkers: Array<JSX.Element>
    regionMarkers: Array<JSX.Element>
    onResetActiveQuest: () => void
};
export const LayerWithFilter: React.FC<TProps> = (props) => {
    const {filter} = props
    const isAddActive = useSelector(MapSelectors.isAddActive)
    const dispatch = useAppDispatch()
    return (
        <div>
            <Control position={"topright"}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        props.onResetActiveQuest()
                    }}>Reset active quest
                    </button>
                    {<button style={{backgroundColor: `${isAddActive ? 'red' : 'green'}`}} onClick={(e) => {
                        e.stopPropagation()
                        dispatch(MapSlice.actions.setIsAddPosFieldActive(!isAddActive))
                    }}>Toggle add marker</button>}
                </div>
            </Control>
            <LayersControl position="topright" collapsed={false}>
                <LayersControl.Overlay name="Locations" checked={filter.location}>
                    <LayerGroup>
                        {props.locationMarkers}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Events" checked={filter.event}>
                    <LayerGroup>
                        {props.eventMarkers}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Gathers" checked={filter.gather}>
                    <LayerGroup>
                        {props.gatherMarkers}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Stamina" checked={filter.vigor}>
                    <LayerGroup>
                        {props.staminaMarkers}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="QuestItems" checked={filter.questItem}>
                    <LayerGroup>
                        {props.questItemMarkers}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Regions" checked={filter.region}>
                    <LayerGroup>
                        {props.regionMarkers}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </div>
    );
}
