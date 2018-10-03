// Intro to ES6 Promises 
// Promises są dostepne od ES6
// Promises są często używane do zarządzania requestami

// traktuj promise jako funkcję, która przyjmuję jeden paramter (funkcję)
// resolve, jesli wszystko poszło OK
// reject, jesli cos sie zjebalo
var somePromise = new Promise((resolve, reject)=>{
	// tu zrobimy całą asynchroniczną część

	// tutaj w resolve, mamy to co user otrzyma jak wszystko się uda
	resolve('Hey. It worked');
	// w reject jesli się nie uda
	// reject('Unable to fullfit promise');
});

// teraz stosujemy metodę 'then', dla naszego promise
// Zalety tej metody, to to, ze nie trzeba pisać żadnych if'ów
// metoda przyjmie dwa parametry, jak się uda to wykona pierwszego console.loga, jak nie to drugiego
// zaletą promise, jest to, że wykona się tylko raz. Przy callback, mozemy przypadkowo wywołąć to samo dwa razy
// w promise, mozesz spró”ować wywołać resolve kilka razy, a i tak wykona się tylko raz.
// Oczywiście masz też opcję wykonać dwie funkcję z zależnosci od tego czy promise się wykona, czy nie (bez ifów) - KOLEJNA ZALETA 
somePromise.then((message) => {
	console.log('Success: ', message);
}, (errorMessage) => {
	console.log('Error: ', errorMessage);
});

// Lekcja nr 37 "Advanced promises"