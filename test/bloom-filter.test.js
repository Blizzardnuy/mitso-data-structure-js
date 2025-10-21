const { assert, expect } = require("chai");
const BloomFilter = require('../src/bloom-filter');
const { testOptional } = require("../extensions/index.js");

it.optional = testOptional;

Object.freeze(assert);

describe('BloomFilter', () => {
  let bloomFilter;
  const people = [
    'Bruce Wayne',
    'Clark Kent',
    'Barry Allen',
  ];

  beforeEach(() => {
    bloomFilter = new BloomFilter();
  });

  it.optional('should have methods named "insert" and "mayContain"', () => {
    assert.strictEqual(typeof bloomFilter.insert, 'function');
    assert.strictEqual(typeof bloomFilter.mayContain, 'function');
  });

  it.optional('should create a new filter store with the appropriate methods', () => {
    const store = bloomFilter.createStore(18);
    assert.strictEqual(typeof store.getValue, 'function');
    assert.strictEqual(typeof store.setValue, 'function');
  });

  it.optional('should hash deterministically with all 3 hash functions', () => {
    const str1 = 'apple';

    assert.strictEqual(bloomFilter.hash1(str1), bloomFilter.hash1(str1));
    assert.strictEqual(bloomFilter.hash2(str1), bloomFilter.hash2(str1));
    assert.strictEqual(bloomFilter.hash3(str1), bloomFilter.hash3(str1));

    assert.strictEqual(bloomFilter.hash1(str1), 14);
    assert.strictEqual(bloomFilter.hash2(str1), 43);
    assert.strictEqual(bloomFilter.hash3(str1), 10);

    const str2 = 'orange';

    assert.strictEqual(bloomFilter.hash1(str2), bloomFilter.hash1(str2));
    assert.strictEqual(bloomFilter.hash2(str2), bloomFilter.hash2(str2));
    assert.strictEqual(bloomFilter.hash3(str2), bloomFilter.hash3(str2));

    assert.strictEqual(bloomFilter.hash1(str2), 0);
    assert.strictEqual(bloomFilter.hash2(str2), 61);
    assert.strictEqual(bloomFilter.hash3(str2), 10);
  });

  it.optional('should create an array with 3 hash values', () => {
    assert.strictEqual(bloomFilter.getHashValues('abc').length, 3);
    assert.deepEqual(bloomFilter.getHashValues('abc'), [66, 63, 54]);
  });

  it.optional('should insert strings correctly and return true when checking for inserted values', () => {
    people.forEach((person) => bloomFilter.insert(person));

    assert.strictEqual(bloomFilter.mayContain('Bruce Wayne'), true);
    assert.strictEqual(bloomFilter.mayContain('Clark Kent'), true);
    assert.strictEqual(bloomFilter.mayContain('Barry Allen'), true);

    assert.strictEqual(bloomFilter.mayContain('Tony Stark'), false);
  });
});