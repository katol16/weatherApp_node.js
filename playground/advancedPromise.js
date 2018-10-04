var asyncAdd = (a,b) => {
	return new Promise((resolve, reject) => {
		// funckją setTimeout jedynie symulujemy opóźnienie
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a+b);
			} else {
				reject('Arguments must be numbers');
			}
		}, 1500);
	});
};

asyncAdd(13, 15).then((res)=> {
	console.log('Result ', res);
	// teraz zrobimy coś co się nazywa 'promise chain'
	// czyli jak dostaniemy jakiś response z peirwszego promisa, to na bazie tego pierwszego promisa wykonamy drugiego
	// dlatego poniżej będziemy mieć znowu "then"
	return asyncAdd(res, 2);
}, (errorMessage)=> {
	console.log(errorMessage);
}).then((res) => {
	console.log('Should be 30, and it is: ', res);
}, (errorMessage) => {
	console.log(errorMessage);
});

// UWAGA! Powyższy przykład jest trochę chujowy, bo jeżeli w pierwszym promisie, zrobimy np: asyncAdd(3, '5'), to pierwszy promis zwróci errorMessage
// ALE! Drugi promise wykona się normalnie, a to błąd, bo pozniej zwróci 'Should be 10, and it is: undefined' . Zapobiegniemy temu w następujący sposób
// Użyjemy tutaj 'catch', która jest metodą promise, która złapie błędy, jesli w naszym promise chain jakieś się pojawią.

asyncAdd(3, 5).then((res)=> {
	console.log('Result ', res);
	// teraz zrobimy coś co się nazywa 'promise chain'
	// czyli jak dostaniemy jakiś response z peirwszego promisa, to na bazie tego pierwszego promisa wykonamy drugiego
	// dlatego poniżej będziemy mieć znowu "then"
	return asyncAdd(res, 2);
}).then((res) => {
	console.log('Should be 10, and it is: ', res);
}).catch((errorMessage) => {
	console.log(errorMessage);
});