const array = [...[1, 2, 3, 4]];
const [a, b, ...tail] = [1, 2, 3, 4];
// const array = [1,2,3,4];

console.log(array);

// function a([a, b, c, ...tail]) {
//   console.log(a, b, c, tail);
// }

// a(array);

// const g = [1, 2, 3, ...[1, 2, 3, 4]];
