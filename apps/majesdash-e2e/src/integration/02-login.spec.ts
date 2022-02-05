describe('Login with username or email', () => {
  it('should login with email', () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"').type('test@test.de');
    cy.get('input[formcontrolname="password"').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });

  it('should login with username', () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"').type('testuser');
    cy.get('input[formcontrolname="password"').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });
});
