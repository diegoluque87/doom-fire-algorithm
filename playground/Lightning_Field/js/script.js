const rainPixelArray = []
const rainWidth = 50  
const rainHeight = 50
const numberOfPixel = rainHeight * rainWidth
const ColorsPalette = [{"r":0,"g":0,"b":7},{"r":0,"g":0,"b":31},{"r":0,"g":0,"b":47},{"r":0,"g":0,"b":71},{"r":0,"g":0,"b":87},{"r":0,"g":0,"b":87},{"r":0,"g":0,"b":103},{"r":0,"g":0,"b":119},{"r":0,"g":0,"b":143},{"r":0,"g":0,"b":159},{"r":0,"g":0,"b":175},{"r":0,"g":0,"b":191},{"r":0,"g":0,"b":199},{"r":0,"g":0,"b":223},{"r":0,"g":0,"b":223},{"r":0,"g":0,"b":223},{"r":0,"g":0,"b":215},{"r":0,"g":0,"b":215},{"r":15,"g":15,"b":215},{"r":15,"g":15,"b":207},{"r":15,"g":15,"b":207},{"r":15,"g":15,"b":207},{"r":23,"g":23,"b":207},{"r":23,"g":23,"b":199},{"r":23,"g":23,"b":199},{"r":31,"g":31,"b":199},{"r":31,"g":31,"b":191},{"r":31,"g":31,"b":191},{"r":39,"g":39,"b":191},{"r":39,"g":39,"b":191},{"r":47,"g":47,"b":191},{"r":47,"g":47,"b":183},{"r":47,"g":47,"b":183},{"r":55,"g":55,"b":183},{"r":111,"g":111,"b":207},{"r":159,"g":159,"b":223},{"r":199,"g":199,"b":239},{"r":255,"g":255,"b":255}]
const colorLightning = 35
const colorThunder = 5
let lightningExist = false

function start(){
    createDataStructure()
    setInterval(calculatePropagation, 10)
}

function createDataStructure(){
    for (let i = 0; i < numberOfPixel; i++){
        rainPixelArray[i] = 0
    }
}

function calculatePropagation(){
    createRainSource()
    updateLightIntensityPerPixel()
    render()
}

function updateLightIntensityPerPixel(){
    for (let i = numberOfPixel - rainWidth; i >= 0; i--){
            rainPixelArray[i] =  0
    }
    for (let i = numberOfPixel; i >= 0; i--){
        if (rainPixelArray[i] == colorLightning){
            const lightningWay = Math.floor(Math.random() * 3) - 1
            rainPixelArray[i - rainWidth + lightningWay] = colorLightning
        }else{
            rainPixelArray[i] = lightningExist ? colorThunder : 0
        }
    }
}

function render(){
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < rainHeight; row++){
        html += '<tr>'
        for (let column = 0; column < rainWidth; column++){
            const pixelIndex = column + (rainWidth * row)
            const rainIntensity = rainPixelArray[pixelIndex]

            if (debug == true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += rainIntensity
                html += '</td>'
            }else{
                const color = ColorsPalette[rainIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector('#rainCanvas').innerHTML = html
}

function createRainSource(){
    lightningExist = false
    for (let column = ((rainHeight - 1) * rainWidth); column < numberOfPixel; column++){
        const lightningProb = (Math.floor(Math.random() * 100) == 1)
        rainPixelArray[column] = lightningProb ? colorLightning : 0
        lightningExist = lightningProb ? true : lightningExist
    }
}

start()
