import React from 'react';
import {useFormik} from "formik";
import {TComponent, TComponentType, TWOid} from "../../Types/ResourceTypes";
import {useDispatch} from "react-redux";
import {TAppDispatch} from "../../redux/store";
import {AddDataForm} from "./AddDataForm";
import {ComponentThunks} from "../../redux/reducers/componentReducer";
// import styles from './NpcDataAdd.module.css';

const DATA_NAME = 'component';
type TProps = {
    data: TComponent | null
    resetAddFormData: () => void
};
export const ComponentDataAdd: React.FC<TProps> = (props) => {
    const {data} = props
    const dispatch = useDispatch<TAppDispatch>();
    const initVal = data !== null ? data : {
        name: '',
        type: 'Plant' as TComponentType,
        durability: 0,
        craftDifficulty: 0,
        gatherDifficulty: 0,
        tier: 0,
        attributes: {
            Activator: 0,
            Binder: 0,
            Deteriorator: 0,
            Energizer: 0,
            Focuser: 0,
            Fortifier: 0,
            Putrefier: 0,
            Stimulator: 0,
            Toner: 0,
            Tranquilizer: 0,
            Elioam: 0,
            Frimam: 0,
            Hydram: 0,
            Lectram: 0,
            Lithram: 0,
            Magnam: 0,
            Psycham: 0,
            Pyram: 0,
            Stratam: 0,
        },
        goldCost: 0,
        encumbrance: 0,
        translate: {En: '', Fr: '', Ru: ''},
    } as TWOid<TComponent>
    const formik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            values.name = values.translate.En;
            console.log(values)
            if (data === null) dispatch(ComponentThunks.addOne(values))
            else dispatch(ComponentThunks.updateOne({id: data._id, data: {...values, _id: data._id}}))
            props.resetAddFormData();
            actions.setSubmitting(false);
        }
    })
    return (
        <div>
            {data === null ? 'New Component' : `Update ${data.name}/${data._id}`}
            <AddDataForm formik={formik} dataName={DATA_NAME} resetAddFormData={props.resetAddFormData}/>
        </div>
    );
}

