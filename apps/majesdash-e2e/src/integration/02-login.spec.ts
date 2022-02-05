describe('Login with username or email and can logout', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.reload();
    cy.visit('/login');
  });

  it('should login with email', () => {
    cy.get('input[formcontrolname="emailOrUsername"]').type('test@test.de');
    cy.get('input[formcontrolname="password"]').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });

  it('should login with username', () => {
    cy.get('input[formcontrolname="emailOrUsername"]').type('testuser');
    cy.get('input[formcontrolname="password"]').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });

  it('should login and logout', () => {
    cy.get('input[formcontrolname="emailOrUsername"]').type('testuser');
    cy.get('input[formcontrolname="password"]').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
    cy.get('button').eq(0).click();
    cy.get('[data-cy="logout"]').click();
    cy.get('mat-toolbar').should('not.contain', 'testuser');
  });
});
