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
  return !head
    ? null
    : (() => {
        const node = new ListNode(head);
        node.next = toListNode(tail);
        return node;
      })();
}

/**
   *  [10,15,30,70]
      [  MIN   MAX
        [Max, Min],
        [10,  10],
        [10,  15],
        [10,  30],
        [10,  70]
      ]

      [
      [70,  70],
      [30,  70],
      [15,   70],
      [10,   70],
      [Max, Min]
      ]


   */
function minAmplitude(nums, k) {
  const left = Array(nums.length)
    .fill(null)
    .map(() => Array(2));

  let leftMin = nums[0];
  let leftMax = nums[0];
  left[0][0] = Number.MAX_SAFE_INTEGER;
  left[0][1] = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i < nums.length; i += 1) {
    left[i][0] = leftMin;
    left[i][1] = leftMax;
    leftMin = Math.min(leftMin, nums[i]);
    leftMax = Math.max(leftMax, nums[i]);
  }

  const right = Array(nums.length)
    .fill(null)
    .map(() => Array(2));
  let rightMin = nums[nums.length - 1];
  let rightMax = nums[nums.length - 1];
  right[nums.length - 1][0] = Number.MAX_SAFE_INTEGER;
  right[nums.length - 1][1] = Number.MIN_SAFE_INTEGER;

  for (let i = nums.length - 2; i >= 0; i -= 1) {
    right[i][0] = rightMin;
    right[i][1] = rightMax;
    rightMin = Math.min(rightMin, nums[i]);
    rightMax = Math.max(rightMax, nums[i]);
  }
  log(left);
  log(right);
  let res = Number.MAX_VALUE;
  //{8,7,4,1};
  for (let i = 0; i <= nums.length - k; i++) {
    const min = Math.min(left[i][0], right[i + k - 1][0]);
    const max = Math.max(left[i][1], right[i + k - 1][1]);
    log(min, max);
    // log(min, max, [left[i][0], right[i + k - 1][0]]);
    res = Math.min(res, max - min);
  }
  return res;
}

// log(minAmplitude([8, 7, 4, 1], 1));
log(minAmplitude([8, 1, 4, 7], 2));

// 7 0 1 2
//
