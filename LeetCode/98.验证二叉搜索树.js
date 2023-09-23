/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  let arr = inorderTraversal(root);
  return determineOrder(arr);
};

const determineOrder = (arr) => {
  if (arr.length < 2) {
    return true;
  }
  let ascending = null;
  let nextArr = arr.slice(1);
  console.log(nextArr)
  for (var i = 0; i < nextArr.length; i++) {
    if (nextArr[i] === arr[i]) {
      continue;
    } else if (ascending === null) {
      ascending = nextArr[i] > arr[i];
    } else if (ascending !== nextArr[i] > arr[i]) {
      return false;
    }
  }
  if (ascending === null) {
    return false;
  }
  return ascending ? true : false;
};

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

//遍历
//   var isValidBST = function (root) {
//     return help(root, -Infinity, Infinity);
//   };
// const help = function (root, lower, upper) {
//   if (root == null) return true;
//   if (root.val <= lower || root.val >= upper) return false;
//   return help(root.left, lower, root.val) && help(root.right, root.val, upper);
// };
// @lc code=end
