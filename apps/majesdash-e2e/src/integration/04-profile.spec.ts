describe('Profile', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"]').type('test@test.de');
    cy.get('input[formcontrolname="password"]').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });

  it('should navigate to profile screen and upload a profile picture', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/profile"]').click();
    cy.get('.input-file').attachFile('tileicon.png');
    cy.get('button[data-cy="update-save-button"]').click();
  });

  it('should change the password', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/profile"]').click();
    cy.get('input[type="password"]').eq(0).type('testuser1');
    cy.get('input[type="password"]').eq(1).type('testuser1');
    cy.get('button[data-cy="update-save-button"]').click();
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"]').type('test@test.de');
    cy.get('input[formcontrolname="password"]').type('testuser1');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });
});
