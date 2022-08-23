import L, {Icon, LatLng, LatLngBounds} from 'leaflet';
import React, {MouseEventHandler, useEffect, useState} from 'react';
import styles from './Map.module.css';
import {ImageOverlay, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import mapimg from '../../assets/img/map/001.jpg'
import icon1 from '../../assets/icons/testicon.png'
// import * as icons from '../../assets/icons'
function MyComponent() {
    const [coords, setCoords] = useState({lat:0, lng:0});
    const map = useMap()
    console.log('map center:', map.getCenter())
    useEffect(() => {
        if (!map) return;

        map.addEventListener("mousemove", (e) => {
            setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        });
    }, [map]);
    return (<div className={styles.coords}>
            {coords.lat && (
        <div>
            <b>latitude</b>: {coords.lat?.toFixed(4)} <br />
            <b>longitude</b>: {coords.lng?.toFixed(4)}
        </div>
    )}
    </div>

    )
}
type TProps = {};
export const Map: React.FC<TProps> = (props) => {
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

    return (
        <div className={styles.map}>
            Map

            <div id="map"  style={{height: '600px', padding:'0,0,50px,0'}} className={styles.map}>
            <MapContainer   className={styles.map} center={[0, -45]} zoom={6} scrollWheelZoom={false} >
                a
                <MyComponent/>
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
                    <Popup >
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            </div>
        </div>
    );
}