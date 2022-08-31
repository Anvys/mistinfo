import React from "react";
import {Route, Routes} from "react-router-dom";
import styles from './ContentSpace.module.css'
import {MaterialContent} from "./MaterialContent/MaterialContent";
import {ComponentContent} from "./ComponentContent/ComponentContent";
import {MyMap} from "../Map/MyMap";
import {NpcContent} from "./NpcContent/NpcContent";
import {LocationContent} from "./LocationContent/LocationContent";
import {RegionContent} from "./RegionContent/RegionContent";
import {GatherPointContent} from "./GatherPointContent/GatherPointContent";


export const ContentSpace: React.FC = () => {
    const materialSelectFields: Array<{ [key: string]: Array<string> }> = [
        {type: ['Bone', 'Fiber', 'Leather', 'Metal', 'Stone', 'Wood']},
        {tier: ['0', '1', '2', '3', '4', '5']}
    ]
    const componentSelectFields: Array<{ [key: string]: Array<string> }> = [
        {type: ['Plant', 'Gem', 'Substance', 'Powder', 'Sap', 'Pollen', 'Artefact']},
        {tier: ['0', '1', '2', '3', '4', '5']}
    ]
    return (
        <div className={styles.contentBox}>
            <Routes>
                <Route path={'/map'} element={<MyMap wid={600} hei={600}/>}/>
                <Route path={'/material/'} element={<MaterialContent/>}>
                    {/*<Route path={'/material/add'} element={<AddMaterial selectFields={materialSelectFields}/>}/>*/}
                </Route>
                <Route path={'/component/'} element={<ComponentContent/>}>

                    {/*<Route path={'/component/add'} element={<AddComponent selectFields={componentSelectFields}/>}/>*/}
                </Route>
                <Route path={'/npc/'} element={<NpcContent/>}/>
                <Route path={'/location/'} element={<LocationContent/>}/>
                <Route path={'/region/'} element={<RegionContent/>}/>
                <Route path={'/gatherpoint/'} element={<GatherPointContent/>}/>
            </Routes>

        </div>
    )
}