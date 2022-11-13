const adapter = () => {
    const serializeTime = (timeStr:string): {year:number, mounth:number, day:number} => {
        const arrayStringTime = timeStr.split('-')
        const year = parseInt(arrayStringTime[0])
        const mounth = parseInt(arrayStringTime[1])
        const day = parseInt(arrayStringTime[2])
        return {year, mounth, day}
    }

    return {
        serializeTime
    }

}
export default adapter