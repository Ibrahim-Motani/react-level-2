// producing code
const promiseObj = new Promise(function (resolve, reject) {
    setTimeout(() => {
        const someTask = true;
        if (someTask) {
            const data = [{ id: 1, name: 'john' }, { id: 2, name: 'doe' }];
            resolve(data);
        } else {
            reject(new Error('something went wrong'));
        }
    }, 3000);
});

// consuming code
promiseObj
    .then((response) => { console.log(response) })
    .catch((error) => {
        console.log(error.message);
    });

