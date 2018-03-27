# crypto-in-node [![Build Status](https://travis-ci.org/amazingandyyy/crypto-in-node.svg?branch=master)](https://travis-ci.org/amazingandyyy/crypto-in-node)

This is continuing project based on [blockchain-in-node](https://github.com/amazingandyyy/blockchain-in-node/), Crypto = Blockchain + Transaction + Cryptography

## Why another repo? Because crypto is different from blockchain

- Crypto = Blockchain + Transaction + Cryptography = Crypto
- After building a [blockchain](https://github.com/amazingandyyy/blockchain-in-node) in node, I want to build a crypto which impelement address, signatures, transactions, and broadcasting features.
- Learning to build a crypto can help us understand **how to customize blockchain state** to match our application needs and really revealed the power of blockchain.

## This is a lovely demo for

- Decent Idea of how Blocks, Chain, Mining, Nodes, Transaction work with each others.
- How to do them in Node
- How to use sha256 to do PoW(Proof of Work)
- Cryptography: signatures, address, provate keys work with each other
- How pending transaction and mining actually work

## Run it on your machine

```
$ npm clone https://github.com/amazingandyyy/crypto-in-node.git
$ npm i
$ npm run dev
// you will have
$ [socket]         listening on 5001
$ [server]         listening on 3001

<!-- example to run more nodes -->
$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
$ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5002,ws://localhost:5003 npm run dev
```

## Author

Andy Chen([amazingandyyy](https://github.com/amazingandyyy))

## LICENSE

[MIT](https://github.com/amazingandyyy/crypto-in-node/blob/master/LICENSE)

## Resources

- [Blockchain 101 - A Visual Demo by 
Anders Brownworth](https://www.youtube.com/watch?v=_160oMzblY8&t=2s)
- [Blockchain 101 - Part 2 - Public / Private Keys and Signing
 by Anders Brownworth](https://www.youtube.com/watch?v=xIDL_akeras&t=184s)
- [Ethereum : Decentralized Application Design & Development by 
Rajeev Sakhuja](https://www.udemy.com/ethereum-dapp/learn/v4/)
- [Ethereum and Solidity: The Complete Developer's Guide
 by Stephen Grider](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/)
- [Blockchain Programming Using Javascript
](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)
- [Build a Blockchain and a Cryptocurrency from Scratch
](https://www.udemy.com/build-blockchain/learn/v4/)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)