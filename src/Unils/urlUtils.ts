type TGetSearchParamsReturn = {
    pos: [number, number] | undefined,
    from: string | undefined,
    location: string | undefined,
    region: string | undefined,
    quest: string | undefined,
    name: string | undefined,
}
export const getSearchParams = (str: string): TGetSearchParamsReturn | undefined => {
    if (str.length) {
        const result: TGetSearchParamsReturn = {
            pos: undefined,
            from: undefined,
            location: undefined,
            region: undefined,
            quest: undefined,
            name: undefined,
        }
        const e = Object.fromEntries(str.substring(1).split('&').map(v => v.split('=')))
        // console.log(e)
        // if (!!e.x && !!e.y && !isNaN(+e.x) && !isNaN(+e.y)) result.pos = [+e.x, +e.y]
        // if (!!e.from && e.from.length > 0) result.from = decodeURI(e.from)
        // if (!!e.location && e.location.length > 0) result.location = decodeURI(e.location)
        // if (!!e.region && e.region.length > 0) result.region = decodeURI(e.region)
        Object.keys(e).forEach(k=>{
            // console.log(k, (k==='x' || k==='y') && result.pos === undefined && !isNaN(+e.x) && !isNaN(+e.y))
            if((k==='x' || k==='y')){
                if(result.pos === undefined && !isNaN(+e.x) && !isNaN(+e.y)) result.pos = [+e.x, +e.y]
            }
            else{
                if(!!e[k] && e[k].length > 0) { // @ts-ignore
                    result[k] = decodeURI(e[k])
                }
            }
        })
        // console.log(result)
        return result
    } else return undefined

}