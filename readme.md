# crypto-in-node [![Build Status](https://travis-ci.org/amazingandyyy/crypto-in-node.svg?branch=master)](https://travis-ci.org/amazingandyyy/crypto-in-node)

This is continuing project based on [blockchain-in-node](https://github.com/amazingandyyy/blockchain-in-node/), Crypto = Blockchain + Transaction + Cryptography

## Why another repo? Because crypto is different from blockchain

- Crypto = Blockchain + Transaction + Cryptography = Crypto
- After building a blobkchain demo in node, I want to build a crypto which impelement address, signatures, and broadcasting feature on that of the [blockchain](https://github.com/amazingandyyy/blockchain-in-node).
- Learning to build a crypto can help us understand how to **customize blockchain state** in match our application needs

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

<!-- to run more nodes -->
$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
$ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5002,ws://localhost:5003 npm run dev
```

## Author

Andy Chen([amazingandyyy](https://github.com/amazingandyyy))

## LICENSE

[MIT](https://github.com/amazingandyyy/crypto-in-node/blob/master/LICENSE)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)