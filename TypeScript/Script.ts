let canvas, ctx, counter, x, y, i, j, start1, start2, tileTemp, direction
let tileX = [1,2,3,4]
let tileY = [1,2,3,4]
let tileSize = 130
let values: any = {}
let valueSize = 1

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function init () {
    window.requestAnimationFrame(draw);

    for (i=1; x <= tileX; i++) {
        for (j=1; j <= tileY; j++) {
            values.push({
                key:   i+""+j,
                value: null
            });
        }
    }

    start1 = Math.floor(randomNumber(1,4))+""+Math.floor(randomNumber(1,4))
    start2 = Math.floor(randomNumber(1,4))+""+Math.floor(randomNumber(1,4))

    if (start2 == start1) {
        start2 = Math.floor(randomNumber(1,4))+""+Math.floor(randomNumber(1,4))
    }
    values[start1] = 2
    values[start2] = 2
}

function logKey(e) {
    if (e.code == "KeyW") {
        direction = "UP"
    }
    if (e.code == "KeyS") {
        direction = "DOWN"
    }
    if (e.code == "KeyA") {
        direction = "LEFT"
    }
    if (e.code == "KeyD") {
        direction = "RIGHT"
    }
    if (values[Math.floor(randomNumber(1,4))+""+Math.floor(randomNumber(1,4))] == null) {
        values[Math.floor(randomNumber(1,6))+""+Math.floor(randomNumber(1,6))] = 2
    }
}

function draw(){
    counter = document.getElementById('counter')
    document.addEventListener('keydown', logKey);

    const canvas = <HTMLCanvasElement> document.getElementById('physicsCanvas')
    ctx = canvas.getContext('2d')

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 400, 400);

    //play area
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.fillRect(50,50,550,550)

    tileX.forEach(function (i) {
        tileY.forEach(function (j) {
            x = i*tileSize+60+i*2-tileSize
            y = j*tileSize+60+j*2-tileSize
            ctx.clearRect(x,y,tileSize,tileSize)

            tileTemp = i+""+j
            if (values[tileTemp] != null) {
                ctx.fillStyle = "orange";
                ctx.strokeRect(x+5,y+5,tileSize-10,tileSize-10)

                ctx.fillStyle = "black";
                ctx.font = '48px serif';
                ctx.fillText(values[tileTemp], x+tileSize/2.5, y+tileSize/1.5)

                if (direction == "LEFT") {
                    if (i == 1) {
                        null
                    }
                    else {
                        if (values[i-1+""+j]) {
                            if (values[i-1+""+j] == values[i+""+j]) {
                                values[i-1+""+j] = values[tileTemp]*2
                                values[tileTemp] = null
                            }
                        }
                        else {
                            values[i-1+""+j] = values[tileTemp]
                            values[tileTemp] = null
                        }
                    }
                }
                if (direction == "RIGHT") {
                    if (i == 4) {
                        null
                    }
                    else {
                        if (values[i+1+""+j]) {
                            if (values[i+1+""+j] == values[i+""+j]) {
                                values[i+1+""+j] = values[tileTemp]*2
                                values[tileTemp] = null
                            }
                        }
                        else {
                            values[i+1+""+j] = values[tileTemp]
                            values[tileTemp] = null
                        }
                    }
                }
                if (direction == "UP") {
                    if (j == 1) {
                        null
                    }
                    else {
                        if (values[i+""+(j-1)]) {
                            if (values[i+""+(j-1)] == values[i+""+j]) {
                                values[i+""+(j-1)] = values[tileTemp]*2
                                values[tileTemp] = null
                            }
                        }
                        else {
                            values[i+""+(j-1)] = values[tileTemp]
                            values[tileTemp] = null
                        }
                    }
                }
                if (direction == "DOWN") {
                    if (j == 4) {
                        null
                    }
                    else {
                        if (values[i+""+(j+1)]) {
                            if (values[i+""+(j+1)] == values[i+""+j]) {
                                values[i+""+(j+1)] = values[tileTemp]*2
                                values[tileTemp] = null
                            }
                        }
                        else {
                            values[i+""+(j+1)] = values[tileTemp]
                            values[tileTemp] = null
                        }
                    }
                }
            }
        });
    });

    ctx.stroke();
    window.requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', init)