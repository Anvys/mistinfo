import React, {useEffect} from 'react';
import styles from './App.module.css'
import {WorkSpace} from "./components/WorkSpace/WorkSpace";
import {MaterialThunks} from "./redux/reducers/materialReducer";
import {useDispatch, useSelector} from "react-redux";
import {TAppDispatch} from "./redux/store";
import {ComponentThunks} from "./redux/reducers/componentReducer";
import {LocationThunks} from "./redux/reducers/locationReducer";
import {RegionThunks} from "./redux/reducers/regionReducer";
import {NpcThunks} from "./redux/reducers/npcReducer";
import {GatherPointThunks} from "./redux/reducers/gatherPointReducer";
import {LootThunks} from "./redux/reducers/lootReducer";
import {StaminaElixirThunks} from "./redux/reducers/staminaElixirReducer";
import {EventThunks} from "./redux/reducers/eventReducer";
import {QuestThunks} from "./redux/reducers/questReducer";
import {AuthApi} from "./API/AuthAPI";
import {AuthSelectors} from "./redux/dataSelectors";
import {AuthSlice, AuthThunks} from "./redux/reducers/authReducer";
import {Login} from "./components/Auth/Login";
import {AbilityThunks} from "./redux/reducers/abilityReducer";
import {RecipeThunks} from "./redux/reducers/recipeReducer";
import {CompanionThunks} from "./redux/reducers/companionReducer";
import {MonsterThunks} from "./redux/reducers/monsterReducer";
import {QuestItemThunks} from "./redux/reducers/questItemReducer";
import {QuestItemSourceThunks} from "./redux/reducers/questItemSourceReducer";
import {ShopThunks} from "./redux/reducers/shopReducer";

function App() {
    const dispatch = useDispatch<TAppDispatch>();
    const user = useSelector(AuthSelectors.getUserData)
    const isAuth = useSelector(AuthSelectors.isInit)
    useEffect(() => {
        dispatch(MaterialThunks.getAll())
        dispatch(ComponentThunks.getAll())
        dispatch(LocationThunks.getAll())
        dispatch(RegionThunks.getAll())
        dispatch(NpcThunks.getAll())
        dispatch(GatherPointThunks.getAll())
        dispatch(LootThunks.getAll())
        dispatch(StaminaElixirThunks.getAll())
        dispatch(EventThunks.getAll())
        dispatch(QuestThunks.getAll())
        dispatch(AbilityThunks.getAll())
        dispatch(RecipeThunks.getAll())
        dispatch(CompanionThunks.getAll())
        dispatch(MonsterThunks.getAll())
        dispatch(QuestItemThunks.getAll())
        dispatch(QuestItemSourceThunks.getAll())
        dispatch(ShopThunks.getAll())
        if(user.login === undefined || user.token === undefined) {
            console.log('Not authorized yo')
            // dispatch(AuthThunks.login({login: 'admi', password: '1234'}))
        }
        else {
            console.log('Authorized')
            dispatch(AuthThunks.me(user.token))
        }
    }, [])
    useEffect(()=>{
        console.log(`authchanged ${isAuth} / ${user.login}`)
    },[isAuth])
    // if(!useSelector(getIsMaterialsInitSelector))dispatch(MaterialThunks.getAll())
    // if(!useSelector(getIsComponentsInitSelector))dispatch(ComponentThunks.getAll())
    // if(!useSelector(getIsLocationInitSelector))dispatch(LocationThunks.getAll())
    // if(!useSelector(getIsRegionInitSelector))dispatch(RegionThunks.getAll())
    // if(!useSelector(getIsNpcInitSelector))dispatch(NpcThunks.getAll())
    // if(!useSelector(getIsInitGatherPointSelector))dispatch(GatherPointThunks.getAll())

    return (
        <div className={styles.App}>
            <header className="App-header">
                Mist in Forest {isAuth ? 'DEV' : 'USER'}
                {/*<div style={{width: '100px'}}><button style={{width: '50px'}} type={'button'} onClick={()=>{*/}
                {/*    if(user.token === undefined) console.log('token undefined')*/}
                {/*    else dispatch(AuthThunks.me(user.token))}*/}
                {/*}> 1 </button></div>*/}
                {/*<div style={{width: '100px'}}><button style={{width: '50px'}} type={'button'} onClick={()=>{*/}
                {/*    if(user.token === undefined) console.log('token undefined')*/}
                {/*    else dispatch(AuthSlice.actions.logout())}*/}
                {/*}> logout </button></div>*/}
                <Login/>
            </header>
            <WorkSpace/>
        </div>
    );
}

export default App;
