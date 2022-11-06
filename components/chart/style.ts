
export enum typeGraphEnum{
  AREA = 'area',
  CANDLE = 'candle_solid' //'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
}

export function generateChartStyle(graphtype:typeGraphEnum){
    return {
        grid: {
            show: false,
            horizontal: {
              show: true,
              size: 1,
              color: '#393939',
              // 'solid'|'dash'
              style: 'dash',
              dashValue: [2, 2]
            },
            vertical: {
              show: false,
              size: 1,
              color: '#393939',
              // 'solid'|'dash'
              style: 'dash',
              dashValue: [2, 2]
            }
        },
        xAxis: {
            show: true,
            height: null,
            axisLine: {
                show: false,
                color: '#888888',
                size: 1
            },
            tickText: {
                show: true,
                color: '#D9D9D9',
                family: 'Helvetica Neue',
                weight: 'normal',
                size: 12,
                paddingTop: 3,
                paddingBottom: 6
            },
            tickLine: {
                show: false,
                size: 1,
                length: 3,
                color: '#888888'
            }
        },
        yAxis: {
            show: true,
            width: null,
            // 'left' | 'right'
            position: 'right',
            // 'normal' | 'percentage' | 'log'
            type: 'normal',
            inside: true,
            axisLine: {
                show: false,
                color: 'rgba(0,0,0,0.2)',
                size: 0
            },
            tickText: {
                show: true,
                color: '#D9D9D9',
                family: 'Helvetica Neue',
                weight: 'normal',
                size: 12,
                paddingLeft: 3,
                paddingRight: 6
            },
            tickLine: {
                show: false,
                size: 1,
                length: 1,
                color: 'red'
            }
        },
    
    
    
        crosshair: {
            show: true,
            horizontal: {
              show: false,
              line: {
                show: true,
                // 'solid'|'dash'
                style: 'dash',
                dashValue: [4, 2],
                size: 1,
                color: '#888888'
              },
              text: {
                show: true,
                color: '#D9D9D9',
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                borderSize: 1,
                borderColor: '#505050',
                borderRadius: 2,
                backgroundColor: '#505050'
              }
            },
            vertical: {
              show: true,
              line: {
                show: true,
                // 'solid'|'dash'
                style: 'solid',
                dashValue: [4, 2],
                size: 1,
                color: '#C8C8C8'
              },
              text: {
                show: true,
                color: '#D9D9D9',
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                borderSize: 1,
                borderColor: '#505050',
                borderRadius: 2,
                backgroundColor: '#505050'
              }
            }
          },
    
    
    
    
        tooltip: {
            // 'always' | 'none' | 'none'
            showRule: 'none',
            // 'standard' | 'rect'
            showType: 'standard',
            labels: [],
            values: null,
            defaultValue: 'n/a',
            rect: {
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 6,
              offsetLeft: 8,
              offsetTop: 8,
              offsetRight: 8,
              borderRadius: 4,
              borderSize: 1,
              borderColor: '#3f4254',
              backgroundColor: 'rgba(17, 17, 17, .3)'
            },
            text: {
              size: 10,
              family: 'Open Sans',
              weight: 'normal',
              color: '#D9D9D9',
              marginLeft: 8,
              marginTop: 6,
              marginRight: 8,
              marginBottom: 0
            }
        },
    
    
        technicalIndicator: {
            margin: {
              top: 0.2,
              bottom: 0.1
            },
            bar: {
              upColor: '#26A69A',
              downColor: '#EF5350',
              noChangeColor: '#851b08'
            },
            line: {
              size: 0,
              colors: ['#FF9600', '#9D65C9', '#2196F3', '#E11D74', '#01C5C4']
            },
            circle: {
              upColor: '#26A69A',
              downColor: '#EF5350',
              noChangeColor: '#851b08'
            },
            lastValueMark: {
              show: false,
              text: {
                show: false,
                color: '#ffffff',
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                paddingLeft: 3,
                paddingTop: 2,
                paddingRight: 3,
                paddingBottom: 2,
                borderRadius: 2
              }
            }
        },
            
    
        candle: {
            type: graphtype,
            bar: {
              upColor: '#4ec953',
              downColor: '#f5526a',
              noChangeColor: '#ba3434',
              borderColor: '#ba3434'
            },
            area: {
                lineSize: 2,
                lineColor: '#47C553',
                value: 'close',
                backgroundColor: [{
                  offset: 0,
                  color: 'rgba(71, 197, 83, 0.01)'   //'rgba(33, 150, 243, 0.01)'
                }, {
                  offset: 1,
                  color:'rgba(71, 197, 83, 0.2)' // 'rgba(33, 150, 243, 0.2)'
                }]
              },
              priceMark: {
      show: true,
      high: {
        show: true,
        color: '#4ec953',
        textMargin: 5,
        textSize: 10,
        textFamily: 'Helvetica Neue',
        textWeight: 'normal'
      },
      low: {
        show: true,
        color: '#4ec953',
        textMargin: 5,
        textSize: 10,
        textFamily: 'Helvetica Neue',
        textWeight: 'normal',
      },
      last: {
        show: true,
        upColor: '#4ec953',
        downColor: '#f5526a',
        noChangeColor: '#888888',
        line: {
          show: true,
          // 'solid'|'dash'
          style: 'dash',
          dashValue: [4, 4],
          size: 1
        },
        text: {
          show: true,
          size: 12,
          paddingLeft: 2,
          paddingTop: 2,
          paddingRight: 2,
          paddingBottom: 2,
          color: '#FFFFFF',
          family: 'Helvetica Neue',
          weight: 'normal',
          borderRadius: 2
        }
      }
    },

        },

        shape:{
          arc:{
            style:'stroke',

                    stroke: {
                      // 'solid'|'dash'
                      style: 'solid',
                      size: 1,
                      color: 'transparent',
                      dashValue: [2, 2]
                    },

                    fill: {
                        color:'#47c553',
                        borderColor: '#47c553',
                        borderSize: '0', 
                    },
          }
        }
    }
}


