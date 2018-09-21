// zawsze musimy wymagać naszego modułu by z niego skorzystać
const request = require('request');

// Poniższa funkcja przyjmuję jeden arugment np. "1301 lombard philadelpiha"
// encodeURIComponent('"1301 lombard philadelpiha');
// zwróci coś takiego "1301%20lombard%20philadelpiha
// poniżej zamiast .a, możesz też wpisać .adress


// tę funkcję będziemy eksportować
// Pamietaj, że tutaj tylko przekazuejsz parametr (address, callback)-trzeba przekazać odpowiednią ilośc parametrów. Nazwa może być dowolna
// dopiero w wywołaniu funkcji nazwa ma znaczenie. W naszym przypadku w wywołaniu będize argv, 
// bo te zmienną chcemy przekazać jako argument funkcji
// Jako drugi parametr będziemy mieli callback 
var geocodeAdress = (address, callback) => {

	var encodeAdress = encodeURIComponent(address);

	// zobacyzmy nasz argv (toz awiera wszystko co zostało sparsowane przez yargs)
	// w consoli wpisz node app.js -a 'adres tutaj'
	// console.log(argv);

	// pokażemy encode adres
	console.log(encodeAdress);
	// pierwszy parametr to obiekt z informacjami (option object), który możmey konfigurowac różnymi danymi
	// drugi to callback function (wywołany kiedy dostnaiemy http endpoint)
	// w funckji callback, mamy dokładne argumenty które musimy podać tak samo  (error, response, body)->(jest to zapisane w dokumentacji tego modułu na stronie npm)
	request({
		// tu damy uniknale rzeczy np. url
		// url: 'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location=1301%20lombard%20street%20philadelphia',
		url: 'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location='+encodeAdress,
		// dodatkowo dodamy json: true - tu dajmey znać, ze informacja będzie podane jako JSON i to zrobi konwerta do obiketu za nas,
		// więc jest tot aka przydatna opcja, nie musimy dodatkowo formatować tego JSON'a do obiektu
		json: true
	}, (error, response, body) => {
		// console.log(body);
		// body -  jest tutaj informacją, którą otrzymujemy
		// response - to obiekt, który posiada miedzy innymi: statusCode, body, headers, request, hia(nasze headers)
		// error - błędy, będą pakzane jako statusCode. Jeśli wsyzstko jest ok, to zwróci "null"

		// Lekcja nr 29 "Pretty Printing Object"	
		// Ładnie pokazmey nasz obiekt dlatego inaczej zapsizemy naszego console.loga
		// JSON.stringify to funkcja, weźmie nasz javascriptowy obiekt body (to będzie obiekt javascriptowy, bo pamiętaj, że powyzej użyłeś opcji json: true)
		// drugi argument jako undefined, bo chcemy użyć trzeciego argumentu, wiec musimy wpisać drugi
		// treci argument formatuje określoną ilośc danych i coś tam robi... 

		// Generalnie to robimy tylko po to, zeby łądnie wyglądały zwrócone dane w consoli, więc nie musimy tego robić.
		// console.log(JSON.stringify(body, undefined, 2));
		// console.log(JSON.stringify(response, undefined, 2));
		// console.log(JSON.stringify(error, undefined, 2));

		// Jesli w naszej apliakcji wprowadizmy złe dane i aapi nie zwróci żadnych danych, np. Wpiszemy "00000"
		// to w poglądzie naszego obiektu zobaczymy, że mamy obiekt ze statuse, "ZERO_RESULTS"
		// W przypadku poprawnego wpsiania danych i otrzymania informacji mamy status "OK"

		// Za pomocą statusów opisanych powyżej, sprawdizmy czyw szystko poszło dobrze

		// najpierw sprawdzimy, czy obiekt error istnieje
		if (error) {
			callback('Unable to connect to Google servers.');
			// console.log('Unable to connect to Google servers.');

		// poniższe body.status nie jest zawsze takie same, to już kwestia danego API, w jakich obiektach są przekazywane błędy
		// jak uzywamy nowych api, warto sprawdzic jak przekazują takie złe przekazania jak np. wpisanie 00000 w kodzie pocztowym
		} else if (body.status === "ZERO_RESULTS") {
			callback('Unable to find that address');
			// console.log('Unable to find that address');
		} 
		// Tutaj masz trochę inaczje niż w kursie, bo API się zmieniło
		// Musisz chyba to zrobić na bazie statuscode. Jak jest git to statuscode:0 jak zle to statuscode:400
		else {
			// żeby zobaczyć jak sie dostać do konrketnej informacji w naszym obiekcie, możemy wejśc w przeglądarkę(JSON view) lub konsolę i sprawdzić gdzie co jest 
			// za pomocą consoli w taki sposób: console.log(JSON.stringify(response, undefined, 2));

			callback(undefined, {
				// console.log(`Adress: ${body.results[0].providedLocation.location}`); // results[0], bo to tablica z jednym elemnetem (obiektem)
				address: body.results[0].providedLocation.location,
				// console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`); 
				latitude: body.results[0].locations[0].latLng.lat,
				// console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`); 	
				longitude: body.results[0].locations[0].latLng.lng
			});
			// callback(`Adress: ${body.results[0].providedLocation.location}`);
			// callback(`Latitude: ${body.results[0].locations[0].latLng.lat}`); 
			// callback(`Longitude: ${body.results[0].locations[0].latLng.lng}`); 
		} 
	
	});

	// do poprawek po zmianach API
	// http://links.mead.io/api-fix

	// The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat

	// The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng

	// Metody z node.js

	// Poniższa funkcja przyjmuję jeden arugment np. "1301 lombard philadelpiha"
	// encodeURIComponent('"1301 lombard philadelpiha');
	// zwróci coś takiego "1301%20lombard%20philadelpiha

	// Funkcje jak gdyby odwrotne

	// Poniższa funkcja przyjmuję jeden arugment np. "1301%20lombard%20philadelpiha"
	// decodeURIComponent('"1301 lombard philadelpiha');
	// zwróci coś takiego "1301 lombard philadelpiha 
};

module.exports = {
	geocodeAdress 
}