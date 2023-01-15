/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Login Scenario', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
  });

  it('Input should apear', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('Input should have error', () => {
    cy.get('button').contains(/^Login$/).click();

    cy.contains('Email wajib diisi');
    cy.contains('Password wajib diisi');
  });

  it('Login with wrong email/password', () => {
    cy.get('input[type="email"]').type('namaku@mail.com');
    cy.get('input[type="password"]').type('adminaja12345');
    cy.get('button').contains(/^Login$/).click().then(async () => {
      cy.on('window:alert', (text) => {
        expect(text).to.eq('email or password is wrong');
      });
    });
  });

  it('Login success', () => {
    cy.get('input[type="email"]').type('namaku@mail.com');
    cy.get('input[type="password"]').type('adminaja');
    cy.get('button').contains(/^Login$/).click().then(async () => {
      cy.url().should('eq', 'http://localhost:3000/thread');
      cy.contains('Leaderboard');
      cy.contains('Tambah Diskusi');
      cy.wait(1000);
      cy.get('[data-testid="logout-button"]').click();
    });
  });
});
