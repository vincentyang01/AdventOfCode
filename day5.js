function day5(){
    let highest = 0
    let fs = require('fs') 
    fs.readFile('./day5.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let directions = data.split('\n')
    // let directions = "FBFBBFFRLR" //357
    // let directions = "BFFFBBFRRR" //567
    // let directions = "FFFBBBFRRR" //119
        for(let i = 0; i < directions.length; i++){
            console.log(directions[i])
            let front = 0;
            let back = 127;
            let mid = 63
            for(let j = 0; j < 7; j++){
                if(directions[i][j] === 'B'){
                    front = mid
                    mid = Math.floor((front + back) / 2)
                    console.log("F = ", front, "M = ", mid, "B = ", back)
                } else if(directions[i][j] === 'F') {
                    back = mid
                    mid = Math.ceil((front + back) / 2)
                    console.log("F = ", front, "M = ", mid, "B = ", back)
                }
            }
            // console.log("Answer is: ", mid)
            let left = 0
            let right = 7
            let center = 4
            for(let j = 7; j < 10; j++){
                if(directions[i][j] === 'L'){
                    right = center
                    center = Math.floor((left + right) / 2)
                    console.log("L = ", left,"C = ", center, "R = ", right)
                } else if(directions[i][j] === 'R'){
                    left = center
                    center = Math.ceil((left + right) / 2)
                    console.log("L = ", left,"C = ", center, "R = ", right)
                }
            }
            console.log(mid, center)
            console.log(mid * 8 + center)
            mid * 8 + center > highest ? highest = mid * 8 + center : null
            console.log(highest)
        }
    })
}

console.log(day5())