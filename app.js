// zawsze musimy wymagać naszego modułu by z niego skorzystać
const request = require('request');

// pierwszy parametr to obiekt z informacjami (option object), który możmey konfigurowac różnymi danymi
// drugi to callback function (wywołany kiedy dostnaiemy http endpoint)
// w funckji callback, mamy dokładne argumenty które musimy podać tak samo  (error, response, body)->(jest to zapisane w dokumentacji tego modułu na stronie npm)
request({
	// tu damy uniknale rzeczy np. url
	url: 'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location=1301%20lombard%20street%20philadelphia',
	// dodatkowo dodamy json: true - tu dajmey znać, ze informacja będzie podane jako JSON i to zrobi konwerta do obiketu za nas,
	// więc jest tot aka przydatna opcja, nie musimy dodatkowo formatować tego JSON'a do obiektu
	json: true
}, (error, response, body) => {
	// console.log(body);

	// Lekcja nr 29 "Pretty Printing Object"	
	// Ładnie pokazmey nasz obiekt dlatego inaczej zapsizemy naszego console.loga
	// JSON.stringify to funkcja, weźmie nasz javascriptowy obiekt body (to będzie obiekt javascriptowy, bo pamiętaj, że powyzej użyłeś opcji json: true)
	// drugi argument jako undefined, bo chcemy użyć trzeciego argumentu, wiec musimy wpisać drugi
	// treci argument formatuje określoną ilośc danych i coś tam robi... 

	// Generalnie to robimy tylko po to, zeby łądnie wyglądały zwrócone dane w consoli, więc nie musimy tego robić.
	console.log(JSON.stringify(body, undefined, 2));
});

// do poprawek po zmianach API
// http://links.mead.io/api-fix

// The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat

// The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng

