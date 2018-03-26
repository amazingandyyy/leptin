import Blockchain from './blockchain';

const bc = new Blockchain();
const sum = [];

for (let i = 0; i < 20; i++) {
  console.log(bc.addBlock(`Andy ${i}`).toString());
  sum.push(bc.chain[i].difficulty);
}

console.log(`average difficulty: ${sum.reduce((a, b) => a + b, 0) / sum.length}`);