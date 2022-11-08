export const createCircle = (dataIndex:number,close:number, name:string = 'circle'):any => { 
    return {
        name: name,
        points: [
            { dataIndex:  dataIndex, value: close },
            { dataIndex:  dataIndex, value: close  }, // no matters
        ],
        styles: {
        style:'stroke',

        stroke: {
            // 'solid' | 'dash'
            style: 'solid',
            size: 20,
            color: '#47c55',
            dashValue: [2, 2]
        },
        },
        lock: true,
        mode: 'strong_magnet',
    }
}