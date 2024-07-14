import Jimp from 'jimp';
// Zelle class
class Cell {
    constructor(x, y, symbol) {
        this.x = x;//horizontal Position der Zelle
        this.y = y;//vertikale position der Zelle
        this.symbol = symbol;//das Zeichen die Zelle dartellen soll
    }

    drawCell() {
        // Drawing the symbol to the terminal
        process.stdout.write(this.symbol);//ausgiben das gespeicherte Symbol der Zelle auf der Konsole.

    }
}
// Acsii class
class Acsii {
    constructor(image, width, height) {
        this.image = image;//das Bild das wir in ASCII-Art umwandeln wollen
        this.width = width;//die Breite  des Bildes in Pixel
        this.height = height;//die Höhe  des Bildes in Pixel
        this.cells = [];//ein Array mit allen Zellen
    }
    //Initialisurung der ASCII-Art
    init(size) {
        size = parseInt(size);//die Größe der Zelle in eine Ganzzahl umgewandelt
        this.image.resize(this.width, this.height);//das Bild wird auf die angegebene Breite und Höhe skaliert

        // Pixel daten erhalten
        for (let y = 0; y < this.height; y += size) {// Eine Schleife durchläuft das Bild in Schritten von size in der Höhe.
            for (let x = 0; x < this.width; x += size) {//Eine innere Schleife durchläuft das Bild in Schritten von size in der Breite.
                
                //Diese Funktion nimmt einen Ganzzahlwert pixel, der die Farbe in einem spezifischen Format kodiert, und wandelt ihn in ein Objekt um, das die RGBA-Komponenten enthält.
                //Der zurückgegebene Wert ist ein Objekt mit den Eigenschaften r, g, b und a, die die Rot-, Grün-, Blau- und Alpha-Werte des Pixels darstellen.
                
                const pixel = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                
                //Extrahiert die Rot-, Grün-, Blau- und Alpha-Komponenten des Pixels.
                const red = pixel.r;         //Rot-Wert des Pixels und speichert ihn in der Variablen red.
                const green = pixel.g;       //Grün-Wert des Pixels und speichert ihn in der Variablen green.
                const blue = pixel.b;        //Blau-Wert des Pixels und speichert ihn in der Variablen blue.
                const alpha = pixel.a;       //Alpha-Wert (Transparenz) des Pixels und speichert ihn in der Variablen alpha.

                // Neue Zelle erstellen
                if (alpha > 0) {// 
                    const grayScale = (red + green + blue) / 3; // Durchschnitt der RGB-Werte
                    const symbol = this.convertToSymbol(grayScale); // Umwandlung in ASCII-Symbol
                    this.cells.push(new Cell(x, y, symbol)); // Hinzufügen der Zelle zur Liste
                    //Erstellt eine neue Zelle mit den Koordinaten (x, y) und dem entsprechenden Symbol und fügt sie cells-Array hinzu.
                }
            }
            this.cells.push(new Cell(0, 0, '\n')); // Am Ende jeder Zeile einen Zeilenumbruch hinzufügen
        }
    }
    draw() {//sorgt für dass jedes Cell-Objekt im cells-Array sein ASCII-Zeichen auf der Konsole ausgibt
        this.cells.forEach(c => c.drawCell());
    }
    convertToSymbol(g) {//fonction um den Graustufenwert g (0-255) eines Pixels in ein ASCII-Symbol umzuwandeln
        const grayRamp = '@&%*+=-;,. '
                         .split('');//ein Array von ASCII-Zeichen, die in aufsteigender Helligkeit geordnet sind (von dunkel zu hell).

        const rampLength = grayRamp.length;
        const index = Math.ceil(((rampLength - 1) * g) / 255);
        return grayRamp[index];
    }
}
//initialisierung  
let acsii;//Diese Variable wird später verwendet um eine Konkretesobjekt-Instanz- der Acsii-Class zu speichern die das Bild in ASCII-Kunst umwandeln wird.
let image;//Diese Variable wird später verwendet um das Bildobjekt zu speichern das mit Jimp geladen wird.

// function to show the generated acsii
function showAcsii(size) {
    acsii = new Acsii(
        image,
        image.bitmap.width,//image.bitmap.width: Übergibt die Breite des Bildes an die Instanz.
        image.bitmap.height); //Übergibt die Höhe des Bildes an die Instanz. 
        
    
    acsii.init(size);//nitialisiert die ASCII-Kunst mit der angegebenen Zellengröße.
    acsii.draw();//zeichnet die ASCII-Kunst in der Konsole.
}

// lesen den Dateipfad des Bildes und Zellengröße (size) aus den Befehlszeilenargumenten (process.argv) ein.
const filePath = process.argv[2];
const size = process.argv[3] || 10;

Jimp.read(filePath)//liest ein Bild aus der Datei die durch filePath angegeben wird.
    //Wenn das Bild erfolgreich geladen wurde führt der Code in:
    .then(img => {
            image = img;//bedeutet dass das geladene Bild in der Variable image gespeichert wird. 
            image.resize(800, 400); //methode von Jimp Größe zu ändern auf Breite 600 pixel & Höhe auf 400 pixel
            showAcsii(size);
        });

 
   