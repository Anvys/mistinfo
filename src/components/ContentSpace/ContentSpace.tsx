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
import {LootContent} from "./LootContent/LootContent";
import {StaminaElixirContent} from "./StaminaElixirContent/StaminaElixirContent";
import {EventContent} from "./EventContent/EventContent";
import {MapObjectContent} from "./MapObjectContent/MapObjectContent";
import {QuestContent} from "./QuestContent/QuestContent";
import {AbilityContent} from "./Contents/AbilityContent";
import {MonsterContent} from "./Contents/MonsterContent";
import {RecipeContent} from "./Contents/RecipeContent";
import {CompanionContent} from "./Contents/CompanionContent";
import {QuestItemContent} from "./Contents/QiestItemContent";
import {QuestItemSourceContent} from "./Contents/QiestItemSourceContent";
import {ShopContent} from "./Contents/ShopContent";


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
                <Route path={'/map'} element={<MyMap wid={800} hei={600}/>}/>
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
                <Route path={'/loot/'} element={<LootContent/>}/>
                <Route path={'/staminaelixir/'} element={<StaminaElixirContent/>}/>
                <Route path={'/event/'} element={<EventContent/>}/>
                <Route path={'/mapobject/'} element={<MapObjectContent/>}/>
                <Route path={'/quest/'} element={<QuestContent/>}/>
                <Route path={'/ability/'} element={<AbilityContent/>}/>
                <Route path={'/monster/'} element={<MonsterContent/>}/>
                <Route path={'/recipe/'} element={<RecipeContent/>}/>
                <Route path={'/companion/'} element={<CompanionContent/>}/>
                <Route path={'/questitem/'} element={<QuestItemContent/>}/>
                <Route path={'/questitemsource/'} element={<QuestItemSourceContent/>}/>
                <Route path={'/shop/'} element={<ShopContent/>}/>
            </Routes>

        </div>
    )
}