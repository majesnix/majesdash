describe('Tiles', () => {
  beforeEach(() => {
    cy.request('POST', '/api/users/login', {
      username: 'testuser',
      password: 'testuser',
    }).then((res) => {
      cy.setLocalStorage('token', res.body.token);
    });
    cy.visit('/');
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/tiles"]').click();
  });

  it('should create a tile', () => {
    cy.get('button[ng-reflect-router-link="/tiles/create"]').click();
    cy.get('input[formcontrolname="name"]').type('testtile');
    cy.get('input[formcontrolname="url"]').type('https://google.de');
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.get('majesdash-tile').should('contain', 'testtile');
  });

  it('should create a second tile with an icon', () => {
    cy.get('button[ng-reflect-router-link="/tiles/create"]').click();
    cy.get('input[formcontrolname="name"]').type('testtile2');
    cy.get('input[formcontrolname="url"]').type('https://google.de');
    cy.get('.input-file').selectFile('src/fixtures/tileicon.png', {
      force: true,
    });
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.get('majesdash-tile')
      .filter(':contains("testtile2")')
      .should('contain.html', 'img');
  });

  it('should update the first tile', () => {
    cy.get('[data-cy="tile-list-edit-button"]').eq(0).click();
    cy.get('input[formcontrolname="name"]').clear().type('testtileUpdate');
    cy.get('input[formcontrolname="url"]').clear().type('https://test.de');
    cy.get('.input-file').selectFile('src/fixtures/tileicon.png', {
      force: true,
    });
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.visit('/');
    cy.get('majesdash-tile')
      .filter(':contains("testtileUpdate")')
      .should('contain.html', 'img');
  });

  it('should delete the first tile', () => {
    cy.get('button[color=red]').eq(0).click();
    cy.visit('/');
    cy.get('majesdash-tile').should('have.length', 1);
    cy.get('majesdash-tile').eq(0).should('contain', 'testtile2');
  });

  it('should not be able to navigate to tiles, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/tiles');
    cy.url().should('include', '/login');
  });
});
