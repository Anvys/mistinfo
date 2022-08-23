import React from 'react';
import styles from './MaterialContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsMaterialsInitSelector} from "../../../redux/resourcesSelectors";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {TAppDispatch} from "../../../redux/store";
import {MaterialContentHeader} from "../MaterialContentHeader/MaterialContentHeader";
import {Outlet, Route, Routes} from "react-router-dom";
import {MaterialView} from "../MaterialView/MaterialView";
import {AddMaterial} from "../AddMaterial/AddMaterial";

type TProps = {};
export const MaterialContent:React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsMaterialsInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if(!isInit)dispatch(ResourcesThunks.getMaterials())
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                <MaterialContentHeader/>
                {/*<Routes>*/}
                {/*    <Route path={'/material/view'} element={<div>Material</div>}>*/}
                {/*    </Route>*/}
                {/*    <Route path={'/component'} element={<div>Component</div>}/>*/}
                {/*</Routes>*/}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                {/*<Routes>*/}
                {/*    /!*<Route path={'/material/view'} element={<ComponentView/>}/>*!/*/}
                {/*    */}
                {/*</Routes>*/}
                <MaterialView/>
            </div>
        </div>
    );
}