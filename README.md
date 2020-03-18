# node-cerbere

> Client Node.js de Cerbere

## Installation

```shell
npm install cerbere
```

## Configuration

```javascript
var Cerbere = require('cerbere');
var cerbere = new Cerbere({ url: "https://authentification.din.developpement-durable.gouv.fr/cas/public" });
```

## Usage

Soit avec [passport](https://passportjs.org) et la stratégie [passport-cerbere](https://github.com/MTES-MCT/passport-cerbere), voir l'[exemple](https://github.com/MTES-MCT/cerbere-nodejs).

Soit directement avec [express.js](http://expressjs.com/):

Il faut définir des routes d'authentification login:

```javascript
app.get("/login", function(req, res, next) {
    cerbere.authenticate(req, res, function(err, status, username, extended) {
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

```javascript
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
