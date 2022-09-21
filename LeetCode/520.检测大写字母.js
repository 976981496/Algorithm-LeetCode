/*
 * @lc app=leetcode.cn id=520 lang=javascript
 *
 * [520] 检测大写字母
 */

// @lc code=start
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  //A-Z  65-90
  //a-z  97-122
  let firstStr = word[0];
  if (firstStr.charCodeAt() > 96) {
    return str.every(item => {
      return item.charCodeAt() > 96;
    });
  }
  //第一个大写
  let no_first = word.slice(1);
  return no_first.every(item => {
    return item.charCodeAt() < 91 || item.charCodeAt() > 96;
  });
};
// @lc code=end
