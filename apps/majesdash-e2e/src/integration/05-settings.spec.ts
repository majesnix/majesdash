describe('Admin Settings', () => {
  beforeEach(() => {
    cy.request('POST', '/api/users/login', {
      username: 'testuser',
      password: 'testuser1',
    }).then((res) => {
      cy.setLocalStorage('token', res.body.token);
    });
    cy.visit('/');
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/settings"]').click();
    cy.get('[data-cy="user-settings-form"]').as('user-settings');
    cy.get('[data-cy="user-settings-form"]').as('system-settings');
  });

  it('should upload a system background picture', () => {
    cy.get('@system-settings')
      .get('.input-file')
      .eq(1)
      .attachFile('system-background.jpg');
    cy.get('button[data-cy="save-system-settings-button"]').click();
  });

  it('should upload a user background picture', () => {
    cy.get('@user-settings')
      .get('.input-file')
      .eq(0)
      .attachFile('user-background.jpg');
    cy.get('button[data-cy="save-user-background-button"]').click();
  });

  it('should set weather widget api key and propagate correctly after reload', () => {
    cy.get('[data-cy="system-weatherWidget-apiKey"]').should('not.exist');
    cy.get('@system-settings')
      .get('mat-slide-toggle')
      .as('weatherWidgetToggle')
      .click()
      .get('mat-slide-toggle input')
      .should('be.checked');
    cy.get('[data-cy="system-weatherWidget-apiKey"]').should('be.visible');
    cy.get('[data-cy="system-weatherWidget-apiKey-input"]').type('abc');
    cy.get('[data-cy="system-weatherWidget-town-input"]').type('london,gb');
    cy.get('button[data-cy="save-system-settings-button"]').click();
    cy.reload().get('mat-slide-toggle input').should('be.checked');
    cy.get('[data-cy="system-weatherWidget-apiKey-input"]').should(
      'have.value',
      'abc'
    );
    cy.get('[data-cy="system-weatherWidget-town-input"]').should(
      'have.value',
      'london,gb'
    );
  });

  it('should not be able to navigate to settings, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/settings');
    cy.url().should('include', '/login');
  });
});
