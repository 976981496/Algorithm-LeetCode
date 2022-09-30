/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (71.19%)
 * Likes:    1733
 * Dislikes: 0
 * Total Accepted:    419.7K
 * Total Submissions: 588K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder
 * 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: preorder = [-1], inorder = [-1]
 * 输出: [-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder 和 inorder 均 无重复 元素
 * inorder 均出现在 preorder
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
 *
 *
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder == null || inorder == null || preorder.length != inorder.length) {
    return null
  }
  return f(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1)
}

/**
 * @param {number[]} pre //前序遍历数组
 * @param {number} L1 //前序--开始位置
 * @param {number} R1 //前序--结束位置
 * @param {number[]} inorder  //中序遍历数组
 * @param {numbe} L2 //中序--开始位置
 * @param {number} R2 //中序--结束位置
 * @return {TreeNode}
 */
var f = function (pre, L1, R1, inorder, L2, R2) {
  if (L1 > R1) {
    return null
  }
  let head = new TreeNode(pre[L1])
  let r_index = L2
  while (inorder[r_index] != pre[L1]) {
    r_index++
  }
  head.left = f(pre, L1 + 1, L1 + r_index - L2, inorder, L2, r_index - 1)
  head.right = f(pre, L1 + r_index - L2 + 1, R1, inorder, r_index + 1, R2)
  return head
}
// @lc code=end
