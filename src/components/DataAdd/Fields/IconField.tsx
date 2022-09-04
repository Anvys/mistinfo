import {FormikProps} from "formik";
import React, {useState} from "react";
import styles from "../DataAdd.module.css";
import {IconPicker} from "../../IconPicker/IconPicker";

type IconFieldProps = {
    // pos: { x: number, y: number },
    // onChange: React.ChangeEventHandler<HTMLInputElement>,
    index: number,
    formik: FormikProps<any>
    disabled: boolean
}
export const IconField: React.FC<IconFieldProps> = ({index, formik, disabled}) => {
    const [isPickIcon, setIsPickIcon] = useState(false)
    const [iconURL, setIconURL] = useState(formik.values.icon)
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
        <div className={styles.iconMainDiv}>
            <div className={styles.iconFieldBox}>
                <label className={styles.iconLabel} htmlFor={'icon'}>icon:</label>
                <input disabled={disabled} className={styles.iconInput} type={'text'} id={'icon'} name={'icon'}
                    // disabled={true}
                    //    onChange={onYChange}
                       value={formik.values.icon}/>
                {iconURL && <img className={styles.imgIcon} src={iconURL}/>}
                {!iconURL &&
                    <img className={styles.imgIcon} src={require('./../../../assets/icons/location/Unknown.png')}/>}
            </div>
            {isPickIcon &&
                <IconPicker onClose={onClose} onIconPickHandler={onIconPickHandler} iconPossibleFolders={[]}/>}
            <button disabled={disabled} onClick={onAddIcon}>Choose Icon</button>
        </div>

    )
}