class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
    }

    getSize() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }

    clear() {
        this.head = null;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode
    }

    getFirst() {
        return this.head;
    }

    print() {
        let node = this.head;
        while (node) {
            console.log(node.data);
            node = node.next;
        }

    }

    get5th() {
        let indexMap = new Map();
        try {
            if (!this.head) {
                throw new Error('Linked list is empty!');
            }
            if (!this.head.next) {
                throw new Error('There is only one node in this list.');
            }
            let currentNode = this.head;
            indexMap.set(0, currentNode.data);
            let size = 1;
            while (currentNode.next) {
                currentNode = currentNode.next;
                indexMap.set(size, currentNode.data);
                size += 1;
            }
            if (size < 5) {
                throw new Error('The size of linked list should be at least 5.');
            } else {
                return indexMap.get(size - 5);
            }
        } catch (e) {
            console.log("Error: ", e);
            return -1;
        }
    }

    createFromArray(array) {
        if (!array || array.length === 0) {
            return;
        }
        this.head = new Node(array[0]);
        if (array.length > 1) {
            let currentNode = new Node(array[1]);
            this.head.next = currentNode;
            for (let i = 1; i < array.length - 1; i++) {

                currentNode.next = new Node(array[i + 1]);
                currentNode = currentNode.next;
            }
        }
    }
}

function return5thFromLinkedList(array) {
    let linkedList = new LinkedList();
    linkedList.createFromArray(array);
    linkedList.print();
    console.log("The last 5th is :", linkedList.get5th());
    return linkedList.get5th();
}

return5thFromLinkedList([1, 2, 3, 4, 5, 6]);

module.exports = return5thFromLinkedList;


