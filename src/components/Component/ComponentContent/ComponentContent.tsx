import React from 'react';
import styles from './ComponentContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsComponentsInitSelector, getIsMaterialsInitSelector} from "../../../redux/resourcesSelectors";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {TAppDispatch} from "../../../redux/store";
import {ComponentContentHeader} from "../ComponentContentHeader/ComponentContentHeader";
import {Outlet, Route, Routes} from "react-router-dom";
import {ComponentView} from "../ComponentView/ComponentView";
import {AddComponent} from "../AddComponent/AddComponent";

type TProps = {};
export const ComponentContent:React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsComponentsInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if(!isInit)dispatch(ResourcesThunks.getComponents())
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                <ComponentContentHeader/>
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
                {/*    <Route path={'/component/add'} element={<AddComponent/>}/>*/}
                {/*</Routes>*/}
                <ComponentView/>
            </div>
        </div>
    );
}