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

## Tests

Exemple d'enveloppe SOAP (SAML 1.1) retournée par Cerbère après un `/samlValidate` dans [test/fixtures](test/fixtures). Les attributs de l'utilisateurs connecté commencent par `UTILISATEUR.` et ceux de son entreprise associée par `ENTREPRISE.`.

```shell
npm test
```
