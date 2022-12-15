/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let len1 = nums1.length;
  let len2 = nums2.length;
  let new_arry=[]
//头尾对比
if (nums1[len1-1]<nums2[0]) {
    new_arry=nums1.concat(nums2)
} else if (nums2[0]<nums1[0]) {
    new_arry=nums2.concat(nums1)
}  else {
    let i=len1
    let j=len2
    while (condition) {
        
    }
    
    new_arry=nums2.concat(nums1)
} 

  let len = len1 > len2 ? len1 : len2;
  let i=0,j=0
 
  if (nums1[i]<=nums2[j]) {
    new_arry.push(nums1[i])
    i++
  }else{
    new_arry.push(nums2[j])
    j++

  }
  for (let i = 0; i < len; i++) {
     if (nums1[i]>nums2[  ]) {
         index
     } const element = array[i];
      
  }
};

