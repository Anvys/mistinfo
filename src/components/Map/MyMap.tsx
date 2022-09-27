import Leaf from 'leaflet';
import React, {useEffect, useRef, useState} from 'react';
import styles from './Map.module.css';
import {CircleMarker, MapContainer, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useSelector} from "react-redux";
import {
    ComponentSelectors,
    EventSelectors,
    GatherPointSelectors,
    LocationSelectors,
    LootSelectors,
    MapSelectors,
    MaterialSelectors,
    MonsterSelectors, NpcSelectors,
    QuestItemSelectors,
    QuestItemSourceSelectors,
    QuestSelectors,
    RegionSelectors, ShopSelectors,
    StaminaElixirSelectors
} from "../../redux/dataSelectors";
import {MC} from "./Markers/MarkerCreator";
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";
import {AddBounds} from "./Bounds/AddBounds";
import {LayerWithFilter} from "./Layer/LayerWithFilter";
import {TLocation, TMapPosition, TMonster} from "../../Types/CommonTypes";
import {useLocation} from "react-router-dom";
import {getSearchParams} from "../../Unils/utilsFunctions";

const MyComponent: React.FC<{ onZoomChange: (z: number) => void, visible: boolean }> = (props) => {
    const [coords, setCoords] = useState({lat: 0, lng: 0});
    const map = useMap()

    const mapEvents = useMapEvents({
        zoom: () => {
            setZoomLevel(mapEvents.getZoom());
            props.onZoomChange(mapEvents.getZoom())
        },
    });
    const [zoomLevel, setZoomLevel] = useState(mapEvents.getZoom()); // initial zoom level provided for MapContainer

    useEffect(() => {
        if (!map) return;

        map.addEventListener("mousemove", (e) => {
            setCoords({lat: e.latlng.lat, lng: e.latlng.lng});
        });
    }, [map]);
    useEffect(() => props.onZoomChange(mapEvents.getZoom()), [])
    return (props.visible ? <div className={styles.coords}>
                {coords.lat && (
                    <div>
                        <b>latitude</b>: {coords.lat?.toFixed(3)} <br/>
                        <b>longitude</b>: {coords.lng?.toFixed(3)}<br/>
                        {`center: x:${map.getCenter().lat.toFixed(3)} | y:${map.getCenter().lng.toFixed(3)}`}
                    </div>
                )}
            </div>
            : <></>

    )
}


export type TLayerFilters = {
    location: boolean
    event: boolean
    gather: boolean
    vigor: boolean
    questItem: boolean
    region: boolean
}
type TProps = {
    wid: number
    hei: number
    global?:boolean
};
export const MyMap: React.FC<TProps> = React.memo((props) => {
    const {global, wid, hei} = props

    const [customMarkerPos, setCustomMarkerPos] = useState({lat: 0, lng: 0})
    const [isCusMarkerActive, setIsCusMarkerActive] = useState(false)
    const [map, setMap] = useState<Leaf.Map | null>(null);
    const [zoom, setZoom] = useState(0)
    const [layerFilter, setLayerFilter] = useState<TLayerFilters>(() => ({
        event: true,
        gather: true,
        vigor: true,
        location: true,
        questItem: true,
        region: false,
    }))



    const isAddMarkerActive = useSelector(MapSelectors.isAddActive)

    const isBoundsMenu = useSelector(MapSelectors.isBoundActive)

    const activeRegion = useSelector(MapSelectors.getActiveRegion)
    const activeResource = useSelector(MapSelectors.getActiveResource)

    //get data from store
    const npc = useSelector(NpcSelectors.getData);
    const materials = useSelector(MaterialSelectors.getData);
    const components = useSelector(ComponentSelectors.getData);
    const resources = [...materials, ...components]
    const loots = useSelector(LootSelectors.getData);
    const locations = useSelector(LocationSelectors.getData);
    const regions = useSelector(RegionSelectors.getData);
    const monsters = useSelector(MonsterSelectors.getData);
    const shops = useSelector(ShopSelectors.getData);
    const gatherPoints = useSelector(GatherPointSelectors.getData);
    const events = useSelector(EventSelectors.getData)
    const stamina = useSelector(StaminaElixirSelectors.getData)
    const quests = useSelector(QuestSelectors.getData)
    const questsItems = useSelector(QuestItemSelectors.getData)
    const questsItemsSource = useSelector(QuestItemSourceSelectors.getData)
    const activeQuest = useSelector(MapSelectors.getActiveQuest)
    //init add marker ref
    const dispatch = useAppDispatch()
    const markerRef = useRef<L.Marker>(null)

    // center map from search string
    const path = useLocation()
    const mapSearchPos = getSearchParams(path.search)
    const center: [number, number] = !!mapSearchPos && mapSearchPos.pos !== undefined ? mapSearchPos.pos : [0, -45]
    if(!!mapSearchPos && mapSearchPos.from?.length && mapSearchPos.pos !== undefined){
        const sPos = {x:mapSearchPos.pos[0], y:mapSearchPos.pos[1]}
        const findRes = regions.find(v=>v.pos.x === sPos.x && v.pos.y===sPos.y)
        if(!!findRes){
            dispatch(MapSlice.actions.setActiveRegion(findRes.name))
            dispatch(MapSlice.actions.setIsActiveRegion(true))
        }
    }


    if(isAddMarkerActive && global){dispatch(MapSlice.actions.setIsAddPosFieldActive(false))}
    const onZoomChange = (z: number) => setZoom(z)

    const onMoveToClickHandler = (pos:{lat:number, lng:number})=>{
        if(map!== null){
            map.setView(pos, map.getZoom(), {animate: true,})
        }
    }
    const locationMarkers = locations.map(v => {
        const moveTo = v.moveTo === '' ? undefined : locations.find(loc=>loc.name===v.moveTo)
        const npcIn = npc.filter(n=>n.location === v.name)
        const shopIn = shops.filter(s=>npcIn.some(n=>n.name===s.npc))
        return MC.location(v, zoom, moveTo, onMoveToClickHandler,npcIn,shopIn)
    })
    const regionMarkers = regions.map(v => MC.region(v, zoom, locations, gatherPoints, events, loots, resources, activeRegion))
    const activeRegionMarker = MC.region(regions.find(v => v.name===activeRegion)!, zoom, locations, gatherPoints, events, loots, resources, activeRegion)
    const gatherMarkers = gatherPoints.map(gp => {
        const gatherDifficult = loots.find(loot => loot.name === gp.loot)?.loot.reduce((p, c) => {
            const dif = resources.find(res => res.name === c.name)?.gatherDifficulty
            if (!!dif) return dif > p ? dif : p
            else return p
        }, 0)
        return MC.gatherPoint(gp, zoom, gatherDifficult || 0, activeRegion, activeResource || '')
    })
    const eventMarkers = events.map(v => MC.events(v, zoom, activeRegion))
    const staminaElixirMarkers = stamina.map((v, i) => MC.staminaElixir({
        ...v,
        name: `${v.name} №${i + 1}`
    }, zoom))
    const questMarkers = quests.map((v, i) => MC.quest(v, zoom, locations, npc))
    const questItemMarkers = questsItemsSource.map(v => {
        let pos: TMapPosition = {x: 0, y: 0}
        const icon = questsItems.find(qi => qi.name === v.name)?.icon || 'Unknown/Unknown'
        switch (v.posQuestItem.type) {
            case "pos":
                const posMap = v.posQuestItem.position as TMapPosition
                pos = {...posMap}
                break
            case "location":
                const posLoc = v.posQuestItem.position as TLocation
                pos = posLoc.pos
                break
            case "monster":
                const posMon = v.posQuestItem.position as TMonster
                pos = regions.find(v => v.name === posMon.region)?.pos || {x: 0, y: 0}
                break
            default:
                console.error(`error in questItemMarkers:type ${v.posQuestItem.type}`)
        }
        return MC.questItem(v, zoom, pos, icon)
    })


    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                const curMarkerPos = marker?.getLatLng()
                if (marker != null && curMarkerPos !== undefined) {
                    dispatch(MapSlice.actions.setMarkerForAddPos({
                        x: Number(curMarkerPos.lat.toFixed(3)) || 0,//-0.045
                        y: Number(curMarkerPos.lng.toFixed(3)) || 0
                    }))
                    setCustomMarkerPos(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const onAddMarkerHandler = () => {
        setIsCusMarkerActive(true)
        setCustomMarkerPos(map === null ? {lat: 0, lng: -40} : map.getCenter())
        console.log(isCusMarkerActive)
    }

    const onClose = () => {
        setIsCusMarkerActive(false)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
        onResetActiveMarkers()
    }
    const onResetActiveMarkers = () => {
        dispatch(MapSlice.actions.setActiveQuest(undefined))
        dispatch(MapSlice.actions.setIsActiveQuestMap(false))

        dispatch(MapSlice.actions.setActiveRegion(undefined))
        dispatch(MapSlice.actions.setIsActiveRegion(false))

        dispatch(MapSlice.actions.setActiveResource(undefined))
        dispatch(MapSlice.actions.setIsActiveResource(false))
    }
    useEffect(() => {
        if (isAddMarkerActive && map) map.addEventListener("click", addMarkerPosOnClick);
        return () => {
            if(!!map && map.hasEventListeners('click'))map.clearAllEventListeners()
            // map?.removeEventListener("click", addMarkerPosOnClick)
            // console.log('endmap')

        }
    }, [map])
    const addMarkerPosOnClick: Leaf.LeafletMouseEventHandlerFn = (e) => {
        if (!isBoundsMenu) {
            // console.log(`click ${e.latlng.lat}`)
            markerRef.current?.setLatLng({lat: e.latlng.lat, lng: e.latlng.lng})
            // const mPos = markerRef.current?.getLatLng();
            dispatch(MapSlice.actions.setMarkerForAddPos({
                x: Number(e.latlng.lat.toFixed(3)) || 0, //-0.045
                y: Number(e.latlng.lng.toFixed(3)) || 0
            }))
            e.originalEvent.stopPropagation()
            // setCustomMarkerPos({lat: e.latlng.lat, lng: e.latlng.lng})
        }
    }
    // console.log(isAddMarkerActive)
    useEffect(() => {
        setIsCusMarkerActive(isAddMarkerActive)
        if (isAddMarkerActive && map) map.addEventListener("click", addMarkerPosOnClick);
        return () => {
            map?.removeEventListener("click", addMarkerPosOnClick)
        }
    }, [isAddMarkerActive])
    return (//`${props.wid === -1 ? '50%' : props.wid + 'px'}`
        <div className={styles.map} style={{width: `${wid===-1?'50%':'100%'}`}}>
            {/*Map*/}
            {/*<button type={'button'} onClick={onAddMarkerHandler}>AddMarker</button>*/}
            {/*x*/}
            {/*<button type={'button'} onClick={onClose}>close</button>*/}
            {/*x*/}
            {/*{activeQuest}*/}
            <div id="map" style={{
                height: `${props.hei === -1 ? '100%' : props.hei + 'px'}`,
                overflow: "hidden",
                padding: '0,50px,50px,0'
            }}>
                <MapContainer attributionControl={false} className={styles.map} center={center} zoom={wid===-1?8:7}
                              scrollWheelZoom={false} ref={setMap} markerZoomAnimation={false}>
                    <MyComponent onZoomChange={onZoomChange} visible={false}/>
                    <TileLayer minZoom={5} maxZoom={8} noWrap={true}
                               attribution='&copy; <a href="https://asd.con">Vir</a> (c))'
                               url={'http://127.0.0.1:3333/api/map/{x}/{y}/{z}'}
                    />

                    {MC.getTowns(zoom)}
                    <LayerWithFilter filter={layerFilter} onResetActiveQuest={onResetActiveMarkers}
                                     locationMarkers={locationMarkers}
                                     eventMarkers={eventMarkers}
                                     gatherMarkers={gatherMarkers}
                                     staminaMarkers={staminaElixirMarkers}
                                     questItemMarkers={questItemMarkers}
                                     regionMarkers={regionMarkers}
                                     global={global||false}
                    />
                    {activeRegion !== undefined && activeRegionMarker}
                    {isCusMarkerActive && MC.addDataMarker(customMarkerPos.lng === 0 && customMarkerPos.lat === 0
                            ? map?.getCenter() || customMarkerPos
                            : customMarkerPos,
                        markerRef,
                        eventHandlers)}
                    {!!activeQuest && activeQuest.length > 0 && quests.filter((fv, i) => fv.name === activeQuest).map(v => MC.quest(v, zoom, locations, npc))}
                    {isBoundsMenu && <AddBounds/>}
                    {!!activeQuest && 'asd'}
                    {mapSearchPos !== undefined && mapSearchPos.from !== 'region' && <CircleMarker center={center} pathOptions={{color: 'red', fillOpacity:0}} radius={20}/>}
                </MapContainer>
            </div>
        </div>
    );
})