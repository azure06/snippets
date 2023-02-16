const log = (...args) => {
  args.length === 1
    ? console.dir(args[0], { depth: null })
    : console.log(...args);
  return args.length === 1 ? args[0] : args;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function toListNode([head, ...tail]) {
  return head === undefined
    ? null
    : (() => {
      const node = new ListNode(head);
      node.next = toListNode(tail);
      return node;
    })();
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function toTreeNode([head, ...rest]) {
  const node = new TreeNode(head);
  const buildTree = (node, [left, right, ...rest]) => {
    node.left = left === undefined || left === null ? null : new TreeNode(left);
    node.right =
      right === undefined || left === null ? null : new TreeNode(right);
    return node.left === null && node.right === null
      ? rest
      : node.right === null
        ? buildTree(node.left, rest)
        : left === null
          ? buildTree(node.right, rest)
          : buildTree(node.right, buildTree(node.left, rest));
  };
  buildTree(node, rest);
  return node;
}

// fabcde
// abd

//      f a b c d e
//    0 0 0 0 0 0 0 
// a  0 0 1 1 1 1 1
// b  0 0 1 2 2 2 2

// e  0 0 1 2 2 2 3


//      a b c d
//    0 0 0 0 0
// a  0 0 1 2 3
// b  0 1 
// e  0

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function (words1, words2) {
  const maps = [];
  const result = [];
  const toMap = (word) => {
    const map = {};
    for (let i = 0; i < word.length; i += 1) {
      map[word[i]] = map[word[i]] !== undefined ? map[word[i]] + 1 : 1;
    }
    return map;
  }
  const combineWords = (words) => {
    const entries = [];
    const result = {}
    for (let i = 0; i < words.length; i += 1) entries.push(Object.entries(toMap(words[i])));
    for (let i = 0; i < entries.length; i += 1) {
      for (let j = 0; j < entries[i].length; j += 1) {
        result[entries[i][j][0]] = result[entries[i][j][0]] === undefined || result[entries[i][j][0]] < entries[i][j][1] ? entries[i][j][1] : result[entries[i][j][0]];
      }
    }
    return Object.entries(result);
  }
  const func = (word, map, entry) => {
    for (let i = 0; i < entry.length; i += 1) {
      if (map[entry[i][0]] === undefined || map[entry[i][0]] < entry[i][1]) return
    }
    result.push(word);
  }

  for (let i = 0; i < words1.length; i += 1) maps.push(toMap(words1[i]));
  const entry = combineWords(words2);
  for (let i = 0; i < words1.length; i += 1) func(words1[i], maps[i], entry);
  return result;
}

var sortList = function (head) {
  const split = (head) => {
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    const right = slow.next;
    slow.next = null;
    return [head, right];
  };
  const sort = (left, right) => {
    let head = left.val < right.val ? left : right;
    let tail = head;
    head === left ? (left = left.next) : (right = right.next);
    while (left || right) {
      if (left && right) {
        if (left.val < right.val) {
          tail.next = left;
          left = left.next;
        } else {
          tail.next = right;
          right = right.next;
        }
      } else if (left) {
        tail.next = left;
        left = left.next;
      } else {
        tail.next = right;
        right = right.next;
      }
      tail = tail.next;
    }
    return head;
  };
  const func = (head) => {
    if (!head.next) return head;
    const [a, b] = split(head);
    return sort(func(a), func(b));
  };
  return func(head);
};

// log(sortList(toListNode([1, 9, 4, 0, 100, 2])));

/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
  const sum = ((1 + maxChoosableInteger) * maxChoosableInteger) / 2;
  if (sum < desiredTotal) return false;
  if (desiredTotal <= 0) return true;
  const func = (maxChoosableInteger, desiredTotal, arr, memo, nest) => {
    if (desiredTotal <= 0) return true;
    const key = toInteger(arr);
    if (memo[key] === undefined) {
      for (let i = maxChoosableInteger; i > 0; i -= 1) {
        if (arr[i]) continue;
        arr[i] = true;
        // prettier-ignore
        const isAWin = func(maxChoosableInteger, desiredTotal - i, arr, memo, nest + 1);
        // This will invert the result each time unless it the very first time;
        memo[key] = nest === 0;
        arr[i] = false;
        if (isAWin) return memo[key];
      }
      // If it's not the first loop the above win;
      memo[key] = nest !== 0;
    }
    return memo[key];
  };
  return func(
    maxChoosableInteger,
    desiredTotal,
    new Array(maxChoosableInteger + 1).fill(false),
    {},
    0
  );
};

function toInteger(values) {
  let num = 0;
  for (const value of values) {
    num = num << 1;
    if (value) num = num | 1;
  }
  return num;
}

// log(canIWin(18, 79));
// const [a, b] = [canIWin(8, 17), canIWin2(8, 17)];
// const [a, b] = [canIWin(10, 40), canIWin2(10, 40)];

var findPeakElement = function (nums, start = 0, end = nums.length - 1) {
  const center = start + Math.floor((end - start) / 2);
  if (end + 1 - start <= 2) return nums[end] > nums[start] ? end : start;
  const left = nums[center - 1] ?? -Math.Infinity;
  const right = nums[center + 1] ?? -Math.Infinity;
  if (nums[center] > left && nums[center] > right) return center;
  return right > left
    ? findPeakElement(nums, center, end)
    : findPeakElement(nums, start, center);
};

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path, result = []) {
  let segment = "";
  for (let i = 0; i <= path.length; i += 1) {
    if (segment && (path[i] === "/" || path[i] === undefined)) {
      if (segment === "..") result.pop();
      else if (segment !== ".") result.push(`/${segment}`);
      segment = "";
    } else if (path[i] !== "/") segment += path[i];
  }
  return result.join("") || "/";
};

var cloneGraph = function (node, map = {}) {
  if (!node) return null;
  map[node.val] = new Node(node.val);
  map[node.val].neighbors = node.neighbors
    .map((n) => map[n.val] ?? cloneGraph(n, map))
    .filter((v) => v !== null);
  return map[node.val];
};

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
var levelOrder = function (root, nest = 0, result = []) {
  if (root === null) return result;
  result[nest] = result[nest] ? [...result[nest], root.val] : [root.val];
  levelOrder(root.left, nest + 1, result);
  levelOrder(root.right, nest + 1, result);
  return result;
};

// log(levelOrder(toTreeNode([3, 9, 20, null, null, 15, 7])));

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root, prev, tmpA, tmpB) {
  const trasverse = (root) => {
    Ï;
    if (root.left) trasverse(root.left);
    if (prev && prev.val >= root.val) {
      tmpA = tmpA ? tmpA : prev;
      tmpB = root;
    }
    prev = root;
    if (root.right) trasverse(root.right);
  };
  trasverse(root);
  const tmp = tmpA.val;
  tmpA.val = tmpB.val;
  tmpB.val = tmp;
};

// const tree = new TreeNode(3, new TreeNode(1), new TreeNode(4, new TreeNode(2)));
const tree = new TreeNode(1, new TreeNode(3, null, new TreeNode(2)));

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
  const func = (root) => {
    const left = root.left ? func(root.left) : [];
    const right = root.right ? func(root.right) : [];
    return [...left, root.val, ...right];
  };
  const result = func(root);
  for (let i = 0; i < result.length - 1; i += 1) {
    if (result[i] >= result[i + 1]) return false;
  }
  return true;
};

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n, start = 1) {
  const func = (n, start) => {
    let result = 0;
    for (let pos = start; pos <= n; pos += 1) {
      const left = pos !== start ? func(pos - 1, start) : 1;
      const right = pos !== n ? func(n, pos + 1) : 1;
      result += left * right;
    }
    return result;
  };

  return func(n, 1);
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  list = list.filter((list) => list !== null);
  let head;
  let tmp;

  while (lists.length > 0) {
    let index;
    for (let i = 0; i < lists.length; i += 1) {
      index =
        index === undefined || lists[index].val > lists[i].val ? i : index;
    }
    if (!head) head = tmp = new ListNode(lists[index].val);
    else {
      tmp.next = new ListNode(lists[index].val);
      tmp = tmp.next;
    }
    lists[index] = lists[index].next;
    if (!lists[index]) {
      lists = [
        ...lists.slice(0, index),
        ...lists.slice(index + 1, lists.length),
      ];
    }
  }
  return head ?? [];
};

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n, open = 0, str = "", result = []) {
  if (n === 0 && open === 0) result.push(str);
  if (open > 0) generateParenthesis(n, open - 1, str + ")", result);
  if (n > 0) generateParenthesis(n - 1, open + 1, str + "(", result);
  return result;
};

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const dictionary = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const func = ([head, ...tail], combination = "", result = []) => {
    if (head === undefined) {
      result.push(combination);
    } else {
      for (let i = 0; i < dictionary[head].length; i += 1) {
        func(tail, combination + dictionary[head][i], result);
      }
    }
    return result;
  };
  return func(digits);
};

/** Never tested but should work almost
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const len = nums1.length + nums2.length;
  const even = len % 2 === 0;

  for (let l = 0, r = 0; ;) {
    nums1[l] = nums1[l] ?? Number.POSITIVE_INFINITY;
    nums2[r] = nums2[r] ?? Number.POSITIVE_INFINITY;

    if (nums2[r] < nums1[l]) {
      r += 1;
      if (l + r === Math.floor(len / 2)) {
        if (!even) return nums2[r - 1];
        else {
          return (
            (nums2[r - 1] +
              Math.min(
                nums1[l] ?? Number.POSITIVE_INFINITY,
                nums2[r] ?? Number.POSITIVE_INFINITY
              )) /
            2
          );
        }
      }
    } else {
      l += 1;
      if (l + r === Math.floor(len / 2)) {
        if (!even) return nums2[l - 1];
        else {
          return (
            (nums1[l - 1] +
              Math.min(
                nums1[l] ?? Number.POSITIVE_INFINITY,
                nums2[r] ?? Number.POSITIVE_INFINITY
              )) /
            2
          );
        }
      }
    }
  }
};

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  const result = nums
    .map(String)
    .sort((a, b) => (a.concat(b) > b.concat(a) ? -1 : 1))
    .join("");
  return result.startsWith("0") ? "0" : result;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let i = 0;
  let j = 0;
  for (; j < nums.length; j += 1) {
    if (nums[j] === 0) k -= 1;
    if (k < 0 && nums[i++] === 0) {
      k += 1;
    }
  }
  return j - i;
};

// log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 0));

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var groupAnagrams = function (strs) {
  const result = {};
  const order = (...arr) => arr.sort().join("");
  for (let i = 0; i < strs.length; i += 1) {
    const value = order(...strs[i]);
    result[value] === undefined
      ? (result[value] = [strs[i]])
      : result[value].push(strs[i]);
  }
  return Object.values(result);
};

// log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// log(longestCommonSubsequence("by", "bby"));

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var numTrees = function (n) {
  if (n === 1) return 1;
  const left = numTrees(n - 1);
  const right = numTrees(n - 1);
  const both = n > 2 ? numTrees(n - 2) : 0;
  return left + right + both;
};

// type Kintone = {
//   record: {
//     問合せステータス: {
//       value:
//         | "対応中（開発回答待ち）"
//         | "対応中（開発確認中）"
//         | "対応中（CCに回答済み）",
//     },
//     日付_3: { type: "DATE", value: string }, //　開発依頼日
//     日付: { type: "DATE", value: "2023-03-31" }, //　開発回答期限日
//     案件名: {
//       type: "SINGLE_LINE_TEXT",
//       value: string,
//     },
//   },
// };
