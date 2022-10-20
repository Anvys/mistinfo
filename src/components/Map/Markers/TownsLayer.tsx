import {ImageOverlay} from "react-leaflet";
import React from "react";

export const TownsLayer = (zoom: number) => {
    const t = new Image()
    t.src = require('./../../../assets/icons/mapobject/CityKortombourgNew.png')
    // console.log(`${t.width} : ${t.height}`)
    const coef = getResizeForTowns(zoom)
    // console.log(`coef ${coef}`)
    let size = [1875 / coef, 1602 / coef]
    let size1 = size[0]
    let size2 = size[1]
    const dopCoef = 1000
    const dopCoefX = 0.15
    const dopCoefY = 0.15
    const towns = [
        <ImageOverlay
            url={require('./../../../assets/icons/mapobject/CityKortombourgNew.png')}
            bounds={[[-0.18 - size1 / dopCoef + dopCoefX, -45.68 - size2 / dopCoef + dopCoefY], [-0.18 + size2 / dopCoef + dopCoefX, -45.68 + size2 / dopCoef + dopCoefY]]}
        />,

    ]
    return towns
}

const getResizeForTowns = (zoom: number): number => {
    switch (zoom) {
        case 5:
            return 25
        case 6:
            return 12
        case 7:
            return 6
        case 8:
            return 3
        default:
            return 1
    }
}