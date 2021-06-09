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

function main() {
    let linkedList = new LinkedList();
    linkedList.createFromArray([1, 2, 3, 4, 5]);
    console.log("size is :", linkedList.getSize());
    linkedList.print();
}

main();



