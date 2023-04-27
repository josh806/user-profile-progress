describe('API request returns array', () => {
  it('Get 200 status', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('api_url'),
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');

      const responseBody = JSON.parse(response.body);
      expect(responseBody).to.be.instanceOf(Array);
    });
  });
});
