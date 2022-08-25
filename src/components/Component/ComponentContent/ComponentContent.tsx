import React from 'react';
import styles from './ComponentContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getComponentsSelector, getIsComponentsInitSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {ComponentContentHeader} from "../ComponentContentHeader/ComponentContentHeader";
import {Outlet} from "react-router-dom";
import {ComponentThunks} from "../../../redux/reducers/componentReducer";
import {DataView} from "../../DataView/DataView";

type TProps = {};
export const ComponentContent:React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsComponentsInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if(!isInit)dispatch(ComponentThunks.getAll())
    const components = useSelector(getComponentsSelector);
    if (!components.length) return <>empty</>

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
                {/*<ComponentView/>*/}
                <DataView data={components}/>
            </div>
        </div>
    );
}