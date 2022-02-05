describe('Setup', () => {
  it('should show setup form and create a new user', () => {
    cy.visit('/');
    cy.get('[data-cy="setup"]', { includeShadowDom: true }).should(
      'contain',
      'Setup'
    );

    cy.get('[data-cy="setup-form"').as('setup-form');
    cy.get('@setup-form')
      .get('input[formcontrolname="username"')
      .type('testuser');
    cy.get('@setup-form')
      .get('input[formcontrolname="email"')
      .type('test@test.de');
    cy.get('@setup-form')
      .get('input[formcontrolname="password"')
      .type('testuser');
    cy.get('@setup-form')
      .get('input[formcontrolname="passwordRepeat"')
      .type('testuser');
    cy.get('@setup-form').get('button').eq(1).click();
  });
});
