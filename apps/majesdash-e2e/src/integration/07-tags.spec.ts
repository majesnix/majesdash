describe('Tags', () => {
  beforeEach(() => {
    cy.request('POST', '/api/users/login', {
      username: 'testuser',
      password: 'testuser1',
    }).then((res) => {
      cy.setLocalStorage('token', res.body.token);
    });
    cy.visit('/');
    cy.get('[data-cy="user-menu"]').click();
    cy.get('button[ng-reflect-router-link="/tags"]').click();
  });

  it('should create a tag', () => {
    cy.get('button[ng-reflect-router-link="/tags/create"]').click();
    cy.get('input[formcontrolname="name"]').type('testtag');
    cy.get('button[data-cy="tag-create-or-update"]').click();
    cy.get('majesdash-tag').eq(0).should('contain', 'testtag');
  });

  it('should create a second tag with an icon', () => {
    cy.get('button[ng-reflect-router-link="/tags/create"]').click();
    cy.get('input[formcontrolname="name"]').type('testtag2');
    cy.get('.input-file').attachFile('tileicon.png');
    cy.get('button[data-cy="tag-create-or-update"]').click();
    cy.get('.box')
      .filter(':contains("testtag2")')
      .should('contain.html', 'img');
  });

  it('should update the first tag', () => {
    cy.get('[data-cy="tag-list-edit-button"]').eq(0).click();
    cy.get('input[formcontrolname="name"]').clear().type('testtagUpdate');
    cy.get('.input-file').attachFile('tileicon.png');
    cy.get('button[data-cy="tag-create-or-update"]').click();
    cy.get('.box')
      .filter(':contains("testtagUpdate")')
      .should('contain.html', 'img');
  });

  it('should assign a tag to a tile', () => {
    cy.visit('/tiles');
    cy.get('[data-cy="tile-list-edit-button"]').eq(0).click();
    cy.get('[formcontrolname="tag"]').click();
    cy.contains('testtagUpdate').click();
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.get('.box').filter(':contains("testtagUpdate")').click({ force: true });
    cy.contains('testtile2');
  });

  it('should unassign a tag', () => {
    cy.visit('/tiles');
    cy.get('[data-cy="tile-list-edit-button"]').eq(0).click();
    cy.get('[formcontrolname="tag"]').contains('testtagUpdate');
    cy.get('[formcontrolname="tag"]').click();
    cy.contains('None').click();
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.contains('testtile2');
  });

  it('should delete the second tag', () => {
    cy.get('button[color=red]').eq(1).click();
    cy.visit('/');
    cy.get('majesdash-tag').should('have.length', 1);
    cy.get('.box')
      .filter(':contains("testtagUpdate")')
      .should('contain.html', 'img');
  });

  it('should not be able to navigate to tags, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/tags');
    cy.url().should('include', '/login');
  });
});
