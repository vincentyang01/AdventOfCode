function day12(){
    let fs = require('fs') 
    fs.readFile('./day12.txt', 'utf8', function (err, data) {
        let directions = data.split('\n')
        let yAxis = 0
        let xAxis = 0

        let facing = [0, 90, 180, 270] //North, East, South, West
        facingDirection = facing.indexOf(90)

        for(let i = 0; i < directions.length; i++){
            let num = parseInt(directions[i].slice(1, directions[i].length))
            //console.log(num)
            if(directions[i][0] === "N"){
                yAxis += num
            }

            if(directions[i][0] === "S"){
                yAxis -= num
            }

            if(directions[i][0] === "E"){
                xAxis += num
            }

            if(directions[i][0] === "W"){
                xAxis -= num
            }

            if(directions[i][0] === "L"){
                console.log("Before changing: ", facingDirection)
                facingDirection -= (num / 90)
                facingDirection += 4
                console.log("After changing: ", facingDirection)
            }

            if(directions[i][0] === "R"){
                facingDirection += (num / 90)
                facingDirection %= 4
            }

            if(directions[i][0] === "F"){
                console.log("Facing Direction: ", facingDirection, directions[i][0], num)
                if(facingDirection === 0){
                    yAxis += num
                }
                if(facingDirection === 1){
                    xAxis += num
                }
                if(facingDirection === 2){
                    yAxis -= num
                }
                if(facingDirection === 3){
                    xAxis -= num
                }
            }
        }
        console.log(xAxis, yAxis, " = ", xAxis + yAxis)
        return [xAxis, yAxis]
    })
}

console.log(day12())