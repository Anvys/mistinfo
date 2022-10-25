import {ImageOverlay} from "react-leaflet";
import React from "react";

export const TownsLayer = (zoom: number) => {
    // const korto = new Image()
    // const quara = new Image()
    // korto.src = require('./../../../assets/icons/mapobject/CityKortombourgNew.png')
    // quara.src = require('./../../../assets/icons/mapobject/CityQuara.png')
    // console.log(`${t.width} : ${t.height}`)
    const korto= [1875, 1602] as const
    const quara = [1360, 773] as const
    const coef = getResizeForTowns(zoom)
    // // console.log(`coef ${coef}`)
    // let size = [1875 / coef, 1602 / coef]
    // let size1 = size[0]
    // let size2 = size[1]
    // const dopCoef = 2500
    // const dopCoefX = 0.15
    // const dopCoefY = 0.15
    const towns = [
        <ImageOverlay
            url={require('./../../../assets/icons/mapobject/CityKortombourgNew.png')}
            bounds={getBounds(-45.64,-0.03,  ...korto, coef)}
        />,
        <ImageOverlay
            url={require('./../../../assets/icons/mapobject/CityQuara.png')}
            bounds={getBounds(-64.64,3.298,  ...quara, coef)}
        />,
        // <ImageOverlay
        //     url={require('./../../../assets/icons/mapobject/CityQuara.png')}
        //     bounds={getBounds(-0.03, -42.64, quara.width || 0, quara.height || 0, coef)}
        // />,

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
const getBounds = (y: number, x: number, w: number, h: number, coef: number, dopCoef = 1300): [number, number][] => {
    console.log(w, h, w / h / 10)
    let size = [w / coef, h / coef]
    let size1 = size[1]
    let size2 = size[0]
    // const dopCoef = 1300
    const dopCoefX = 0.15
    const dopCoefY = 0.15
    const resizeC = w / h - 1
    return [[x - size1 / dopCoef, y - (size2 / dopCoef) * (1 + resizeC/2)], [x + (size2 / dopCoef), y + (size2 / dopCoef) * (1 + resizeC/2)]]
}