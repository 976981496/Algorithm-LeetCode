/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let res = [];

  let traversal = (root, res = []) => {
    if (root == null) {
      return res;
    }
    res.push(root.val);
    traversal(root.left, res);
    traversal(root.right, res);
    return res;
  };
  res = traversal(root);
  return res;
};
// @lc code=end
