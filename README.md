# Frontend Development Opdracht 2

Voor de eindopdracht heb ik in AngularJS een webshop gemaakt met daarin een overzicht van producten, een detail pagina voor de producten en een shopping cart.

Deze opdracht bevat geen uitwerking voor login/registratie en betalingsproces.

In deze README staan korte beschrijvingen van alle bestanden. De code zelf bevat gedetailleerde comments om de functies uit te leggen.


### Controllers
-----------
De controllers halen data zoals producten en bestellingen op en geven deze data door aan de views.

__productsCtrl - ./controllers/products.js__

Haalt de producten op uit de database en zet deze in de product factory. Verder geeft de productsCtrl product informatie door aan de Cart factory wanneer de gebruiker deze heeft toegevoegt aan de shoppingcart.

__productCtrl - ./controllers/product.js__

Haalt een product op uit de database aan de hand van een ID in de URL. Verder regelt de productCtrl hetzelfde als de productsCtrl.

__cartCtrl - ./controllers/cart.js__

De cart controller haalt producten op uit de shoppingcart cookie en geeft deze door aan de cart view. Verder handelt de Cart controller de `+` en `-` buttons af en past direct het totaalbedrag in de cart aan.
Als de gebruiker is ingelogt kan deze ook een bestelling plaatsen met de 'Confirm order' button. De Cart controller geeft deze bestelling door aan de Cart factory.
Tot slot haalt de Cart controller alle voorgaande bestellingen op van de ingelogde gebruiker en geeft deze door aan de Cart view.

__loginCtrl - ./controllers/login.js__

De login controller probeert een gebruiker in te loggen door de username en password op te sturen naar de database. Als de gebruiker in de database bestaat wordt de gebruiker ingelogt via de Authentication service.
Verder kan kan er in een view gecontrolleerd worden of er een gebruiker is ingelogt met de method `isAuth();` Aan de hand hiervan kan ander HTML getoond worden.

Omdat ik geen login formulier heb verwerkt in de opdracht wordt er altijd ingelogt met 'roberthegeraad@gmail.com', deze user is ook direct een admin. Om in te loggen met een user zonder admin privileges kan de user in LoginCtrl verandert worden 'dannyhegeraad@gmail.com' gebruikt worden met hetzelfde wachtwoord.

### Views
-----
De views worden geladen in de ./index.html pagina. De routing voor de views wordt bepaald in ./app.js

__/products - ./views/products.html__

Bevat alle producten met een 'Add to cart' button. Wanneer je een product aan je shoppingcart toevoegt zal de shoppingcart in de header gelijk aangepast worden.
De producten in de cart worden opgeslagen in cookies, dit betekend dat je ook zonder in te loggen producten kan toevoegen aan je shoppingcart.

__/product - ./views/product.html__

Detail weergave van een product waarbij het product ook in de shoppingcart geplaatst kan worden.

__/cart - ./views/cart.html__

Bevat de shoppingcart. Bij elk product staan `+` en `-` knoppen. Hiermee kan je het aantal van dat product aanpassen.
Als je ingelogt bent kan je je bestelling afronden. Deze wordt dan opgeslagen voor de ingelogde user. Alle voorgaande bestellingen worden uitgelezen onder het winkelwagentje.

__/admin - ./views/adminpanel.html__

Deze view kan alleen bezocht worden wanneer de gebruiker is ingelogt als een Admin. De view ontvangt alle bestellingen via de Admin controller.


### Services
--------
Services zijn extra 'library' classes. Voor deze opdracht is er een Authentication service gebruikt. De Login controller gebruikt deze service om een gebruiker in te loggen.
De service kijkt of de gebruiker een normale user is of een admin en instantieert de juiste Factory met de gegevens van de opgehaalde gebruiker.


### Factories
---------
Factories dienen als models en worden gebruikt om producten, users/admins of de cart te instantieren. De factories geven extra functionaliteiten mee aan de opgehaalde data.

__User - ./factories/user.js__

De user factory is een wrapper class die de username en user ID teruggeeft.

__Admin - ./factories/admin.js__

De Admin factory erft de user factory via Prototypal Inheritance en voegt zelf de functie `isAdmin();` toe waarmee gecontrolleerd kan worden of de ingelogde gebruiker een Admin is.
Deze functie wordt aangeroepen door de `isAdmin();` functie van de LoginCtrl en kan gebruikt worden om andere HTML te laten zien aan de hand van de status.

__Cart - ./factories/cart.js__

De Cart factory voegt direct producten toe in de cart cookie of past de aantallen van een product aan. Daarnaast kan de Cart factory ook een bestelling plaatsen door de huidige cart cookie uit te lezen en deze op te sturen naar de database.
Tot slot heeft de Cart factory de `isEmpty();` functie waarmee ook weer aparte HTML getoond kan worden aan de hand van de status van de shoppingcart.

__Product - ./factories/product.js__

De Product factory is ook weer een wrapper class waarmee product informatie opgehaald kan worden. Deze wordt op het moment alleen gebruikt om de prijs van een product om te zetten naar twee decimalen.
