/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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

var inorderTraversal = function (root) {
  let res = [];
  let traversal = (root) => {
    if (root == null) {
      return;
    }
    traversal(root.left);
    // 中序遍历位置
    res.push(root.val);
    traversal(root.right);
  };
  traversal(root);
  return res;
};
let tree = [1, null, 2, 3];
console.log(inorderTraversal(tree));
// @lc code=end
