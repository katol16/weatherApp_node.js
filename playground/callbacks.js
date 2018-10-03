// Lekcja nr 28 "Callback Functions & API"

// Generalnie Callback functions, to np:
// setTimeout( () => {
// 	console.log('inside of callback');
// }, 2000);
// Czyli są to funkcję, które jako argument rpzekazują inne funkcję do wywołania.
// W naszym przypadku funkcja setTimeOut, przekazuję arrow function z console.logiem

// Przykład jak działa callback function

// zrobimy taki fakeowy przykłąd pobierania danych usera. podajemy id i wywołujemy callback'a
var getUser = (id, callback) => {
	var user = {
		id: id,
		name: 'Vikram'
	};
	callback(user);
};

// UWAGA! tutaj callback się wykona sie tylko jeśli otrzymamy jakieś dane, czyli w naszym przypadku jeśli przyjdą dane usera o np. id=31
// To jest bardzo ważne! callback wykona się jeśli dostaniemy jakieś 'id', czyli jesli dsotnaiemy pierwszy parametr
// Pamiętaj też, że tutaj nazewnsitwo jest niewazne, mozesz zamaist 'userObject' użyć 'user'. Ale własnie ,zeby wiadomo bylo,
// że to nieistotne użyliśmy innej nazwy
getUser(31, (userObject)=> {
	console.log(userObject);
});
// Jeśli np. powyższe wywołanie funkcji, a dokłądnie callback, chcesz zapisać za pomocą zwykłej funkcji to będziesz miał:
// getUser(31, function callback(userObject) {
// 	console.log(userObject);
// });
// lub nawet
// getUser(31, function(userObject) {
// 	console.log(userObject);
// });

// Ale lepiej przyzyczajaj się do funkcji strzałkowej

// wywołamy naszego callbacka w consoli za pomocą: node playground/callbacks.js 
// Oczywiście powyżej mamy fakeowy przykłąd, nie musimy u robić callbacka, żeby dostać nasz obiekt
// ale to ma nam zademonstrować jak to działa!

// Drugi podobny przykłąd z setTimeout, ten jest bardziej podobny do tego co faktycznie się dzieję,
// przekazujemy callback i zawsze jest jakieś opóżnienie, bo wsyzstko musi się zaprocesować


var getUser2 = (id, callback) => {
	var user = {
		id: id,
		name: 'Vikram2'
	};

	setTimeout( () => {
		callback(user);
	}, 3000);

};

getUser2(31, (userObject)=> {
	console.log(userObject);
});


// Teraz pokażemy przykład z API google maps
// Najpeirw potrzebujemy tego linka
// https://maps.googleapis.com/maps/api/geocode/json?address=1301 lombard street philadelphia
// On zwróci nam info z api n temat konkretnego miejsca (1301 lombard street philadelphia)

// Będziemy teraz wysyłali requesta do google api, za pomocą 3rd part modules "request"
// instalujemy go za pomoca komendy:
// najpierw tworzymy package.json: npm init
// póżniej: npm install request@2.73.0 --save
// @2.73.0 - to wersja modułu

