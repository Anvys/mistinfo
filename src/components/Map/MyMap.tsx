import Leaf, {Icon} from 'leaflet';
import React, {useEffect, useRef, useState} from 'react';
import styles from './Map.module.css';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {MarkerForDataAdd} from "./Markers/MarkerForDataAdd";
import {useSelector} from "react-redux";
import {getGatherPointSelector, getLocationSelector, getStaminaElixirSelector} from "../../redux/dataSelectors";
import {MC} from "./Markers/MarkerCreator";
import {ExampleBound} from "./Bounds/ExampleBound";

// import * as icons from '../../assets/icons'
const MyComponent: React.FC<{onZoomChange: (z:number)=>void}> = (props) => {
    const [coords, setCoords] = useState({lat: 0, lng: 0});
    const map = useMap()

    const mapEvents = useMapEvents({
        zoom: () => {
            setZoomLevel(mapEvents.getZoom());
            props.onZoomChange(mapEvents.getZoom())
        },
    });
    const [zoomLevel, setZoomLevel] = useState(mapEvents.getZoom()); // initial zoom level provided for MapContainer

    // console.log('map center:', map.getCenter())
    useEffect(() => {
        if (!map) return;

        map.addEventListener("mousemove", (e) => {
            setCoords({lat: e.latlng.lat, lng: e.latlng.lng});
        });
    }, [map]);
    useEffect(()=>props.onZoomChange(mapEvents.getZoom()),[])
    return (<div className={styles.coords}>
            {coords.lat && (
                <div>
                    <b>latitude</b>: {coords.lat?.toFixed(3)} <br/>
                    <b>longitude</b>: {coords.lng?.toFixed(3)}<br/>
                    {`center: x:${map.getCenter().lat.toFixed(2)} | y:${map.getCenter().lng.toFixed(2)}`}
                </div>
            )}
        </div>

    )
}

type TProps = {
    wid: number
    hei: number
};
export const MyMap: React.FC<TProps> = (props) => {
    const [customMarkerPos, setCustomMarkerPos] = useState({lat: 0, lng: -40})
    const [isCusMarkerActive, setIsCusMarkerActive] = useState(false)
    const [map, setMap] = useState<Leaf.Map | null>(null);
    const [zoom, setZoom] = useState(0)
    const onZoomChange = (z: number)=>setZoom(z)
    // console.log(`curZoom: ${zoom}`)
    // const markers = useSelector(getMarkersSelector).
    const locationMarkers = useSelector(getLocationSelector).map(v => MC.location(v, zoom))
    const gatjers = useSelector(getGatherPointSelector);
    const gatherMarkers = useSelector(getGatherPointSelector).map(v => MC.gatherPoint(v, zoom))
    const staminaElixirMarkers = useSelector(getStaminaElixirSelector).map((v,i) => MC.staminaElixir({...v, name: `${v.name} №${i+1}`}, zoom))
    // console.log(locationMarkers)
    // console.log(markers)
    // var map = L.map('map').setView([51.505, -0.09], 13);

    // const map = useMap();
    // const map = useMapEvents({})
    // const map = L.map('map');
    // function changeUbication(e) {
    //     let {lat, lng} = e.latlng;
    //     console.info("Lat:", lat);
    //     console.info("Lng: ",lng);
    //     setCoords(e.latlng);
    // }

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

    return (
        <div className={styles.map} style={{width: `${props.wid === -1 ? '50%' : props.wid + 'px'}`}}>
            Map
            <button onClick={onAddMarkerHandler}>AddMarker</button>
            <div id="map" style={{
                height: `${props.hei === -1 ? '100%' : props.hei + 'px'}`,
                overflow: "hidden",
                padding: '0,0,50px,0'
            }} className={styles.map}>
                <MapContainer className={styles.map} center={[0, -45]} zoom={6} scrollWheelZoom={false} ref={setMap}>
                    a
                    <MyComponent onZoomChange={onZoomChange}/>
                    b
                    <TileLayer
                        // tms={true}
                        // minNativeZoom={5}
                        // maxNativeZoom={8}
                        minZoom={5}
                        maxZoom={8}


                        noWrap={true}
                        // tileSize={512}
                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        attribution='&copy; <a href="https://asd.con">Vir</a> (c))'
                        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        // url={mapimg}
                        // url='https://miro.medium.com/max/1400/0*FPRXzSDmPMQ158jJ'
                        // url={'World/World_0{x}_0{y}.png'}
                        url={'http://127.0.0.1:3333/api/map/{x}/{y}/{z}'}
                        // bounds={new LatLngBounds(new LatLng(100, 0),
                        //     new LatLng(0, 100))}

                    />
                    {/*<ImageOverlay*/}
                    {/*    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                    {/*    attribution='&copy; <a href="https://asd.con">Vir</a> (c))'*/}
                    {/*    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                    {/*    // url={mapimg}*/}
                    {/*    // url='https://miro.medium.com/max/1400/0*FPRXzSDmPMQ158jJ'*/}
                    {/*    url={'./World/World_{x}_{y}.png'} */}
                    {/*    bounds={new LatLngBounds(new LatLng(100, 0),*/}
                    {/*        new LatLng(0, 100))}/>*/}
                    <Marker icon={new Icon({
                        iconUrl: require('./../../assets/icons/testicon.png'),
                        iconSize: [50, 50],
                        popupAnchor: [0, -25],
                    })} position={[0, -45]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                    {locationMarkers.length && locationMarkers}
                    {gatherMarkers.length && gatherMarkers}
                    {staminaElixirMarkers.length && staminaElixirMarkers}
                    {isCusMarkerActive &&
                        <MarkerForDataAdd markerRef={markerRef} eventHandlers={eventHandlers} pos={customMarkerPos}/>}
                    <ExampleBound/>
                </MapContainer>
            </div>
        </div>
    );
}