console.log('Starting app');

// ten callback jest asynchroniczny, bo przez te 2 sekundy zanim wywoła się ta fukncja, to reszta funkcji się wykonuje
setTimeout( () => {
	console.log('inside of callback');
}, 2000);
// Podobną rzecz zrobimy w naszej apce, bo na dane z google maps, bedizmey czekac jakoś 2 sekundy
// Więc nie chcemy, zeby aplikacja przez te 2 sekundyc zekała, tylko zeby wykonywała się dalej

setTimeout( () => {
	console.log('0 seconds setTimeOut');
}, 0);

console.log('Finishing app');

// bedzie: "Starting app","Finishing app", "0 seconds setTimeOut", "inside of callback"
// Wydaje się dziwne, że "0 seconds setTimeOut", wyświetla się jako trzecie, ale w następnym odcinku ziomek wyjaścnia dalczego node tak działa

// Lekcja nr 27 "Call Stack & Event Loop"
// Gość tutaj wykłąda teorię z Asynchronous w node,js, mowi jak to działa "pod spodem" i że to trudne i zaleca oglądać ten filmik pare razy

// Tutaj będziemy mieli opis jak to zadziała wewnątrz silnika V8, node.js itd.
// Generalnie mamy tam process taki: Call Stack => Node APIs => Callback Queue , pozniej Event Loop

// Tutaj żeby to ogarnąć to najlepiej wrócić do filmiku!
// Pamiętaj, że w sumie powyższy przykłąd zadziała TAK samo na przeglądarce, bez używania node.js