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
  let right = nums.length-1;
  while (left <= right) {
    let mid = Math.floor((left + right)/ 2) ;
    if (target == nums[mid]) {
      left = mid;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid-1;
    }
  }
  return left;
};
// @lc code=end
