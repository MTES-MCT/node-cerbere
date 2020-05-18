const nock = require("nock");

const Cerbere = require("../lib/cerbere");

// on précise le port pour HTTPS
const base_url = "https://cerbere:443";
const service = "test_service";
const cerbere = new Cerbere({
  url: `${base_url}/cas/public`,
  service: service,
});

describe("Cerbere client", () => {
  test("login", () => {
    expect(cerbere.login(service)).toBe(
      "https://cerbere/cas/public/login?service=test_service"
    );
  });

  test("logout", () => {
    expect(cerbere.logout(service, false)).toBe(
      "https://cerbere/cas/public/logout?url=test_service"
    );
    expect(cerbere.logout(service, true)).toBe(
      "https://cerbere/cas/public/logout?service=test_service"
    );
  });

  test("validate", async () => {
    const ticket = "ST-0";

    nock(base_url)
      .post("/cas/public/samlValidate")
      .replyWithFile(200, __dirname + "/fixtures/soapenv.xml");

    const resultat = await cerbere.validate(ticket);

    expect(resultat.attributes["UTILISATEUR.MEL"]).toBe("Jean.Martin@ici.fr");
    expect(resultat.attributes["UTILISATEUR.PRENOM"]).toBe("Jean");
    expect(resultat.attributes["UTILISATEUR.NOM"]).toBe("MARTIN");
    expect(resultat.attributes["UTILISATEUR.CIVILITE"]).toBe("M");
    expect(resultat.attributes["UTILISATEUR.DESCRIPTION"]).toBe("responsable");
    expect(resultat.attributes["UTILISATEUR.TEL_FIXE"]).toBe("+33 000000");
    expect(resultat.attributes["ENTITE.UNITE"]).toBe("SG/SNUM/A/B/C");
    expect(resultat.attributes["ENTITE.SIREN"]).toBe(undefined);
    expect(resultat.attributes["UTILISATEUR.ADR_CODEPOSTAL"]).toBe(44000);
    expect(resultat.attributes["ROLES"]).toBe("AUTHENTIFICATION");
  });

  test("validate receives invalid xml and throws error", async () => {
    const ticket = "ST-0";

    nock(base_url)
      .post("/cas/public/samlValidate")
      .reply(200, { "UTILISATEUR.MEL": "Jean.Martin@ici.fr" });

    expect(cerbere.validate(ticket)).rejects.toMatchObject({
      message: /XML parse error/,
    });
  });
});
