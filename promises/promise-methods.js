const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 1 resolved");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 2 was resolved");
  }, 2000);
});

promise1
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.message);
  });

promise2
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.message);
  });

Promise.all([promise1, promise2])
    .then(values => {
        console.log(values);
    }).catch(error => {
        console.log('error')
    });