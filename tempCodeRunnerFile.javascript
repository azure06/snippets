// fetch("https://postas.com").then(() => { }) 


// console.log("A");

Promise.reject()
    .catch(() => "I am Anonymous")
    .then((res) => "I am " + res)
    .then((res) => { console.log(res) })

// console.log("B");