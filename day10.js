function day10(){
    let fs = require('fs') 
    fs.readFile('./day10.txt', 'utf8', function (err, data) {
        let jolts = data.split('\n')
        jolts.sort(function(a, b) {
            return a - b;
        });
        jolts.push(parseInt(jolts[jolts.length-1]) + 3)
        jolts.unshift(0)
        console.log(jolts)
        let one = 0;
        let three = 0;
        for(let i = 0; i < jolts.length; i++) {
            jolts[i] - jolts[i - 1] === 1 ? one++ : null;
            jolts[i] - jolts[i - 1] === 3 ? three++ : null;
        }
        console.log("Nums of ones: ", one, " Number of threes: ", three, " Multiplied: ", one * three)
    })
}

// console.log(day10())

function day10part2(){
    let fs = require('fs') 
    fs.readFile('./day10.txt', 'utf8', function (err, data) {
        let jolts = data.split("\n");
        let adapters = jolts.sort((a, b) => a - b).map((x) => Number(x));
        adapters.unshift(0);
        ways = adapters.map((x, i) => (i == 0 ? 1 : 0));
        console.log(ways)

        for (let i = 0; i < ways.length; i++) {
            for (let j = i - 3; j < i; j++) {
                if (adapters[i] <= adapters[j] + 3) {
                    ways[i] += ways[j];
                }
            }
        }

console.log("Ways to arrange adapters:", ways[ways.length - 1]);    
    })
}

console.log(day10part2())