// Przykładowy request dla dark sky
const request = require('request');

var getWeather = (lat, lng, callback) => {
	request({
		// tu damy uniknale rzeczy np. url
		// url: 'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location=1301%20lombard%20street%20philadelphia',
		url: 'https://api.darksky.net/forecast/4a7dc38b23cc6683d050d31b52da818a/'+lat+','+lng,
		// dodatkowo dodamy json: true - tu dajmey znać, ze informacja będzie podane jako JSON i to zrobi konwerta do obiketu za nas,
		// więc jest tot aka przydatna opcja, nie musimy dodatkowo formatować tego JSON'a do obiektu
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			// console.log(body.currently.temperature);
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		} else {
			callback('Unable to fetch weather');
		}
		
	});
};

// eksportujemy naszą funkcję do pobierania pogody
module.exports.getWeather = getWeather;