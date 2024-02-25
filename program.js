// console.log("hello world");

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let start = 0;
    let charMap = {};

    for (let end = 0; end < s.length; end++) {
        const currentChar = s[end];
        if (charMap[currentChar] >= start) {
            start = charMap[currentChar] + 1;
        }
        charMap[currentChar] = end;
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};      
s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));

