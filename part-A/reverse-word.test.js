
const reverseWords = require('./reverse-word');
test("'cat and dog' => 'tac dna god'", () => {
    expect(reverseWords('cat and dog')).toBe('tac dna god');
});

test("'hello really  and dog' => 'olleh yllaer  dna god'", () => {
    expect(reverseWords('hello really  and dog')).toBe('olleh yllaer  dna god');
});

test("'a' => 'a'", () => {
    expect(reverseWords('a')).toBe('a');
});

test("'' => 'ERROR'", () => {
    expect(reverseWords('')).toBe('ERROR');
});

test("null => 'ERROR'", () => {
    expect(reverseWords()).toBe('ERROR');
});



