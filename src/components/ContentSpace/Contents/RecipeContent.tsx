import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RecipeSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {RecipeThunks} from "../../../redux/reducers/recipeReducer";
import {TRecipe} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const RecipeContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(RecipeSelectors.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(RecipeThunks.getAll())
    const data = useSelector(RecipeSelectors.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TRecipe)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(RecipeThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TRecipe> = {
        resultType: 'Helmet',
        parts: [],
        icon: '',
        ...initCommonFields
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: RecipeThunks,
                    dataName: 'recipe'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}