// Takiego nazewnictwa pownienieś używać do testów, czyli "utils.test.js", teraz nie musimy wymagać biblioteki mocha, jedynie wymagamy naszego pliku, który będziemy testować

const utils = require('./utils');

// it() uruchomi testy, pierwszy argument to opis, co robimy w teście
// drugi argument to funkcja z pliku "utils" do sprawdzenia
// "it" to funckja dostęþna w moca
it('should add two numbers', () => {
    var res = utils.add(33,11);

    // z poniższym kodem test nie przejdzie
    // throw new Error('Value not correct');

    // Jełśi mamy otrzymać wynik 44, możemy to sprawdzić
    if (res !== 44) {
        throw new Error(`Expected 44, but got ${res}.`);
    }
});

it('should sqaure a number', () => {
    var res = utils.square(10);

    if (res !== 100) {
        throw new Error(`Expected 100, but got ${res}`)
    }
})

// Musimy teraz w pliku package.json dodać taką linie kodu:
// "scripts": {
//     "test": "mocha **/*.test.js"
// },

// Właśnie dlatego typ nazewnictwa jest .utils.js, bo poniższy kod teraz zadziała dla wsyzstkich plikóœ testujących z takim nazewnictwem
//  "test": "mocha **/*.test.js"

// W terminalu "npm test"