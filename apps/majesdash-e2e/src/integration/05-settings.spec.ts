describe('Admin Settings', () => {
  beforeEach(() => {
    cy.request('POST', '/api/users/login', {
      user: {
        username: 'testuser',
        password: 'testuser1',
      },
    }).then((res) => {
      cy.setLocalStorage('token', res.body.user.token);
    });
    cy.visit('/');
  });

  it('should navigate to settings screen and upload a system background picture', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/settings"]').click();
    cy.get('[data-cy="system-settings-form"]').as('system-settings');
    cy.get('@system-settings')
      .get('.input-file')
      .eq(1)
      .attachFile('system-background.jpg');
    cy.get('button[data-cy="save-system-background-button"]').click();
  });

  it('should navigate to settings screen and upload a user background picture', () => {
    cy.get('[data-cy="user-menu"]').click();
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
