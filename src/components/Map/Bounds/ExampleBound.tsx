import React, {useMemo, useState} from 'react';
import {Rectangle, useMap} from "react-leaflet";
import {LatLngBoundsExpression} from "leaflet";
// import styles from './ExampleBound.module.css';
const innerBounds: LatLngBoundsExpression = [
    [2, -50],
    [-2, -30],
]
const outerBounds: LatLngBoundsExpression = [
    [5, -45],
    [-5, -35],
]
const redColor = { color: 'red' }
const whiteColor = { color: 'white' }

type TProps = {};
export const ExampleBound:React.FC<TProps> = (props) => {
    const [bounds, setBounds] = useState(outerBounds)
    const map = useMap()

    const innerHandlers = useMemo(
        () => ({
            click() {
                setBounds(innerBounds)
                map.fitBounds(innerBounds)
            },
        }),
        [map],
    )
    const outerHandlers = useMemo(
        () => ({
            click() {
                setBounds(outerBounds)
                map.fitBounds(outerBounds)
            },
        }),
        [map],
    )

    return (
        <>
            <Rectangle
                bounds={outerBounds}
                eventHandlers={outerHandlers}
                pathOptions={bounds === outerBounds ? redColor : whiteColor}
            />
            <Rectangle
                bounds={innerBounds}
                eventHandlers={innerHandlers}
                pathOptions={bounds === innerBounds ? redColor : whiteColor}
            />
        </>
    )
}


