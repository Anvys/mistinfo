import React from 'react';
import styles from './MaterialContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsMaterialsInitSelector, getMaterialsSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {MaterialContentHeader} from "../MaterialContentHeader/MaterialContentHeader";
import {Outlet} from "react-router-dom";
import {DataView} from "../../DataView/DataView";
import {MaterialThunks} from "../../../redux/reducers/materialReducer";

type TProps = {};
export const MaterialContent:React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsMaterialsInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if(!isInit)dispatch(MaterialThunks.getAll())
    const materials = useSelector(getMaterialsSelector);
    if (!materials.length) return <>empty</>
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
                {/*<MaterialView/>*/}
                <DataView data={materials}/>
            </div>
        </div>
    );
}