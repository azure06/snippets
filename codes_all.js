const writeline = (...args) => {
  console.log(...args);
  return args.length === 1 ? args[0] : args;
};

//  3 5 6x

const mergeSort = (nums) => {
  const sort = (a, b) => {
    const result = [];
    for (let i = 0, j = 0; i < a.length || j < b.length; ) {
      if (b[j] === undefined || a[i] < b[j]) {
        result.push(a[i]);
        i += 1;
      } else {
        result.push(b[j]);
        j += 1;
      }
    }
    return result;
  };
  const func = (arr) => {
    if (arr.length <= 1) return arr;
    const center = Math.floor(arr.length / 2);
    return sort(
      func(arr.slice(0, center)),
      func(arr.slice(center, arr.length))
    );
  };
  return func(nums);
};

writeline(mergeSort([3, 1, 2, 5]));
