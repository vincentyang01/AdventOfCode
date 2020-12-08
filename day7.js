// function day7(){
    // let fs = require('fs') 
    // fs.readFile('./day7.txt', 'utf8', function (err, data) {
    //     if (err) throw err;
        
//         // let rules = ["light red bags contain 1 bright white bag, 2 muted yellow bags.",
//         //     "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
//         //     "bright white bags contain 1 shiny gold bag.",
//         //     "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
//         //     "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
//         //     "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
//         //     "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
//         //     "faded blue bags contain no other bags.",
//         //     "dotted black bags contain no other bags."]

//         let rules = data.split('\n')
//         let hash = {}
//         let x = 0;
//         for(let i = 0; i < rules.length; i++){
//             let initialBag = rules[i].split('contain')
//             let initialBagColor = initialBag[0].slice(0, -6)
//             if(initialBag[1].includes('shiny gold'))
//                 if(!hash[initialBagColor]){
//                     hash[initialBagColor] = 1
//                 } else { 
//                     hash[initialBagColor]++
//                 }
//         }
//         let arr = Object.keys(hash)
//         while(x < 100){
//             for(let i = 0; i < arr.length; i++){
//                 for(let j = 0; j < rules.length; j++){
//                     let initialBag = rules[j].split('contain')
//                     let initialBagColor = initialBag[0].slice(0, -6)
//                     if(initialBag[1].includes(arr[i])){
//                         if(!hash[initialBagColor]){
//                             hash[initialBagColor] = 1
//                         } else {
//                             hash[initialBagColor]++
//                         }
//                     }
//                 }
//             }
//             x++
//         }
//         console.log(rules.length)
//         console.log(hash)
//         console.log(Object.values(hash).length)
//     })
// }

// console.log(day7())

const fs = require('fs');
const lines = fs.readFileSync('day7.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);
const map = new Map();

function containsShinyGold(color) {
    if(color === 'shiny gold') return true;
    if(!map.has(color)) return false;
    const bagsWithin = map.get(color);
    for (const {color: bag} of bagsWithin) {
        if(containsShinyGold(bag)) {
            return true;
        }
    }
    return false;
}

for (const line of lines) {
    const [bag, bags] = line.split(' bags contain ');

    bags.replace(/\./, '').split(', ').map(txt => {
        const {groups} = /((?<number>\d+) )?(?<color>.*)/.exec(txt.replace(/ bags?/, ''));
        if(!map.has(bag)) {
            map.set(bag, []);
        }
        if(!groups.number) groups.number = 0;
        map.set(bag, [...map.get(bag), groups]);
    })
}

const colors = map.keys();
let total = 0;
for (const color of colors) {
    if(containsShinyGold(color) && color != 'shiny gold') {
        total++;
    }
}

console.log(total);

// part 2

function sumBags(topBag) {
    if(topBag.number == 0) return 0;

    const bagsWithin = map.get(topBag.color);
    let sum = 1;
    for (const bag of bagsWithin) {
        sum += bag.number * sumBags(bag);
    }
    return sum;
}

console.log(sumBags({number: 1, color: 'shiny gold'})-1);