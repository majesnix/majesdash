describe('Tiles', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('input[formcontrolname="emailOrUsername"]').type('test@test.de');
    cy.get('input[formcontrolname="password"]').type('testuser');
    cy.get('button').eq(1).click();
    cy.get('mat-toolbar').should('contain', 'testuser');
  });

  it('should navigate to the tile creation screen and create a tile', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/tiles"]').click();
    cy.get('button[ng-reflect-router-link="/tiles/create"]').click();
    cy.get('input[formcontrolname="name"]').type('testtile');
    cy.get('input[formcontrolname="type"]').type('tile');
    cy.get('input[formcontrolname="url"]').type('https://google.de');
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.get('majesdash-tile').should('contain', 'testtile');
  });

  it('should navigate to the tile creation screen and create a second tile with an icon', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/tiles"]').click();
    cy.get('button[ng-reflect-router-link="/tiles/create"]').click();
    cy.get('input[formcontrolname="name"]').type('testtile2');
    cy.get('input[formcontrolname="type"]').type('testtile');
    cy.get('input[formcontrolname="url"]').type('https://google.de');
    cy.get('.input-file').attachFile('tileicon.png');
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.get('majesdash-tile').eq(1).should('contain', 'testtile2');
    cy.get('majesdash-tile')
      .eq(1)
      .should('contain', 'testtile2')
      .find('img')
      .should('be.visible');
  });

  it('should navigate to the tile list and delete the first tile', () => {
    cy.get('button').eq(0).click();
    cy.get('button[ng-reflect-router-link="/tiles"]').click();
    cy.get('button[color=red]').eq(0).click();
    cy.visit('/');
    cy.get('majesdash-tile').should('have.length', 1);
    cy.get('majesdash-tile')
      .eq(0)
      .should('contain', 'testtile2')
      .find('img')
      .should('be.visible');
  });

  it('should not be able to navigate to tiles, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/tiles');
    cy.url().should('include', '/login');
  });
});
