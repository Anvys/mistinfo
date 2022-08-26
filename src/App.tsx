import React from 'react';
import styles from './App.module.css'
import {WorkSpace} from "./components/WorkSpace/WorkSpace";
import {MaterialThunks} from "./redux/reducers/materialReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getIsComponentsInitSelector,
    getIsLocationInitSelector,
    getIsMaterialsInitSelector,
    getIsNpcInitSelector,
    getIsRegionInitSelector
} from "./redux/dataSelectors";
import {TAppDispatch} from "./redux/store";
import {ComponentThunks} from "./redux/reducers/componentReducer";
import {LocationThunks} from "./redux/reducers/locationReducer";
import {RegionThunks} from "./redux/reducers/regionReducer";
import {NpcThunks} from "./redux/reducers/npcReducer";

function App() {
    const dispatch = useDispatch<TAppDispatch>();
    if(!useSelector(getIsMaterialsInitSelector))dispatch(MaterialThunks.getAll())
    if(!useSelector(getIsComponentsInitSelector))dispatch(ComponentThunks.getAll())
    if(!useSelector(getIsLocationInitSelector))dispatch(LocationThunks.getAll())
    if(!useSelector(getIsRegionInitSelector))dispatch(RegionThunks.getAll())
    if(!useSelector(getIsNpcInitSelector))dispatch(NpcThunks.getAll())

    return (
        <div className={styles.App}>
            <header className="App-header">
                Mist in Forest
            </header>
            <WorkSpace/>
        </div>
    );
}

export default App;
