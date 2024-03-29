describe('Tags', () => {
  beforeEach(() => {
    cy.request('POST', '/api/users/login', {
      username: 'testuser',
      password: 'testuser',
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
    cy.get('.input-file').selectFile('src/fixtures/tileicon.png', {
      force: true,
    });
    cy.get('button[data-cy="tag-create-or-update"]').click();
    cy.get('majesdash-tag')
      .filter(':contains("testtag2")')
      .should('contain.html', 'img');
  });

  it('should update the first tag', () => {
    cy.get('[data-cy="tag-list-edit-button"]').eq(0).click();
    cy.get('input[formcontrolname="name"]').clear().type('testtagUpdate');
    cy.get('.input-file').selectFile('src/fixtures/tileicon.png', {
      force: true,
    });
    cy.get('button[data-cy="tag-create-or-update"]').click();
    cy.visit('/');
    cy.get('majesdash-tag')
      .filter(':contains("testtagUpdate")')
      .should('contain.html', 'img');
  });

  it('should assign a tag to a tile', () => {
    cy.visit('/#/tiles');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('[data-cy="tile-list-edit-button"]').eq(0).click();
    cy.get('[formcontrolname="tag"]').click();
    cy.contains('testtagUpdate').click();
    cy.get('button[data-cy="tile-create-or-update"]').click();
    cy.visit('/');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('.box').filter(':contains("testtagUpdate")').click({ force: true });
    cy.contains('testtile2');
  });

  it('should be able to navigate back with backspace', () => {
    cy.visit('/');
    cy.contains('testtagUpdate').click();
    cy.contains('testtile2');
    cy.get('.box').trigger('keyup', { key: 'backspace' });
    cy.contains('testtagUpdate');
  });

  it('should be able to navigate to a tag, when not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('.box').filter(':contains("testtagUpdate")').click({ force: true });
    cy.contains('testtile2');
  });

  it('should unassign a tag', () => {
    cy.visit('/#/tiles');
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
    cy.get('majesdash-tag').filter(':contains("testtagUpdate")');
  });

  it('should show hidden tiles only to logged in users', () => {
    cy.get('button[ng-reflect-router-link="/tags/create"]').click();
    cy.get('input[formcontrolname="name"]').type('hidden tag');
    cy.get('mat-checkbox[formcontrolname="hidden"]').find('input').click();
    cy.get('button[data-cy="tag-create-or-update"]').click();
    cy.get('majesdash-tag').should('contain', 'hidden tag');
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('majesdash-tag').should('not.contain', 'hidden tag');
  });

  it('should not be able to navigate to tags, when not logged in', () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.url().should('include', '/login');
  });
});
