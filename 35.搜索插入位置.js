/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  if (nums.length == 0) {
    return -1;
  }
  let left = 0;
  let right = nums.length;
  while (left < right) {
    let mid = left + (right - left) / 2;
    if (target == nums[mid]) {
      right = mid;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid;
    }
  }
  return left;
};
// @lc code=end
