import React from "react";
import {Route, Routes} from "react-router-dom";
import styles from './ContentSpace.module.css'
import {MaterialContent} from "./Contents/MaterialContent";
import {ComponentContent} from "./Contents/ComponentContent";
import {MyMap} from "../Map/MyMap";
import {NpcContent} from "./Contents/NpcContent";
import {LocationContent} from "./Contents/LocationContent";
import {RegionContent} from "./Contents/RegionContent";
import {GatherPointContent} from "./Contents/GatherPointContent";
import {LootContent} from "./Contents/LootContent";
import {StaminaElixirContent} from "./Contents/StaminaElixirContent";
import {EventContent} from "./Contents/EventContent";
import {MapObjectContent} from "./Contents/MapObjectContent";
import {QuestContent} from "./Contents/QuestContent";
import {AbilityContent} from "./Contents/AbilityContent";
import {MonsterContent} from "./Contents/MonsterContent";
import {RecipeContent} from "./Contents/RecipeContent";
import {CompanionContent} from "./Contents/CompanionContent";
import {QuestItemContent} from "./Contents/QiestItemContent";
import {QuestItemSourceContent} from "./Contents/QiestItemSourceContent";
import {ShopContent} from "./Contents/ShopContent";
import {BookContent} from "./CustomContents/BookContent";
import {TrainerContent} from "./Contents/TrainerContent";
import {ReputationContent} from "./CustomContents/ReputationContent";


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
                <Route path={'/map'} element={<MyMap wid={800} hei={600} global={true}/>}/>
                <Route path={'/material/'} element={<MaterialContent/>}/>
                <Route path={'/material/bone'} element={<MaterialContent type={'Bone'}/>}/>
                <Route path={'/material/fiber'} element={<MaterialContent type={'Fiber'}/>}/>
                <Route path={'/material/leather'} element={<MaterialContent type={'Leather'}/>}/>
                <Route path={'/material/metal'} element={<MaterialContent type={'Metal'}/>}/>
                <Route path={'/material/stone'} element={<MaterialContent type={'Stone'}/>}/>
                <Route path={'/material/wood'} element={<MaterialContent type={'Wood'}/>}/>

                <Route path={'/component/'} element={<ComponentContent/>}/>
                <Route path={'/component/Plant'} element={<ComponentContent type={'Plant'}/>}/>
                <Route path={'/component/Gem'} element={<ComponentContent type={'Gem'}/>}/>
                <Route path={'/component/Substance'} element={<ComponentContent type={'Substance'}/>}/>
                <Route path={'/component/Powder'} element={<ComponentContent type={'Powder'}/>}/>
                <Route path={'/component/Sap'} element={<ComponentContent type={'Sap'}/>}/>
                <Route path={'/component/Pollen'} element={<ComponentContent type={'Pollen'}/>}/>
                <Route path={'/component/Artefact'} element={<ComponentContent type={'Artefact'}/>}/>

                    {/*<Route path={'/component/add'} element={<AddComponent selectFields={componentSelectFields}/>}/>*/}
                <Route path={'/books/'} element={<BookContent/>}/>
                <Route path={'/reputation/'} element={<ReputationContent/>}/>
                <Route path={'/trainer/'} element={<TrainerContent/>}/>

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