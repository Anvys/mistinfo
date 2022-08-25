import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMaterialsSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {DataView} from "../../DataView/DataView";

type TProps = {};
export const MaterialView: React.FC<TProps> = (props) => {

    const dispatch = useDispatch<TAppDispatch>()
    const materials = useSelector(getMaterialsSelector);
    if (!materials.length) return <>empty</>
    const onRefreshHandler = () => {
        dispatch(ResourcesThunks.getMaterials());
    }
    return (<DataView data={materials}/>);
}
