import Leaf from 'leaflet';
import React, {useEffect, useRef, useState} from 'react';
import styles from './Map.module.css';
import {MapContainer, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useSelector} from "react-redux";
import {
    ComponentSelectors,
    EventSelectors,
    GatherPointSelectors,
    LocationSelectors,
    LootSelectors,
    MapSelectors,
    MaterialSelectors,
    MonsterSelectors,
    QuestItemSelectors,
    QuestItemSourceSelectors,
    QuestSelectors,
    RegionSelectors,
    StaminaElixirSelectors
} from "../../redux/dataSelectors";
import {MC} from "./Markers/MarkerCreator";
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";
import {AddBounds} from "./Bounds/AddBounds";
import {LayerWithFilter} from "./Layer/LayerWithFilter";
import {TLocation, TMapPosition, TMonster} from "../../Types/CommonTypes";

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
                        {`center: x:${map.getCenter().lat.toFixed(2)} | y:${map.getCenter().lng.toFixed(2)}`}
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
};
export const MyMap: React.FC<TProps> = React.memo((props) => {
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


    const materials = useSelector(MaterialSelectors.getData);
    const components = useSelector(ComponentSelectors.getData);
    const resources = [...materials, ...components]
    const loots = useSelector(LootSelectors.getData);
    const locations = useSelector(LocationSelectors.getData);
    const regions = useSelector(RegionSelectors.getData);
    const monsters = useSelector(MonsterSelectors.getData);
    const gatherPoints = useSelector(GatherPointSelectors.getData);
    const events = useSelector(EventSelectors.getData)
    const stamina = useSelector(StaminaElixirSelectors.getData)
    const quests = useSelector(QuestSelectors.getData)
    const questsItems = useSelector(QuestItemSelectors.getData)
    const questsItemsSource = useSelector(QuestItemSourceSelectors.getData)
    const activeQuest = useSelector(MapSelectors.getActiveQuest)

    const dispatch = useAppDispatch()

    const onZoomChange = (z: number) => setZoom(z)


    const locationMarkers = locations.map(v => MC.location(v, zoom))
    const regionMarkers = regions.map(v => MC.region(v, zoom, locations, gatherPoints, events, loots, resources))
    const gatherMarkers = gatherPoints.map(gp => {
        const gatherDifficult = loots.find(loot => loot.name === gp.loot)?.loot.reduce((p, c) => {
            const dif = resources.find(res => res.name === c.name)?.gatherDifficulty
            if (!!dif) return dif > p ? dif : p
            else return p
        }, 0)
        return MC.gatherPoint(gp, zoom, gatherDifficult || 0)
    })
    const eventMarkers = events.map(v => MC.events(v, zoom))
    const staminaElixirMarkers = stamina.map((v, i) => MC.staminaElixir({
        ...v,
        name: `${v.name} №${i + 1}`
    }, zoom))
    const questMarkers = quests.map((v, i) => MC.quest(v, zoom, locations))
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

    const markerRef = useRef<L.Marker>(null)
    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
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
        onResetActiveQuest()
    }
    const onResetActiveQuest = () => {
        dispatch(MapSlice.actions.setActiveQuest(undefined))
        dispatch(MapSlice.actions.setIsActiveQuestMap(false))
    }
    useEffect(() => {
        if (isAddMarkerActive && map) map.addEventListener("click", addMarkerPosOnClick);
        return () => {
            map?.removeEventListener("click", addMarkerPosOnClick)
            console.log('endmap')

        }
    }, [map])
    const addMarkerPosOnClick: Leaf.LeafletMouseEventHandlerFn = (e) => {
        if (!isBoundsMenu) {
            // console.log(`click ${e.latlng.lat}`)
            markerRef.current?.setLatLng({lat: e.latlng.lat, lng: e.latlng.lng})
            // const mPos = markerRef.current?.getLatLng();
            dispatch(MapSlice.actions.setMarkerForAddPos({
                x: Number(e.latlng.lat.toFixed(2)) || 0,
                y: Number(e.latlng.lng.toFixed(2)) || 0
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
        <div className={styles.map} style={{width: '100%'}}>
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
                <MapContainer attributionControl={false} className={styles.map} center={[0, -45]} zoom={7}
                              scrollWheelZoom={false} ref={setMap} markerZoomAnimation={false}>
                    <MyComponent onZoomChange={onZoomChange} visible={false}/>
                    <TileLayer minZoom={5} maxZoom={8} noWrap={true}
                               attribution='&copy; <a href="https://asd.con">Vir</a> (c))'
                               url={'http://127.0.0.1:3333/api/map/{x}/{y}/{z}'}
                    />

                    {MC.getTowns(zoom)}
                    <LayerWithFilter filter={layerFilter} onResetActiveQuest={onResetActiveQuest}
                                     locationMarkers={locationMarkers}
                                     eventMarkers={eventMarkers}
                                     gatherMarkers={gatherMarkers}
                                     staminaMarkers={staminaElixirMarkers}
                                     questItemMarkers={questItemMarkers}
                                     regionMarkers={regionMarkers}
                    />
                    {isCusMarkerActive && MC.addDataMarker(customMarkerPos.lng === 0 && customMarkerPos.lat === 0
                            ? map?.getCenter() || customMarkerPos
                            : customMarkerPos,
                        markerRef,
                        eventHandlers)}
                    {!!activeQuest && activeQuest.length > 0 && quests.filter((fv, i) => fv.name === activeQuest).map(v => MC.quest(v, zoom, locations))}
                    {isBoundsMenu && <AddBounds/>}
                    {!!activeQuest && 'asd'}
                </MapContainer>
            </div>
        </div>
    );
})