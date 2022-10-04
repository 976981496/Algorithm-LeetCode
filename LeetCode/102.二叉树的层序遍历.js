/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (64.73%)
 * Likes:    1360
 * Dislikes: 0
 * Total Accepted:    597.8K
 * Total Submissions: 921.8K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：[[1]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 2000] 内
 * -1000 <= Node.val <= 1000
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
 * @param {TreeNode} root
 * @return {number[][]}
 */

var levelOrder = function (root) {
  const ret = []
  if (!root) {
    return ret
  }

  const q = []
  q.push(root)
  while (q.length !== 0) {
    const currentLevelSize = q.length
    ret.push([])
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = q.shift()
      ret[ret.length - 1].push(node.val)
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
  }

  return ret
}
//放入队列

var levelOrder = function (root) {
  let allArry = []
  if (root == null) return allArry
  let itemArry = []
  //
  itemArry.push(root)
  while (itemArry.length != 0) {
    let n = itemArry.length
    let level = []
    for (let index = 0; index < n; index++) {
      let cur = itemArry.shift()
      level.push(cur.val)
      if (cur.left) {
        itemArry.push(cur.left)
      }
      if (cur.right) {
        itemArry.push(cur.right)
      }
    }
    allArry.push(level)
  }
  return allArry
}

// @lc code=end
