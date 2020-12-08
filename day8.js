// function day8(){
//     let fs = require('fs') 
//     fs.readFile('./day8.txt', 'utf8', function (err, data) {
//         if (err) throw err;
//         let directions = data.split('\n')
//         let obj = new Set()
//         let value = 0
//         let i = 0
//         let isInfinite = false
//         while (i < directions.length ){
//             if(obj.has(i)){
//                 isInfinite = true
//                 break;
//             }
//             obj.add(i)
//             let key = directions[i].split(' ')
//             switch(key[0]){
//                 case 'acc':
//                     value += parseInt(key[1])
//                     i++
//                     break;
//                 case 'jmp':
//                     i += parseInt(key[1])
//                     break
//                 default:
//                     i++;
//                     break
//             }
//             // console.log(value)
//         }
//         console.log(value)
//     })
// }

// console.log(day8())

// function day8part2(){
//     let fs = require('fs') 
//     fs.readFile('./day8.txt', 'utf8', function (err, data) {
//         if (err) throw err;
//         let directions = data.split('\n')
//         for(let i = 0; i < directions.length; i++){
//             let key = directions[i].split(' ')
//             if(key[0] === "acc"){
//                 continue;
//             }
//             const keyBackup = key[0]
//             try{
//                 key[0] = (key[0] === "jmp") ? 'nop' : 'jmp'
//                 const result = day8()
//                 if(result.isInfinite){ return false }
//             }
//             finally {
//                 key[0] = keyBackup
//             }
//         }
//     })
// }

// console.log(day8part2())

const fs = require('fs');

/**
 * @typedef Instruction A single program instruction
 * @type { object }
 * @property { string } instruction Instruction to execute
 * @property { number } argument Argument to the instruction
 * 
 * @typedef Program A sequence of {@link Instruction}s to execute
 * @type { Instruction[] }
 * 
 * @typedef ProgramResult The result of executing a {@link Program}
 * @type { object }
 * @property { boolean } isCleanExit If true, then the program exited cleanly
 * @property { boolean } isInfiniteLoop If true, then the program reached an infinite loop
 * @property { number } accumulator Value of the accumulator when program exited
 * @property { number } programCounter Value of the program counter (instruction number) when program exited
 * @property { number[] } trace Sequence of instructions executed
 */

/**
 * Executes a program until exit or an infinite loop
 * @param { Program } program Program to execute
 * @returns { ProgramResult } Status of the program when finished
 */
function executeProgram(program) {
    /** @type { number[] } */
    const trace = [];

    let pc = 0;
    let acc = 0;
    let isInfiniteLoop = false;

    // loop as long as there are instructions to execute (infinite loops are broken later)
    while (pc < program.length) {
        // break if we have been here before
        if (trace.includes(pc)) {
            isInfiniteLoop = true;
            break;
        }

        // get current instruction
        const ins = program[pc];

        // add to trace
        trace.push(pc);

        // execute it
        switch (ins.instruction) {
            case 'nop': {
                pc++;
                break;
            }
            case 'acc': {
                pc++;
                acc += ins.argument;
                break;
            }
            case 'jmp': {
                pc += ins.argument;
                break;
            }
            default: throw new Error(`Unknown instruction '${ ins.instruction }' at line ${ pc }`, ins);
        }
    }

    return {
        programCounter: pc,
        accumulator: acc,
        isCleanExit: !isInfiniteLoop,
        isInfiniteLoop,
        trace
    };
}


/**
 * Parsed program input.
 * @type { Program }
 */
const programInput = 
    Array.from(
        fs.readFileSync('day8.txt', 'utf-8')
        .matchAll(/^(.*) \+?([-\d]+)$/gm)
    )
    .map(([_, instruction, argument]) => ({
        instruction,
        argument: parseInt(argument)
    }))
;

// Part 1

const part1Result = executeProgram(programInput);
console.log(`Part 1: Program executed with return code of ${ part1Result.accumulator }.`, part1Result);

// Part 2

function autoFixProgram() {
    // test each instruction until the program is fixed
    for (let i = 0; i < programInput.length; i++) {
        const ins = programInput[i];

        // skip ACCs
        if (ins.instruction === 'acc') {
            continue;
        }

        // backup modified instruction to restore after
        const insBackup = ins.instruction;

        try {
            // flip the instruction from jmp -> nop or vice versa
            ins.instruction = (ins.instruction === 'jmp') ? 'nop' : 'jmp';

            // if program exited cleanly, then it is fixed
            const result = executeProgram(programInput);
            if (result.isCleanExit) {
                return result;
            }

        } finally {
            // fix up the instruction before looping or exiting
            ins.instruction = insBackup;
        }
    }
}

const part2Result = autoFixProgram();
console.log(`Part 2: Program exited successfully with return code of ${ part2Result.accumulator }.`, part2Result);