import Util from '../utility';
import { DIFFICULTY, MINE_RATE } from '../config';

class Block {
  constructor(_timestamp, _lastHash, _hash, _data, _nonce, _difficulty) {
    this.timestamp = _timestamp;
    this.lastHash = _lastHash;
    this.hash = _hash;
    this.data = _data;
    this.nonce = _nonce;
    this.difficulty = _difficulty || DIFFICULTY;
  }

  toString() {
    return `Block -
      Timestamp:  ${this.timestamp}
      Last Hash:  ${this.lastHash.substring(0, 10)}
      Hash:       ${this.hash.substring(0, 10)}
      Difficulty: ${this.difficulty}
      Nonce:      ${this.nonce}
      Data:       ${this.data}
    `;
  }

  static genesis() {
    return new this('timestamp', 'genesis', '0ddafdf000', [], 0, DIFFICULTY);
  }

  static mineBlock(lastBlock, data) {
    console.log('\r\x1b[90m[blockchain]\t start mining...');
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let timestamp;
    let nonce = 0;
    let hash;

    do {
      nonce++;
      hash = this.hash(timestamp, lastHash, data, nonce, difficulty);
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      // process.stdout.write(`\r\x1b[90m[blockchain]\t start mining..${'.'.repeat(Math.floor(nonce++ / (500 * (DIFFICULTY ** 2))))}\x1b[0m`);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return Util.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`);
  }

  static hashBlock(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return this.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty = (lastBlock.timestamp + MINE_RATE > currentTime) ? difficulty + 1 : difficulty - 1;
    return difficulty;
  }
}

export default Block;