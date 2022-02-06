describe('Admin Settings', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"]').type('test@test.de');
    cy.get('input[formcontrolname="password"]').type('testuser1');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });

  it('should navigate to settings screen and upload a system background picture', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/settings"]').click();
    cy.get('[data-cy="system-settings-form"]').as('system-settings');
    cy.get('@system-settings')
      .get('.input-file')
      .eq(1)
      .attachFile('system-background.jpg');
    cy.get('button[data-cy="save-system-background-button"]').click();
  });

  it('should navigate to settings screen and upload a user background picture', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/settings"]').click();
    cy.get('[data-cy="user-settings-form"]').as('user-settings');
    cy.get('@user-settings')
      .get('.input-file')
      .eq(0)
      .attachFile('user-background.jpg');
    cy.get('button[data-cy="save-user-background-button"]').click();
  });

  it('should not be able to navigate to settings, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/settings');
    cy.url().should('include', '/login');
  });
});
