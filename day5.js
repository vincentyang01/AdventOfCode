// let directions = "FBFBBFFRLR" //357
// let directions = "BFFFBBFRRR" //567
// let directions = "FFFBBBFRRR" //119
// let directions = "BBFFBBFRLL"
function day5(){
    let arr = []
    let max = 0;
    let row = 0;
    let column = 0;
    let id = 0
    let fs = require('fs') 
    fs.readFile('./day5.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let directions = data.split('\n')
        for(let i = 0; i < directions.length; i++){
            let front = 0;
            let back = 127;
            let left = 0
            let right = 7
            for(let j = 0; j < 7; j++){
                if(directions[i][j] === 'F') {
                    back = Math.floor((back + front) / 2)
                    console.log("F = ", front, "B = ", back)
                } 
                if(directions[i][j] === 'B') {
                    front = Math.ceil((back + front) / 2)
                    console.log("F = ", front, "B = ", back)
                }
            }
            for(let j = 7; j < 10; j++){
                if(directions[i][j] === 'L'){
                    right = Math.floor((right + left) / 2)
                    console.log("L = ", left, "R = ", right)
                } 
                if(directions[i][j] === 'R'){
                    left = Math.ceil((left + right) / 2)
                    console.log("L = ", left, "R = ", right)
                }
            }
            directions[6] === "F" ? row = front : row = back
            directions[9] === "R" ? column = right : column = left
            id = row * 8 + column
            console.log(id)
            arr.push(id)
        }
        
        arr.sort(function (a, b) {
            return a-b;
        });
        console.log(arr)
        console.log(Math.max(...arr))

        for(let k = 0; k < arr.length - 1; k++){
            // console.log(arr[k])
            if (arr[k] - arr[k-1] !== 1) {
                console.log("missing seat is " + (parseInt(arr[k] - 1)));
            }        
        }
    })
}
console.log(day5())
