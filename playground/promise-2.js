const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var encodeAdress = encodeURIComponent(address);

		// request wykonuje HTTP request
		request({
			url: 'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location='+encodeAdress,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Unable to connect to Google servers.');
			} else if (body.status === "ZERO_RESULTS") {
				reject('Unable to find that address');
			} 
			else {
				resolve({
					address: body.results[0].providedLocation.location,
					latitude: body.results[0].locations[0].latLng.lat,
					longitude: body.results[0].locations[0].latLng.lng
				});
			} 
		});
	});
};

geocodeAddress('19116').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=> {
	console.log(errorMessage);
});

// PAMIĘTAJ! resolve i reject przyjmują tylko jeden argument