function reverseWords(target) {
    try {
        if (!target || target.length === 0) {
            throw new Error('string is empty!');
        }
        if (target.length === 1) {
            return target;
        }
        let pointerA = 0;
        let pointerB;
        const words = target.split('');
        for (let i = 0; i <= words.length; i++) {
            if (words[i] === ' ' || !words[i]) {
                pointerB = i - 1;

                while (pointerA < pointerB) {
                    let temp;
                    temp = words[pointerA];
                    words[pointerA] = words[pointerB];
                    words[pointerB] = temp;
                    pointerA++;
                    pointerB--;

                }
                pointerA = i + 1;
                pointerB = i + 1;
            }

        }
        let result = '';
        for (let i = 0; i < words.length; i++) {
            result += words[i];
        }
        return result;
    } catch (e) {
        console.log("Error: ", e);
        return "ERROR";
    }



}

let str = "cat and dog";
console.log("Before: ", str);
console.log("After: ", reverseWords(str));
module.exports = reverseWords;
