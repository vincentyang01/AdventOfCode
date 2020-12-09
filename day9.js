function day9(){
    let fs = require('fs') 
    fs.readFile('./day9.txt', 'utf8', function (err, data) {
        if (err) throw err;
        // let nums = [35, 20, 15, 25, 47, 40, 62, 55, 65,95,102,117,150,182,127,219,299,277,308,576]
        let nums = data.split('\n')
        let removeIndex = 0
        for(let i = 5; i < nums.length; i++ ){ //Iterate over the whole array starting at 5
            let isASum = false
            let obj = {}
            for(let j = 1; j <= 5; j++){ //Create a sliding window of index[0] to index[4] => index 5 - (1...5)
                // console.log("Last 5 numbers are: ", nums[i-1],nums[i-2],nums[i-3],nums[i-4],nums[i-5], ". Two of those add to ", nums[i])
                let diff = nums[i] - nums[i-j] //Get all of the diffs like in the 2 sum problem
                obj[diff] = "hi" //Place the diffs in the object
                if(j === 5){ //Once all of the diffs are in, check if one of the past 5 are inside the obj
                    let k = 0
                    // console.log(obj)
                    for(let k = 1; k <= 5; k++){
                        // console.log("Look here", nums[i-k],obj[nums[i-k]])
                        obj[nums[i-k]] ? isASum = true : null
                        // console.log("Removing... ", nums[i-5])
                        delete obj[nums[i-5]]
                        // console.log(obj)
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

console.log(day9())