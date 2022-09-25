import React from 'react';
import {LayerGroup, LayersControl, useMap, useMapEvent} from "react-leaflet";
import Control from 'react-leaflet-custom-control';
import {TLayerFilters} from "../MyMap";
import {useSelector} from "react-redux";
import {MapSelectors, QuestSelectors, RegionSelectors} from "../../../redux/dataSelectors";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import s from './LayerFilter.module.css';
import {SimpleSelectField} from "../../DataAdd/Fields/SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";

type TProps = {
    global: boolean
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
    const {filter, global} = props
    const isAddActive = useSelector(MapSelectors.isAddActive)
    const activeQuest = useSelector(MapSelectors.getActiveQuest)
    const activeRegion = useSelector(MapSelectors.getActiveRegion)
    const quests = useSelector(QuestSelectors.getData)
    const regions = useSelector(RegionSelectors.getData)
    const map = useMap()
    const dispatch = useAppDispatch()
    const onQuestSelect = (qName: string) => {
        const findRes = quests.find(v => v.name === qName)
        if (findRes) dispatch(MapSlice.actions.setActiveQuest(qName))
    }
    const onRegionSelect = (rName: string) => {
        const findRes = regions.find(v => v.name === rName)
        if (findRes) {
            // move  view center map
            map.setView({lat:findRes.pos.x, lng:findRes.pos.y}, map.getZoom(), {animate: true,})
            dispatch(MapSlice.actions.setActiveRegion(rName))
        }
    }
    return (
        <div>
            <Control position={"topright"}>
                <div className={s.controlDiv}>
                    <button className={s.controlButton} type={'button'} onClick={(e) => {
                        e.stopPropagation()
                        props.onResetActiveQuest()
                    }}>Reset
                    </button>
                    {!global && <button className={s.controlButton} type={'button'}
                                        style={{backgroundColor: `${isAddActive ? 'red' : 'green'}`}} onClick={(e) => {
                        e.stopPropagation()
                        dispatch(MapSlice.actions.setIsAddPosFieldActive(!isAddActive))
                    }}>Toggle add marker</button>}
                    {quests.length > 0 &&
                        <SimpleSelectField mapSelectValues={quests.map(v => v.name)} value={activeQuest}
                                           onSelChange={onQuestSelect} labelText={'quest'}/>}
                    {regions.length > 0 &&
                        <SimpleSelectField mapSelectValues={regions.map(v => v.name)} value={activeRegion}
                                           onSelChange={onRegionSelect} labelText={'region'}/>}
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
