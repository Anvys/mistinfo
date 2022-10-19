import {translateLang, TTranslateData, TTranslateLang, TWOid} from "../../Types/CommonTypes";
import {TCommonFields} from "../../Types/MainEntities";

export const initCommonFields:TWOid<TCommonFields> = {
    name:'',
    translate: Object.fromEntries(translateLang.map((v: TTranslateLang)=>[v,''])) as TTranslateData,
    // translate: {En: '', Ru: '', Fr: ''},
    notes:[],
    link:'',
}