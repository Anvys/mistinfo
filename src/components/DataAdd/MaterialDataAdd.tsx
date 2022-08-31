import React from 'react';
import {useFormik} from "formik";
import {TMaterial, TMaterialType, TWOid} from "../../Types/ResourceTypes";
import {useDispatch} from "react-redux";
import {TAppDispatch} from "../../redux/store";
import {AddDataForm} from "./AddDataForm";
import {MaterialThunks} from "../../redux/reducers/materialReducer";
// import styles from './NpcDataAdd.module.css';

const DATA_NAME = 'material';
type TProps = {
    data: TMaterial | null
    resetAddFormData: () => void
};
export const MaterialDataAdd: React.FC<TProps> = (props) => {
    const {data} = props
    const dispatch = useDispatch<TAppDispatch>();

    const initVal = data !== null
        ? data
        : {
            name: '',
            type: 'Bone' as TMaterialType,
            durability: 0,
            craftDifficulty: 0,
            gatherDifficulty: 0,
            tier: 0,
            attributes: {
                Absorbity: 0,
                Density: 0,
                Flexibility: 0,
                Hardness: 0,
                Lightness: 0,
                Purity: 0,
                Radiance: 0,
                Rigidity: 0,
            },
            goldCost: 0,
            encumbrance: 0,
            translate: {En: '', Fr: '', Ru: ''},
        } as TWOid<TMaterial>
    const formik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            values.name = values.translate.En;
            console.log(values)
            dispatch(MaterialThunks.addOne(values))
            actions.setSubmitting(false);
        }
    })
    return (
        <div>
            {data === null ? 'New Region' : `Update ${data.name}/${data._id}`}
            <AddDataForm formik={formik} dataName={DATA_NAME} resetAddFormData={props.resetAddFormData}/>
        </div>
    );
}