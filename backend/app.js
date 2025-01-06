const express = require('express'); // Import Express
const bodyParser = require('body-parser'); 
// Importuje 'body-parser', który jest middlewarem do przetwarzania ciała żądania (request body). 
// Umożliwia łatwe parsowanie danych wysyłanych w żądaniu HTTP, takich jak dane w formacie JSON czy dane formularza.
const mongoose = require('mongoose');
//biblioteka pomagająca z obsługą mongodb

const app = express(); // Inicjalizacja aplikacji Express

mongoose.connect('mongodb+srv://admin:admin@cluster0.zlhit.mongodb.net/mean-course?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((error) => {
        console.log('Connection failed due to ' + error);
    })
//połączenie z bazą danych wykorzystując link podany na mongodb atlas

app.use(bodyParser.json()); 
// Rejestruje middleware do parsowania ciała żądania w formacie JSON. 
// Jeśli serwer otrzyma żądanie z ciałem w formacie JSON, body-parser automatycznie przekształci to w obiekt JavaScript, który będzie dostępny w 'req.body'.

app.use(bodyParser.urlencoded({ extended: false })); 
// Rejestruje middleware do parsowania danych formularza z zakodowaniem URL-encoded. 
// Opcja 'extended: false' oznacza, że nie można przesyłać złożonych obiektów (tylko zwykłe obiekty, jak stringi lub tablice), 
// co jest prostsze i często wystarczające dla większości formularzy HTML.

app.use((req, res, next) => {
    // Pozwala wszystkim domenom (originom) na dostęp do zasobów serwera
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Pozwala na używanie określonych nagłówków w żądaniach do serwera
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    
    // Pozwala na używanie określonych metod HTTP (GET, POST, PATCH, DELETE, OPTIONS)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    
    // Przekazuje sterowanie do następnego middleware'a lub obsługi żądania
    next();
});

module.exports = app; // Eksport aplikacji Express, by móc jej użyć w pliku głównym (server.js).