const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/app");

const restaurants = [
  {
    id: 1,
    name: "Dynabox",
    city: "Aurora",
    state: "Colorado",
    website:
      "http://goo.gl/morbi/vel/lectus.js?placerat=neque&ante=sapien&nulla=placerat&justo=ante&aliquam=nulla&quis=justo&turpis=aliquam&eget=quis&elit=turpis&sodales=eget&scelerisque=elit&mauris=sodales&sit=scelerisque&amet=mauris&eros=sit&suspendisse=amet&accumsan=eros&tortor=suspendisse&quis=accumsan&turpis=tortor&sed=quis&ante=turpis&vivamus=sed&tortor=ante&duis=vivamus&mattis=tortor&egestas=duis&metus=mattis&aenean=egestas&fermentum=metus&donec=aenean&ut=fermentum&mauris=donec&eget=ut&massa=mauris&tempor=eget&convallis=massa&nulla=tempor&neque=convallis&libero=nulla&convallis=neque",
    price: "$",
  },
  {
    id: 2,
    name: "Teklist",
    city: "Paterson",
    state: "New Jersey",
    website:
      "https://pagesperso-orange.fr/quis/tortor/id/nulla/ultrices/aliquet/maecenas.json?nibh=faucibus&ligula=orci&nec=luctus&sem=et&duis=ultrices&aliquam=posuere&convallis=cubilia&nunc=curae&proin=nulla&at=dapibus&turpis=dolor&a=vel&pede=est&posuere=donec&nonummy=odio&integer=justo&non=sollicitudin&velit=ut&donec=suscipit&diam=a&neque=feugiat&vestibulum=et&eget=eros&vulputate=vestibulum&ut=ac&ultrices=est&vel=lacinia&augue=nisi&vestibulum=venenatis&ante=tristique&ipsum=fusce&primis=congue&in=diam&faucibus=id&orci=ornare&luctus=imperdiet&et=sapien&ultrices=urna&posuere=pretium&cubilia=nisl&curae=ut&donec=volutpat&pharetra=sapien&magna=arcu&vestibulum=sed&aliquet=augue&ultrices=aliquam&erat=erat&tortor=volutpat&sollicitudin=in&mi=congue&sit=etiam&amet=justo&lobortis=etiam&sapien=pretium&sapien=iaculis&non=justo&mi=in&integer=hac&ac=habitasse&neque=platea&duis=dictumst&bibendum=etiam&morbi=faucibus&non=cursus&quam=urna&nec=ut&dui=tellus&luctus=nulla&rutrum=ut&nulla=erat&tellus=id&in=mauris&sagittis=vulputate&dui=elementum&vel=nullam&nisl=varius",
    price: "$$",
  },
  {
    id: 3,
    name: "Oyope",
    city: "Hartford",
    state: "Connecticut",
    website:
      "https://multiply.com/condimentum/neque/sapien/placerat/ante.xml?sapien=a&sapien=odio&non=in&mi=hac&integer=habitasse&ac=platea&neque=dictumst&duis=maecenas&bibendum=ut&morbi=massa&non=quis&quam=augue&nec=luctus&dui=tincidunt&luctus=nulla&rutrum=mollis&nulla=molestie&tellus=lorem&in=quisque&sagittis=ut&dui=erat&vel=curabitur&nisl=gravida&duis=nisi&ac=at&nibh=nibh&fusce=in&lacus=hac&purus=habitasse&aliquet=platea&at=dictumst&feugiat=aliquam&non=augue&pretium=quam&quis=sollicitudin&lectus=vitae&suspendisse=consectetuer&potenti=eget&in=rutrum&eleifend=at&quam=lorem&a=integer&odio=tincidunt&in=ante&hac=vel&habitasse=ipsum&platea=praesent&dictumst=blandit&maecenas=lacinia&ut=erat&massa=vestibulum&quis=sed&augue=magna&luctus=at&tincidunt=nunc&nulla=commodo&mollis=placerat&molestie=praesent&lorem=blandit&quisque=nam&ut=nulla&erat=integer&curabitur=pede&gravida=justo&nisi=lacinia&at=eget&nibh=tincidunt&in=eget&hac=tempus&habitasse=vel&platea=pede&dictumst=morbi&aliquam=porttitor&augue=lorem&quam=id&sollicitudin=ligula&vitae=suspendisse&consectetuer=ornare&eget=consequat&rutrum=lectus&at=in&lorem=est&integer=risus&tincidunt=auctor&ante=sed&vel=tristique&ipsum=in&praesent=tempus&blandit=sit&lacinia=amet&erat=sem&vestibulum=fusce&sed=consequat&magna=nulla&at=nisl&nunc=nunc&commodo=nisl",
    price: "$$$$",
  },
];

const artists = [
  {
    id: 1,
    firstName: "Kahaleel",
    lastName: "Nitti",
    bandname: "Automated",
    bio: "Front-line multi-state contingency",
    recommendations: "Voolia",
    profilePicture: "https://www.fillmurray.com/200/300",
  },
  {
    id: 2,
    firstName: "Sean",
    lastName: "Halpeine",
    bandname: "contingency",
    bio: "Sharable intangible structure",
    recommendations: "Divavu",
    profilePicture: "https://www.fillmurray.com/200/301",
  },
  {
    id: 3,
    firstName: "Adriano",
    lastName: "Ferier",
    bandname: "Implemented",
    bio: "Synergistic multi-state function",
    recommendations: "Voolia",
    profilePicture: "https://www.fillmurray.com/200/302",
  },
];

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Here is the welcome page");
  });
});

describe("Artist Search", () => {
  it("GET /artists responds with 200 containing the artist array", () => {
    return supertest(app).get("/artists").expect(200, artists);
  });
});

describe("Profile", () => {
  it("GET /profile responds with 200 containing the loggedInUser", () => {
    return supertest(app).get("/profile").expect(200);
  });
});

describe("Profile/:id", () => {
  const profile = artists[0];
  it("GET /profile:id responds with 200 & the selected artist's profile", () => {
    return supertest(app).get(`/profile/${profile.id}).expect(200, profile`);
  });
});

describe("Search By City", () => {
  it("GET /searchcity responds with 200 containing the restaurant array", () => {
    return supertest(app).get("/searchcity").expect(200, restaurants);
  });
});

describe("Create My Profile", () => {
  it("POST /createprofile responds with 200 & the 'Create Profile' form", () => {
    return supertest(app).post("/createprofile").expect(200);
  });
});

describe("Edit My Profile", () => {
  it("POST /editprofile responds with 200 & the 'Edit Profile' form", () => {
    return supertest(app).patch("/editprofile").expect(200);
  });
});
