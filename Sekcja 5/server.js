const express = require('express');
// Template Engine - hbs
const hbs =  require('hbs');
const fs = require('fs');

var app = express();

// za pomocą poniższej lini utworyzmy podstronę help.html, bedzie dostþena pod adresem localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

// ta linia jest potrzebna do zainicjowania hbs ( 3 sposób renderowania treści)
app.set('view engine', 'hbs');

// Partial Files - registerPartials, to pliki, któ©ych będziemy często używać np. footer
// registerPartials, przyjmuję jeden argument i jest to ścieżka do pliku
hbs.registerPartials(__dirname + '/views/partials');

// express middleware - zainicjowaliśmy już kilka np powyżej z express.static
// tu mamy przykład, gdzie jeśli nie wykonamy, funkcji next, to nic nam się dalej nie wykona.
// możesz to sprawdzić jak zakomentuejsz next();
app.use((req, res, next) => {
	var now = new Date().toString();

	// req, to obiekt dostępny w express, masz tam statusy requesta, metode, url
	// w naszym przypadku metoda to GET, a ścieszka dla strony głównej to /
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	// Utworzymy plik, który pokaże nam jak pracował nasz serwer (może się przydać kiedyś taki pliczek)
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});

	// generalnie w środku tej funkcji mozemy robić, co chcemy
	// Używamy next(); by powiedzieć express, ze skonczylismy (to co jest w tej funkcji) i może iść dalej. Dlatego jak zakomentujemy next, nic dalej się nie wykona
	next();
});

// // Poniższy kod przyda się w momencie kiedy chcemy poinformować użytkowników, że są prowadzone prace na stronie.
// // teraz stworzymy przykłąd z uzyciem next
// app.use((req, res, next) => {
// 	res.render('maintance.hbs');
// 	// w tym momencie nie wywołąmy next, więc pokaże się tlyko maintence,hbs
// });

// // UWAGA!
// // Mała pierdoła poniżej
// // tutaj jeszcze warto zauważyć, że strona help.html dalej się wczyta, ze względu na strukture srkyptu
// // ale wsytarczy, ze przeniesiesiesz linie 'app.use(express.static(__dirname + '/public'));' poniżej, czyli:
// hbs.registerPartials(__dirname + '/views/partials');

// registerHelpers, do rejestrowania funkcji, przyjmuję dwa argumenty. Nazwę funkcji i ciało funckji
// poniższy helper, ustawi nam odpowiednią datę w footer.hbs
hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear()
});

// poniższy helper ustawi nam litery na duże
hbs.registerHelper('screenIt', (text) => {
	return text.toUpperCase()
});

// Poniżej mamy drugi sposób przekazania HTML'a lub JSON'a
app.get('/', (req, res)=> {
	// res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name: 'Karol',
	// 	likes: [
	// 		'biking',
	// 		'hiking'
	// 	]
	// })

	res.render('home.hbs', {
        pageTitle: 'Main Page',
		welcomeText: 'Hejka ziomek'
	})
});

app.get('/podstrona', (req, res)=> {
	res.send('<h1>Podstrona!</h1>');
});

// Trzeci sposób renderowania HTML'a, to tzw Template Engine, my użyjemy do tego "handlebars", dokumentację masz na stronie handlebarsjs.com
// w NPM to jest hbs
// Można natomiast użyć innych bibliotek np EJS

app.get('/about', (req, res) => {
    // res.render('about.hbs');
	// podamy drugi parametr po 'about.hbs', bedzie to boiekt, który dynamicnzie bedzie pobierany do HTMLA
    res.render('about.hbs', {
    	pageTitle: 'About Page'
	});
});

app.listen(3000, () => {
	console.log('server running on port 3000');
});