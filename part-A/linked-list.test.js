
const return5thFromLinkedList = require('./linked-list');
test("last 5th of [1,2,3,4,5,6] is 2", () => {
    expect(return5thFromLinkedList([1, 2, 3, 4, 5, 6])).toBe(2);
});

test("last 5th of [2,3,4,5,6,7,8,9,10,11] is 7", () => {
    expect(return5thFromLinkedList([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toBe(7);
});

test("last 5th of [] throws error and return -1", () => {
    expect(return5thFromLinkedList([])).toBe(-1);
});

test("last 5th of null throws error and return -1", () => {
    expect(return5thFromLinkedList()).toBe(-1);
});

test("last 5th of array shorter than 5 elements throws error and return -1", () => {
    expect(return5thFromLinkedList([1, 1, 1, 1])).toBe(-1);
});