function day9(){
    let fs = require('fs') 
    fs.readFile('./day9.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let nums = data.split('\n')
        let removeIndex = 0
        for(let i = 25; i < nums.length; i++ ){ //Iterate over the whole array starting at 5
            let isASum = false
            let obj = {}
            for(let j = 1; j <= 25; j++){ //Create a sliding window of index[0] to index[4] => index 5 - (1...5)
                let diff = nums[i] - nums[i-j] //Get all of the diffs like in the 2 sum problem
                obj[diff] = "hi" //Place the diffs in the object
                if(j === 25){ //Once all of the diffs are in, check if one of the past 5 are inside the obj
                    let k = 0
                    for(let k = 1; k <= 25; k++){
                        obj[nums[i-k]] ? isASum = true : null
                        delete obj[nums[i-25]]
                    }
                }
            }
            console.log("Is there a sum for ",nums[i], isASum)
            if(!isASum){
                return nums[i]
            }
            
            removeIndex++
        }
    })
}

// console.log(day9())


function day9part2(){
    let fs = require('fs') 
    fs.readFile('./day9.txt', 'utf8', function (err, data) {
        let nums = data.split('\n')
        let endPoint = parseInt(nums.indexOf("1212510616"))
        for(let i = endPoint - 1; i > 0; i--) {
            let sum = 1212510616
            let j = i
            while(nums[j] <= sum && sum > 0){
                console.log(sum, " - ", nums[j], " = ", sum-nums[j])
                sum -= parseInt(nums[j])
                j--
                if(sum === 0){
                    // console.log("The contiguous sequence are between indexes ",i, " and ", j)
                    let arr = []
                    while(j <= i){
                        // console.log("This num ", nums[j])
                        arr.push(nums[j])
                        j++
                    }
                    // console.log(parseInt(max) + parseInt(min)) // They are  80577046 47620511
                    arr.sort(function(a, b) {
                        return a - b;
                    });
                    let len = arr.length - 1
                    console.log(arr[len], "and", arr[0], " = ", parseInt(arr[len]) + parseInt(arr[0]))
                    return parseInt(arr[len]) + parseInt(arr[0])
                }
            }
        }
    })
}
console.log(day9part2())