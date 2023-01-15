/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Register Scenario', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });

  it('Input should appear', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
  });

  it('Input should have error', () => {
    cy.get('[data-testid="register-button"]').contains(/^Register$/).click();

    cy.contains('Nama wajib diisi');
    cy.contains('Email wajib diisi');
    cy.contains('Password wajib diisi');
  });

  it('Register with password and confirm password not equal', () => {
    const UniqueNumber = `${Math.floor(Math.random() * 10000000000000)}`;

    cy.get('input[type="text"]').type(`namaku${UniqueNumber}`);
    cy.get('input[type="email"]').type(`namaku${UniqueNumber}@mail.com`);
    cy.get('[data-testid="input-password"]').type('adminaja12345');
    cy.get('[data-testid="input-password-confirm"]').type('adminaja1234567');
    cy.wait(500);
    cy.contains('Password belum sama');
  });

  it('Register success', () => {
    const UniqueNumber = `${Math.floor(Math.random() * 10000000000000)}`;

    cy.get('input[type="text"]').type(`namaku${UniqueNumber}`);
    cy.get('input[type="email"]').type(`namaku${UniqueNumber}@mail.com`);
    cy.get('[data-testid="input-password"]').type('adminaja12345');
    cy.get('[data-testid="input-password-confirm"]').type('adminaja12345');
    cy.get('[data-testid="register-button"]').contains(/^Register$/).click().then(async () => {
      cy.url().should('eq', 'http://localhost:3000/login');
      cy.get('input[type="email"]').type(`namaku${UniqueNumber}@mail.com`);
      cy.get('input[type="password"]').type('adminaja12345');
      cy.get('button').contains(/^Login$/).click().then(async () => {
        cy.url().should('eq', 'http://localhost:3000/thread');
        cy.contains('Leaderboard');
        cy.contains('Tambah Diskusi');
        cy.wait(1000);
        cy.get('[data-testid="logout-button"]').click();
      });
    });
  });
});
