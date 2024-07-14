# ProjektProgramingBasic




### Beschreibung

Dieses Skript wandelt ein Bild in ASCII-Kunst um und zeigt es in der Konsole an.

### Verwendung

Um das Skript auszuführen, müssen Sie Node.js installiert haben. Verwenden Sie dann den folgenden Befehl in der Kommandozeile:

```bash
node skript.js <Bildpfad> <Zellengröße>
```

< Bildpfad >: Der Pfad zur Bilddatei, die umgewandelt werden soll.

< Zellengröße > (optional): Die Größe jeder Zelle in Pixeln. Standardmäßig ist dies 10.

### Abhängigkeiten
Das Skript verwendet die folgenden Node.js-Pakete:

Jimp: Für die Bildmanipulation und Pixelzugriff.
Um die benötigten Pakete zu installieren, führen Sie folgenden Befehl aus:

```bash
npm install jimp
```

Ein Beispiel für die Ausführung des Skripts:

```bash
node ascii-art.js mona-lisa.jpg 8
```

Dies zeigt das Bild mona-lisa.jpg in ASCII-Art mit einer Zellengröße von 8 Pixeln in der Konsole an.

## Warum habe ich Jimp gewählt?

Ich habe Jimp statt Canvas und Sharp gewählt, weil ich mit Jimp das, was ich vorher gelernt habe, besser üben kann. Jimp bereitet nur das Bild vor, und ich muss dann ein JavaScript-Programm schreiben, um das Bild in Text umzuwandeln.

Mit Jimp kann ich:
- Bilder öffnen und bearbeiten
- Bilder in Graustufen umwandeln
- Kontrast und Helligkeit ändern
- Bilder zuschneiden und skalieren

Diese Wahl hilft mir, die Bildbearbeitung zu üben und meine JavaScript-Fähigkeiten zu verbessern.


### Größte Herausforderung
Die größte Herausforderung bestand darin, die richtige Graustufenumwandlung der Bildpixel zu implementieren und die passenden ASCII-Symbole basierend auf den Pixelwerten auszuwählen.

```javascript
//In der Acsii-Klasse, Methode init(size)
const grayScale = (red + green + blue) / 3;
const symbol = this.convertToSymbol(grayScale);
this.cells.push(new Cell(x, y, symbol));
```
- Beispiel:

``` javascript 

convertToSymbol(g) {//fonction um den Graustufenwert g (0-255) eines Pixels in ein ASCII-Symbol umzuwandeln
        const grayRamp = '@&%*+=-;,. '
                         .split('');//ein Array von ASCII-Zeichen, die in aufsteigender Helligkeit geordnet sind (von dunkel zu hell).

        const rampLength = grayRamp.length;
        const index = Math.ceil(((rampLength - 1) * g) / 255);
        return grayRamp[index];
    }
```
und rampLength ist 12.

Der höchste gültige Index für das Array grayRamp ist 11 (weil grayRamp.length - 1).
Wenn der Graustufenwert g berechnet wird, wird der Index berechnet als:

```javascript
const index = Math.ceil(((rampLength - 1) * g) / 255);
```
##### Beispiel
Wenn g =150 ist, ergibt (12 - 1) * 150 / 255 = 7.882. 
Nach Math.ceil() wird der Index auf 8 aufgerundet, was bedeutet, dass grayRamp[8] ausgewählt wird, was das Zeichen ';' ist.
Diese Verwendung von grayRamp.length - 1 stellt sicher, dass die Funktion convertToSymbol(g) korrekt und effektiv arbeitet, indem sie den Graustufenwert in ein passendes ASCII-Symbol umwandelt.



### Größte Erkenntnis
Eine wichtige Erkenntnis aus diesem Projekt war die praktische Anwendung von Klassen zur strukturierten Organisation des Codes und die Verbesserung meiner Fähigkeiten in der Bildverarbeitung mit Jimp. Es war eine wertvolle Lernerfahrung, komplexe Algorithmen zur Bildverarbeitung im Node.js umzusetzen.

### Neues Gelernt
Ich habe neue Konzepte der ASCII-Art, der Bildbearbeitung mit Jimp und der effizienten Handhabung von zweidimensionalen Koordinaten in JavaScript gelernt. Diese Erfahrung hat meine Fähigkeiten erweitert und mein Verständnis für die Umsetzung von Algorithmen zur visuellen Darstellung in der Konsole vertieft.
```javascript
// In der Acsii-Klasse, Methode init(size)
for (let y = 0; y < this.height; y += size) {
    for (let x = 0; x < this.width; x += size) {
        // Pixelverarbeitung mit zweidimensionalen Koordinaten (x, y)
        const pixel = Jimp.intToRGBA(this.image.getPixelColor(x, y));
        // Weitere Verarbeitung des Pixels...
    }
}
```


### Hinweis
- Dieses Skript unterstützt nur Bildformate, die von Jimp unterstützt werden.
- Die Qualität der ASCII-Kunst hängt von der Originalbildgröße und der gewählten Zellengröße ab.

### Lizenz
Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.

###### Copyright © 2024 zorazahro. Alle Rechte vorbehalten.