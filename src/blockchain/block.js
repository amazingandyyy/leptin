import SHA256 from 'crypto-js/sha256';

class Block {
  constructor(_timestamp, _lastHash, _hash, _data) {
    this.timestamp = _timestamp;
    this.lastHash = _lastHash;
    this.hash = _hash;
    this.data = _data;
  }

  toString() {
    return `Block -
      Timestamp:  ${this.timestamp}
      Last Hash:  ${this.lastHash.substring(0, 10)}
      Hash:       ${this.hash.substring(0, 10)}
      Data:       ${this.data}
    `;
  }

  static genesis() {
    return new this('timestamp', 'genesis', '00000', []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = this.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static hashBlock(block) {
    const { timestamp, lastHash, data } = block;
    return this.hash(timestamp, lastHash, data);
  }
}

export default Block;