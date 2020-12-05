function passport(){
    let fs = require('fs') 
    fs.readFile('./day4.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let passports = data.split('\n\n')
        let counter = 0
        // passports = []
        // passports[0] = fields = "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f"
        // passports[1] = "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926"
        for(let i = 0; i < passports.length; i++) {
            let fields = passports[i].split(/\s+/);
            if(fields.length === 8){
                if(validation(fields)){
                    counter++
                }
            } else if(fields.length === 7 && passports[i].indexOf('cid') === -1){
                if(validation(fields)){
                    counter++
                }
            }
        }
        console.log(counter)
    }) 
}
//fields = pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f

//fields[0] = pid
//fields[1] = 087499704 

//hgt:74in 
//ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f

function validation(fields){
    let fieldCounter = 0
    for(let i = 0; i < fields.length; i++){
        let keyValue = fields[i].split(':')
        if(keyValue[0] === 'byr'){
            console.log(keyValue[1])
            parseInt(keyValue[1]) >= 1920 && parseInt(keyValue[1]) <= 2002 && keyValue[1].length === 4 ? fieldCounter++ : null
        }

        if(keyValue[0] === 'iyr')
            (parseInt(keyValue[1]) >= 2010 && parseInt(keyValue[1]) <= 2020) && keyValue[1].length === 4 ? fieldCounter++ : null

        if(keyValue[0] === 'eyr')
            (parseInt(keyValue[1]) >= 2020 && parseInt(keyValue[1]) <= 2030) && keyValue[1].length === 4 ? fieldCounter++ : null
        if(keyValue[0] === 'hgt'){
            let height = keyValue[1].match(/([0-9]*)(cm|in)/)
            if(height){
                let heightValue = height[1]
                let measurement = height[2]
                if(measurement === 'cm'){
                    parseInt(heightValue) >= 150 && parseInt(heightValue) <= 193 ? fieldCounter++ : null
                }
                if(measurement === 'in'){
                    parseInt(heightValue) >= 59 && parseInt(heightValue) <= 76 ? fieldCounter++ : null
                }
            }
            
        }
        if(keyValue[0] === 'hcl'){
            keyValue[1].match(/#[0-9a-fA-F]{6}/) ? fieldCounter++ : null
        }
        if(keyValue[0] === 'ecl') {
            keyValue[1] === 'amb' || 
            keyValue[1] === 'blu' || 
            keyValue[1] === 'brn' || 
            keyValue[1] === 'gry' ||
            keyValue[1] === 'grn' ||
            keyValue[1] === 'hzl' ||
            keyValue[1] === 'oth' ? fieldCounter++ : null
        }
        if(keyValue[0] === 'pid'){
            keyValue[1].length === 9 && Number(keyValue[1]) ? fieldCounter++ : null
        }
        keyValue[0] === 'cid' ? fieldCounter++ : null
    }
    return fieldCounter === fields.length
}


passport()