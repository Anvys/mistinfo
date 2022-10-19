import React, {useState} from 'react';
import {LayerGroup, LayersControl, useMap} from "react-leaflet";
import Control from 'react-leaflet-custom-control';
import {TLayerFilters} from "../MyMap";
import {useSelector} from "react-redux";
import {
    ComponentSelectors,
    LocationSelectors,
    LootSelectors,
    MapSelectors, MaterialSelectors,
    QuestSelectors,
    RegionSelectors
} from "../../../redux/dataSelectors";
import {useAppDispatch} from "../../../redux/store";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import s from './LayerFilter.module.css';
import {SimpleSelectField} from "../../DataAdd/Fields/SelectField";
import {useLocation, useNavigate} from "react-router-dom";
import {TMapPosition} from "../../../Types/CommonTypes";
import {getPosFromQuestStage} from "../Markers/MarkerCreator";

const selectMarkers = ['Quest', 'Region', 'Resource'] as const
type TSelectMarkers = typeof selectMarkers[number]
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
    // active Markers state
    const [activeMarker, setActiveMarker] = useState<TSelectMarkers | undefined>(undefined)

    const isAddActive = useSelector(MapSelectors.isAddActive)
    const activeQuest = useSelector(MapSelectors.getActiveQuest)
    const activeRegion = useSelector(MapSelectors.getActiveRegion)
    const activeResource = useSelector(MapSelectors.getActiveResource)
    const quests = useSelector(QuestSelectors.getData)
    const regions = useSelector(RegionSelectors.getData)
    const locations = useSelector(LocationSelectors.getData)
    const resourceArr = [...useSelector(MaterialSelectors.getData).filter(v=>v.type!=='Bone'), ...useSelector(ComponentSelectors.getData).filter(v=>v.type==='Plant')]//.sort((a,b)=>a.gatherDifficulty-b.gatherDifficulty).sort((a,b)=>a.type.length-b.type.length)
    const resourceValues = resourceArr.map(v=>v.name)
    const resourceNames = resourceArr.map(v=>`${v.type} ${v.name}`)
    const map = useMap()
    const loca = useLocation()
    const history = useNavigate()
    const dispatch = useAppDispatch()
    const onQuestSelect = (qName: string) => {
        const findRes = quests.find(v => v.name === qName)
        if (findRes) {
            dispatch(MapSlice.actions.setActiveQuest(qName))
            if(findRes.qStages.length>0){
                const pos: TMapPosition = getPosFromQuestStage(findRes.qStages[0].stagePos, findRes.qStages[0].stagePosType, locations)
                map.setView({lat:pos.x, lng:pos.y}, map.getZoom(), {animate: true,})
                if(loca.search.length>0) history('/map')
                dispatch(MapSlice.actions.setActiveRegion(undefined))
                dispatch(MapSlice.actions.setIsActiveRegion(false))

                dispatch(MapSlice.actions.setActiveResource(undefined))
                dispatch(MapSlice.actions.setIsActiveResource(false))
            }
        }
    }
    const onRegionSelect = (rName: string) => {
        const findRes = regions.find(v => v.name === rName)
        if (findRes) {
            // move  view center map
            map.setView({lat:findRes.pos.x, lng:findRes.pos.y}, map.getZoom(), {animate: true,})
            dispatch(MapSlice.actions.setActiveRegion(rName))
            if(loca.search.length>0) history('/map')
            dispatch(MapSlice.actions.setActiveQuest(undefined))
            dispatch(MapSlice.actions.setIsActiveQuestMap(false))

            dispatch(MapSlice.actions.setActiveResource(undefined))
            dispatch(MapSlice.actions.setIsActiveResource(false))
        }
    }
    const onResourceSelect = (rName: string) => {
        // const findRes = regions.find(v => v.name === rName)
        if (rName) {
            dispatch(MapSlice.actions.setActiveResource(rName))

            dispatch(MapSlice.actions.setActiveQuest(undefined))
            dispatch(MapSlice.actions.setIsActiveQuestMap(false))

            dispatch(MapSlice.actions.setActiveRegion(undefined))
            dispatch(MapSlice.actions.setIsActiveRegion(false))
        }
    }

    return (
        <div>
            <Control position={"topright"}>
                <div className={s.controlDiv}>
                    <button className={s.controlButton} type={'button'} onClick={(e) => {
                        e.stopPropagation()
                        setActiveMarker(undefined)
                        props.onResetActiveQuest()
                    }}>Reset
                    </button>
                    <SimpleSelectField mapSelectValues={[...selectMarkers]} value={activeMarker}
                                       onSelChange={val=>setActiveMarker(val as TSelectMarkers | undefined)} labelText={'Marker'}/>
                    {!global && <button className={s.controlButton} type={'button'}
                                        style={{backgroundColor: `${isAddActive ? 'red' : 'green'}`}} onClick={(e) => {
                        e.stopPropagation()
                        dispatch(MapSlice.actions.setIsAddPosFieldActive(!isAddActive))
                    }}>Toggle add marker</button>}
                    {activeMarker === 'Quest' && quests.length > 0 &&
                        <SimpleSelectField mapSelectValues={quests.map(v => v.name)} value={activeQuest}
                                           onSelChange={onQuestSelect} labelText={'quest'}/>}
                    {activeMarker === 'Region' && regions.length > 0 &&
                        <SimpleSelectField mapSelectValues={regions.map(v => v.name)} value={activeRegion}
                                           onSelChange={onRegionSelect} labelText={'region'}/>}
                    {activeMarker === 'Resource' && resourceNames.length > 0 &&
                        <SimpleSelectField mapSelectValues={resourceValues} mapSelectNames={resourceNames} value={activeResource}
                                           onSelChange={onResourceSelect} labelText={'Res'}/>}
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
