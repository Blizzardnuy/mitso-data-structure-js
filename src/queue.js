const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

module.exports = class Queue {
    getUnderlyingList() {
        return this.head;
    }

    enqueue(value) {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    dequeue() {
        if (!this.head) {
            return null;
        }

        const removedValue = this.head.value;
        this.head = this.head.next;

        if (!this.head) {
            this.tail = null;
        }

        return removedValue;
    }
}