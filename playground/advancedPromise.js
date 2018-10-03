var asyncAdd = (a,b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a+b);
			} else {
				reject('Arguments must be numbers');
			}
		}, 2500);
	});
};

asyncAdd(3, 5).then((res)=> {
	console.log('Result ', res);
}, (errorMessage)=> {
	console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject)=>{
// 	resolve('Hey. It worked');
// });

// somePromise.then((message) => {
// 	console.log('Success: ', message);
// }, (errorMessage) => {
// 	console.log('Error: ', errorMessage);
// });
