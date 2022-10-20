import {TStaminaElixir} from "../../../Types/MainEntities";
import {Marker, Tooltip} from "react-leaflet";
import {Icon} from "leaflet";
import React from "react";
import {iconPicker} from "./MarkerCreator";

export const StaminaElixirMarker = (loc: TStaminaElixir, zoom: number) => {
    return (
        <Marker
            draggable={false}
            // eventHandlers={eventHandlers}
            // ref={markerRef}
            icon={new Icon({
                // iconAnchor: [25*(zoom-4)*0.5,60*(zoom-4)*0.5],
                // iconUrl: require(`./../../../assets/icons/${loc.icon}.png`),
                iconUrl: iconPicker(loc.icon),
                iconSize: [30 * (zoom - 4) * 0.5, 30 * (zoom - 4) * 0.5],
                tooltipAnchor: [10 * (zoom - 4) * 0.5, 0],
            })}
            position={{lat: loc.pos.x, lng: loc.pos.y}}>
            {/*<Popup>*/}
            {/*    <p>{loc.name}</p>*/}
            {/*    {loc.exploreReq > 0 && <p>explore: {loc.exploreReq}</p>}*/}
            {/*</Popup>*/}
            <Tooltip>
                {loc.name}
            </Tooltip>

        </Marker>
    )
}