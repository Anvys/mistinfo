import React, {useState} from 'react';
import styles from './IconPicker.module.css';


const iconUrlPicker = (folder: string, icon: string) => {
    const str = `./../../assets/icons/${folder}/${icon}.png`
    console.log(folder)
    // return require(`./../../assets/icons/${folder}/${icon}.png`)
    switch (folder) {
        case 'location':
            return require(`./../../assets/icons/location/${icon}.png`)
        case 'material/Wood':
            return require(`./../../assets/icons/material/Wood/${icon}.png`)
        default : {
            console.log(`./../../assets/icons/${folder}/${icon}.png`)
            // return require()
        }
    }
}
const iconData = {
    location: ['Unknown'],
    material: ['Wood/t1', 'Wood/t2', 'Wood/t3', 'Wood/t4'],
    // material: ['t1','t2','t3','t4'],
    component: [],
}
type TProps = {
    onIconPickHandler: (path: string, url: string) => void
    onClose: () => void
};
export const IconPicker: React.FC<TProps> = (props) => {
    const [icons, setIcons] = useState(iconData.location)
    const [folder, setFolder] = useState('location')
    const path = './../../assets/icons/'
    const iconDataKeys = Object.keys(iconData)
    const iconDataValues = Object.values(iconData)

    const changeIconsHandler = (iconDataKey: keyof typeof iconData) => {
        console.log(`change to ${iconDataKey}`)
        setIcons(iconData[iconDataKey])
        setFolder(iconDataKey)
    }
    const iconPickHandler = (path: string, url: string) => {
        console.log(`${path}`)
        props.onIconPickHandler(path, url)
    }
    const onClose = () =>{
        props.onClose()
    }

    const getIconDiv = (v: string, i: number) => {
        const pathArr = v.split('/')
        const sub = pathArr.length > 1 ? pathArr[0] : ''
        const iconFolder = sub.length > 0 ? `${folder}/${sub}` : folder
        const iconName = pathArr[1] || v
        const iconURL = iconUrlPicker(iconFolder, iconName)
        // console.log(sub)
        const iconStyle = {
            width: '30px',
            height: '30px',
            background: `#e18979 url(${iconURL})  center / cover no-repeat`,
        };
        return (
            <div key={i} className={styles.iconDiv} style={iconStyle}
                 onClick={() => iconPickHandler(`${folder}/${v}`, iconURL)}/>)
    }
    return (
        <div className={styles.main}>
            <div className={styles.topMenu}>
                {/*<button className={styles.topMenuButton} type={'button'}>Save</button>*/}
                <button className={styles.topMenuButton} onClick={onClose} type={'button'}>Close</button>
            </div>
            <div className={styles.navMenu}>
                {iconDataKeys.map((v, i) =>
                    <div key={i}>
                        <button className={styles.navMenuButton} type={'button'}
                                onClick={() => changeIconsHandler(v as keyof typeof iconData)}>{v}</button>
                    </div>
                )}
            </div>
            <div className={styles.iconMenu}>
                {icons.length === 0
                    ? <div>Empty icons folder</div>
                    : icons.map((v: string, i) => getIconDiv(v, i)
                    )}
            </div>
        </div>
    );
}
