/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (72.46%)
 * Likes:    844
 * Dislikes: 0
 * Total Accepted:    231.8K
 * Total Submissions: 319.5K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder
 * 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (postorder == null || inorder == null || postorder.length != inorder.length) {
    return null
  }
  return f(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1)
}
/**
 * @param {number[]} inorder  //中序遍历数组
 * @param {numbe} L2 //中序--开始位置
 * @param {number} R2 //中序--结束位置
 * @param {number[]} post //后续遍历数组
 * @param {number} L1 //后续--开始位置
 * @param {number} R1 //后续--结束位置
 * @return {TreeNode}
 */
var f = function (inorder, L1, R1, post, L2, R2) {
  if (L2 > R2) {
    return null
  }
  let head = new TreeNode(post[R2])

  let r_index = L1 //从中序遍历里面  找到根节点
  while (inorder[r_index] != post[R2]) {
    r_index++
  }

  head.left = f(inorder, L1, r_index - 1, post, L2, L2 + r_index - 1 - L1)
  head.right = f(inorder, r_index + 1, R1, post, L2 + r_index - L1, R2 - 1)
  return head
}
// @lc code=end
