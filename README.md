# node-cerbere

> Client Node.js de Cerbere

## Installation

```shell
npm install cerbere
```

## Configuration

```js
var Cerbere = require('cerbere');
var cerbere = new Cerbere({ url: "https://authentification.din.developpement-durable.gouv.fr/cas/public" });
```

## Usage

### Sans librairie

```js
const config = {
  cerbereUrl:
    'https://authentification.din.developpement-durable.gouv.fr/cas/public',
  serviceUrl: 'https://my-app.tld/'
}

// le service :
// - instancie le client Cerbère
const cerbereClient = new Cerbere({ url: config.cerbereUrl })

// - génère l'URL sur laquelle l'utilisateur se connecte dans Cerbère
const loginUrl  = cerbereClient.login(config.serviceUrl);

// le service redirige l'utilisateur vers 'loginUrl`

// l'utilisateur s'authentifie dans Cerbère

// Cerbère redirige ensuite l'utilisateur vers `serviceUrl`

// le service :
// - récupère le ticket

// le client Cerbère :
// - vérifie si le ticket est valide
// - récupère les attributs de l'utilisateur
try {
  const resultat = await cerbereClient.validate(ticket)

  // l'utilisateur est authentifié et le service utilise ses attributs
  // `resultat.attributes`
} catch (err) {
  // l'authentification a échoué
  err.message = `Cerbère: echec de l'authentification ${err.message}`

  throw err
}
```

et logout:

```js
// - génère l'URL sur laquelle l'utilisateur sera déconnecté dans Cerbère
const logoutUrl  = cerbereClient.logout(config.serviceUrl, true);
```

### Avec [passport](https://passportjs.org)

Utiliser la stratégie [passport-cerbere](https://github.com/MTES-MCT/passport-cerbere).

### Avec [express.js](http://expressjs.com/)

Il faut définir des routes d'authentification login:

```js
app.get("/login", function(req, res, next) {
    const ticket = req.query.ticket
    // login si pas de ticket
    // cerbere.login()
    // sinon validate
    cerbere.validate(req, res, function(err, status, username, extended) {
        if (err) {
          // Handle the error
          res.send({error: err});
        } else {
          // Log the user in
          res.send({status: status, username: username, attributes: extended.attributes});
        }
      });
});
```

et logout:

```js
app.get("/logout", function(req, res) {
  var returnURL = "http://127.0.0.1:3000/";
  req.logout();
  cerbere.logout(req, res, returnUrl, true);
});
```

## Tests

Exemple d'enveloppe SOAP (SAML 1.1) retournée par Cerbère après un `/samlValidate` dans [test/fixtures](test/fixtures). Les attributs de l'utilisateurs connecté commencent par `UTILISATEUR.` et ceux de son entreprise associée par `ENTREPRISE.`.

```shell
npm test
```
