import { ShapeTemplate } from "klinecharts";

export function generateTemplateCircle(): ShapeTemplate {
    
  
  return {
        // name
        name:'circle',
        totalStep: 3,
        checkEventCoordinateOnShape: ({ dataSource, eventCoordinate }: {dataSource:any, eventCoordinate:any} ) => {
          const xDis = Math.abs(dataSource.x - eventCoordinate.x)
          const yDis = Math.abs(dataSource.y - eventCoordinate.y)
          const r = Math.sqrt(xDis * xDis + yDis * yDis)
          return Math.abs(r - dataSource.radius) < 2;
        },
      
        // Create shape information
        createShapeDataSource: ({ step, points, coordinates }: {step:any,points:any,coordinates:any}) => {
          
            if (coordinates.length === 2) {
            const xDis = Math.abs(coordinates[0].x - coordinates[1].x)
            const yDis = Math.abs(coordinates[0].y - coordinates[1].y)
            // const radius = Math.sqrt(xDis * xDis + yDis * yDis)
            const radius = 5
            return [
              {
                type: 'arc',
                isDraw: true,
                isCheck: false,
                styles: {
                //     point: {
                //     backgroundColor: '#47c553',
                //     borderColor: '#47c553',
                //     borderSize: 0,
                //     radius: 0,
                //     activeBackgroundColor: '#47c553',
                //     activeBorderColor: '#47c553',
                //     activeBorderSize: 1,
                //     activeRadius: 6
                //   },
                    // borderColor:'#47c553',
                    // color: '#47c553',
                    // stroke: {
                    //     // 'solid'|'dash'
                    //     style: 'solid',
                    //     size: 1,
                    //     color: '#47c553',
                    //     dashValue: [2, 2]
                    //   },
                    style:'fill',

                    stroke: {
                      // 'solid'|'dash'
                      style: 'solid',
                      size: 20,
                      color: '#47c553',
                      dashValue: [2, 2]
                    },

                    fill: {
                        color:'#47c553',
                        borderColor: '#47c553',
                        borderSize: '0', 
                        opacity:'0' 
                    },
                    text: {
                      style: 'fill',
                      color: '#21f3b8',
                      size: 12,
                      family: 'Helvetica Neue',
                      weight: 'normal',
                      offset: [0, 0]
                    }


                },
                // point information
                dataSource: [
                  { ...coordinates[0], radius, startAngle: 0, endAngle: Math.PI * 2 },
                ]
              },
              // hollow circle
              {
                type:'arc',
                isDraw: true,
                // Need to check if it is on the border
                isCheck: true,
                // point information
                dataSource: [
                  { ...coordinates[0], radius, startAngle: 0, endAngle: Math.PI * 2 },
                ]
              }
            ]
          }
          return []
        }
      }
}