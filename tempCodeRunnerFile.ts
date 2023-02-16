const [a, b, ...c] = [1, 2, 3, 4, 5];

function hoge(a, b, ...c) {
  console.log(a);
  console.log(b);
  console.log(c);
}

hoge(...c);
