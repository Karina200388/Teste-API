import { Given, Then, And, Before,When } from "cypress-cucumber-preprocessor/steps";

const url = "http://localhost:9090/";
var id;


Given(`Crio um usuario`, () => {
  
      cy.request({
        method: 'POST',
        url: url+"customer",
        form: false,
        body: {
          birthDate: '2022-08-20',
          lastName: 'Araujo',
          name: 'Karina',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
       id = response.body.id
     })

});

When(`Adiciono um cartao para o usuario`, () => {
  
      cy.request({
       method: 'POST',
       url: url+"card",
       form: false,
       body: {
         brand: "MASTER",
         customerId: id,
         cvc: "123",
         expirationMoth: 5,
         expirationYear: 2030,
         holderName: "Karina",
         number: "2111111111111111"
       },
     }).then((response) => {
       expect(response.status).to.eq(200);
    })
 
 });


 When(`valido que o usuario foi cadastrado com sucesso`, () => {
  

  cy.request(url+'/customer/Karina/Araujo')
  .then((response) => {
         expect(response.status).to.eq(200);
          expect(response.body).to.have.property('name').and.to.eq('Karina');
          expect(response.body).to.have.property('lastName').and.to.eq('Araujo');  
   })

});


And(`atualizo o usuario`, () => {
  
  cy.request({
    method: 'PUT',
    url: url+"/customer/"+id,
    form: false,
    body: {
      birthDate: "2022-01-01",
      lastName: "Araujo",
      name: "Karina"
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('birthDate').and.to.eq('2022-01-01');  
 })

});

Then(`deleto o cadastro`, () => {
  
  cy.request({
    method: 'DELETE',
    url: url+"/customer/"+id,
    form: false,
  }).then((response) => {
    expect(response.status).to.eq(204);
 })

});