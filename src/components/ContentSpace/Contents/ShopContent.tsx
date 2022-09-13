import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {ShopSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TShop, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {ShopThunks} from "../../../redux/reducers/shopReducer";

type TProps = {};

export const ShopContent: React.FC<TProps> = (props) => {
    const selector = ShopSelectors
    const thunks = ShopThunks
    const str = 'shop'
    const isInit = useSelector(selector.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(thunks.getAll())
    const data = useSelector(selector.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TShop)
    const dataEditHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd({...temp} as TShop)
    }
    const dataDelHandler = (id: string) => {
        dispatch(thunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `Shop_${data.length}`

    const initObj: TWOid<TShop> = dataToAdd === null? {
        name: newDefName,
        npc: '',
        content:[],
        icon: 'other_Other/Quest-Package_for_Leonidas',
        translate: {En: newDefName, Ru: '', Fr: ''},
        notes: [],
    } : {...dataToAdd}
    // {
    //     type: 'Empty',
    //         count: 1,
    //     item: undefined,
    //     price: 0,
    //     reputationRequire: null
    // }
    // console.log(initObj)
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: thunks,
                    dataName: str
                })}

            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataEditHandler={dataEditHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}