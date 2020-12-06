function day6(){
    let fs = require('fs') 
    fs.readFile('./day6.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let groupForms = data.split('\n\n')
        let count = 0
        for(let i = 0; i < groupForms.length; i++){ //groupForms[0] is length 44
            let hash = {}
            for(let j = 0; j < groupForms[i].length; j++){
                if(!(groupForms[i][j] in hash) && (groupForms[i][j] !== '\n')){
                    hash[groupForms[i][j]] = "hi"
                }
            }
            count += Object.keys(hash).length
        }
        console.log(count)
    })
}
console.log(day6())

function day6part2(){
    let fs = require('fs') 
    fs.readFile('./day6.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let groupForms = data.split('\n\n')
        let count = 0
        for(let i = 0; i < groupForms.length; i++){
            let individualForms = groupForms[i].split('\n')
            let hash = {}
            for(let j = 0; j < groupForms[i].length; j++){
                if(!(groupForms[i][j] in hash) && (groupForms[i][j] !== '\n')){
                    hash[groupForms[i][j]] = 1
                } else {
                    hash[groupForms[i][j]]++
                }
            }
            let arr = Object.values(hash)
            for(let k = 0; k < arr.length; k++){
                arr[k] === individualForms.length ? count++ : null
            }
        }
        console.log(count)
    })
}
console.log(day6part2())