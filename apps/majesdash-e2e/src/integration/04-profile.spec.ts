describe('Profile', () => {
  beforeEach(() => {
    cy.request('POST', '/api/users/login', {
      username: 'testuser',
      password: 'testuser',
    }).then((res) => {
      cy.setLocalStorage('token', res.body.token);
    });
    cy.visit('/');
  });

  it('should navigate to profile screen and upload a profile picture', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/profile"]').click();
    cy.get('.input-file').attachFile('tileicon.png');
    cy.get('button[data-cy="update-save-button"]').click();
    cy.get('[data-cy="profile-pic"]').should('have.attr', 'src');
  });

  it('should not be able to navigate to profile, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/profile');
    cy.url().should('include', '/login');
  });

  it('should change the password', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/profile"]').click();
    cy.get('input[type="password"]').eq(0).type('testuser1');
    cy.get('input[type="password"]').eq(1).type('testuser1');
    cy.get('button[data-cy="update-save-button"]').click();
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"]').type('test@test.de');
    cy.get('input[formcontrolname="password"]').type('testuser1');
    cy.get('[data-cy="login-form-submit-button"]').click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });
});
