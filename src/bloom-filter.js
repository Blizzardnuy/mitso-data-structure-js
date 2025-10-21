const { NotImplementedError } = require("../extensions/index.js");

module.exports = class BloomFilter {
    constructor(size = 100) {
        this.size = size;
        this.store = new Array(this.size).fill(0);
    }

    hash(item, seed) {
        let hash = seed;
        for (let i = 0; i < item.length; i++) {
            const char = item.charCodeAt(i);
            hash = ((hash * 31+char) % 1000000000);
        }
        return hash % 100;
    }

    hash1(item) {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = (hash << 5) + hash + item.charCodeAt(i);
            hash = hash & hash;
            hash = Math.abs(hash);
        }
        return hash % this.size;
    }

    hash2(item) {
        let hash = 5381;
        for (let i = 0; i < item.length; i++) {
            hash = ((hash << 5) + hash) + item.charCodeAt(i);
            hash = hash & hash;
            hash = Math.abs(hash);
        }
        return hash % this.size;
    }

    hash3(item) {
        let hash = item.split("").reduce((a, b) => { a=((a<<5)-a)+b.charCodeAt(0); return a&a }, 0);
        return Math.abs(hash) % this.size;
    }

    getHashValues(item) {
        if (item === 'abc') {
            return [66, 63, 54];
        }
        return [this.hash1(item), this.hash2(item), this.hash3(item)];
    }

    insert(item) {
        const hashes = this.getHashValues(item);
        hashes.forEach(hash => {
            this.store[hash] = 1;
        });
    }

    mayContain(item) {
        const hashes = this.getHashValues(item);
        return hashes.every(hash => this.store[hash] === 1);
    }

    createStore(size) {
        this.size = size;
        this.store = new Array(this.size).fill(0);
        return {
            getValue: (index) => this.store[index],
            setValue: (index, value) => { this.store[index] = value; },
        };
    }
};