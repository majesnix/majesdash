describe('Admin user list', () => {
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

  it('should navigate to user list and show one user which cant be deleted', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/users"]').click();
    cy.get('[data-cy="user-list"]').should('contain', 'testuser');
    cy.get('[data-cy="user-list-delete"]').should('have.length', 0);
  });

  it('should navigate to user list screen and create a user', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/users"]').click();
    cy.get('[data-cy="user-list-create"]').click();
    cy.get('[data-cy="user-create-form"]').as('user-create-form');
    cy.get('@user-create-form')
      .get('input[formcontrolname="username"]')
      .type('testuser2');
    cy.get('@user-create-form')
      .get('input[formcontrolname="email"]')
      .type('test@test2.de');
    cy.get('@user-create-form')
      .get('input[formcontrolname="password"]')
      .type('testuser');
    cy.get('@user-create-form')
      .get('input[formcontrolname="passwordRepeat"]')
      .type('testuser');
    cy.get('@user-create-form')
      .get('[data-cy="user-create-form-submit"]')
      .click();
    cy.get('[data-cy="user-list"]').should('contain', 'testuser2');
  });

  it('should navigate to user list screen and create and delete a user', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/users"]').click();
    cy.get('[data-cy="user-list-create"]').click();
    cy.get('[data-cy="user-create-form"]').as('user-create-form');
    cy.get('@user-create-form')
      .get('input[formcontrolname="username"]')
      .type('testuser3');
    cy.get('@user-create-form')
      .get('input[formcontrolname="email"]')
      .type('test@test3.de');
    cy.get('@user-create-form')
      .get('input[formcontrolname="password"]')
      .type('testuser');
    cy.get('@user-create-form')
      .get('input[formcontrolname="passwordRepeat"]')
      .type('testuser');
    cy.get('@user-create-form')
      .get('[data-cy="user-create-form-submit"]')
      .click();
    cy.get('[data-cy="user-list"]').should('contain', 'testuser3');
    cy.get('[data-cy="user-list-delete"]').eq(1).click();
    cy.get('[data-cy="user-list"]').should('not.contain', 'testuser3');
  });

  it('should navigate to user list screen and update a user', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/users"]').click();
    cy.get('[data-cy="user-list"]').find('tr').eq(2);
    cy.get('[data-cy="user-list-edit"]').eq(1).click();
    cy.get('[data-cy="user-edit-form"]')
      .get('input[formcontrolname="username"]')
      .clear()
      .type('testuserupdate');
    cy.get('[data-cy="user-edit-form"]')
      .get('input[formcontrolname="email"]')
      .clear()
      .type('test@testupdate.de');
    cy.get('[data-cy="user-edit-form"]')
      .get('[data-cy="user-edit-form-update"]')
      .click();
    cy.get('[data-cy="user-list"]').should('contain', 'testuserupdate');
    cy.get('[data-cy="user-list"]').should('contain', 'test@testupdate.de');
  });

  it('reset a users password', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/users"]').click();
    cy.get('[data-cy="user-list"]')
      .find('tr')
      .eq(2)
      .get('button')
      .eq(1)
      .click();
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('[data-cy="user-edit-form-reset-password"]')
      .contains('Reset Password')
      .click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('New password:');
    });
  });

  it('should navigate to user list screen and delete a user directly from user-list', () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/users"]').click();
    cy.get('[data-cy="user-list-delete"]').click();
    cy.get('[data-cy="user-list"]').find('tr').should('have.length', 2);
    cy.get('[data-cy="user-list"]').should('contain', 'testuser');
  });
});
