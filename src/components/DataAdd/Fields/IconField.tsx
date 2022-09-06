import {FormikProps} from "formik";
import React, {useState} from "react";
import styles1 from "../DataAdd.module.css";
import styles from './Fields.module.css';
import {IconPicker, iconUrlPicker} from "../../IconPicker/IconPicker";

type IconFieldProps = {
    // pos: { x: number, y: number },
    // onChange: React.ChangeEventHandler<HTMLInputElement>,
    index: number,
    formik: FormikProps<any>
    disabled: boolean
}
export const IconField: React.FC<IconFieldProps> = ({index, formik, disabled}) => {
    const [isPickIcon, setIsPickIcon] = useState(false)
    const dataIconUrl = formik.values.icon.length>0
        ? iconUrlPicker(formik.values.icon.split('/')[0],formik.values.icon.split('/')[1])
        : ''
    const [iconURL, setIconURL] = useState(()=>dataIconUrl)
    const onAddIcon = () => {
        setIsPickIcon(true)
    }
    const onIconPickHandler = (path: string, url: string) => {
        formik.setFieldValue('icon', path)
        setIsPickIcon(false)
        setIconURL(url)
    }
    const onClose = () => {
        setIsPickIcon(false)
    }

    return (
        <div className={styles.fieldBoxCol} key={index}>
            <div className={styles.fieldBoxIcon}>
                <label className={styles.iconLabel} htmlFor={'icon'}>icon:</label>
                <input disabled={disabled} className={styles.iconInput} type={'text'} id={'icon'} name={'icon'}
                    // disabled={true}
                       onChange={formik.handleChange}
                       value={iconURL}/>
                {iconURL && <img className={styles.imgIcon} src={iconURL}/>}
                {!iconURL &&
                    <img className={styles.imgIcon} src={require('./../../../assets/icons/location/Unknown.png')}/>}
            </div>
            {isPickIcon &&
                <IconPicker onClose={onClose} onIconPickHandler={onIconPickHandler} iconPossibleFolders={[]}/>}
            <button className={styles.addButton} type={'button'} disabled={disabled} onClick={onAddIcon}>Choose Icon</button>
        </div>

    )
}