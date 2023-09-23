/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
//判断相等的两个树 就需要
// 每个值都相等  左子树和右子树都相等

var isSameTree = function (p, q) {
    if (p == null && q == null) return true
    if (p == null || q == null) return false
    if (p.val !==q.val) return false
    
  
    return  isSameTree(q.left,p.left)&&isSameTree(q.right,p.right)
  }



// var isSameTree = function (p, q) {
//   if (p == null && q == null) return true
//   if (p == null || q == null) return false
//   if (p.val != q.val) return false

//   return isSameTree(q.left, p.left) && isSameTree(q.right, p.right)
// }
// @lc code=end
