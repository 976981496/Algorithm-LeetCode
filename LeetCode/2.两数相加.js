/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (41.66%)
 * Likes:    8200
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 3.3M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 *
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807.
 *
 *
 * 示例 2：
 *
 *
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 *
 *
 * 示例 3：
 *
 *
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 每个链表中的节点数在范围 [1, 100] 内
 * 0
 * 题目数据保证列表表示的数字不含前导零
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 *
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  // let sumLink = new ListNode(0);
  // let cur = sumLink;
  // let curray = 0;
  // while (curray || l1 != null || l2 != null) {
  //   let x = l1 == null ? 0 : l1.val;
  //   let y = l2 == null ? 0 : l2.val;
  //   let sum = x + y + curray;
  //   curray = sum > 10 ? 1 : 0; //是否存在进位
  //   //当前的合的位置的数字
  //   cur.next = new ListNode(sum % 10);
  //   cur = cur.next;
  //   if (l1.next) {
  //     l1 = l1.next;
  //   }
  //   if (l2.next) {
  //     l2 = l2.next;
  //   }
  // }
  // return sumLink.next;

  let addOne = 0
  let flag = new ListNode(0)
  let cur = flag

  while (addOne || l1 || l2) {
      let val1 = l1 !== null ? l1.val : 0
      let val2 = l2 !== null ? l2.val : 0
      let sum = val1 + val2 + addOne

      addOne = sum >= 10 ? 1 : 0

      cur.next = new ListNode(sum % 10)
      cur = cur.next

      if (l1) {
          l1 = l1.next
      }
      if (l2) {
          l2 = l2.next
      }
  }

  return flag.next
};
// @lc code=end
