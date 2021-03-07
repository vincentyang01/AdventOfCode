function day13(){
    let fs = require('fs') 
    fs.readFile('./day13sample.txt', 'utf8', function (err, data) {
        
        const [target, array] = data.split('\n')
        let arr = array.split(',')
        console.log("Target: ", target)
        let minArr = []
        for(let i = 0; i < arr.length; i++){
            if(!Number(arr[i])){
                arr.splice(i, 1)
                i--
            }
        }
        for(let times of arr){
            let mod = target % times
            minArr.push(times - mod)
        }
        console.log(minArr)
        let min = Math.min(...minArr)
        let index = minArr.indexOf(min)
        console.log(min * arr[index])
    })
}
console.log(day13())

/*
939 % 7 = 1
Keep incrementing 939 until % 7 = 0
945


*/