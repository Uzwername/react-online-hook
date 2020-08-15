const { idText } = require("typescript");

describe('GitHub demo page', () => {
    it('contains correct initial values', () => {
        cy.visit('.');

        cy.get('[data-cy=online-status-indicator]')
            .should('be.visible')
            .should('contain', 'Online');

        cy.get('[data-cy=isOnline-value]')
            .should('be.visible')
            .should('contain', 'true');

        cy.get('[data-cy=isAssumedStatus-value]')
            .should('be.visible')
            .should('contain', 'false');
    });

    it('reacts to offline event', () => {
        cy.window()
            .then(win => {
                win.dispatchEvent(new Event('offline'));
            });

        cy.get('[data-cy=online-status-indicator]')
            .should('be.visible')
            .should('contain', 'Offline');

        cy.get('[data-cy=isOnline-value]')
            .should('be.visible')
            .should('contain', 'false');

        cy.get('[data-cy=isAssumedStatus-value]')
            .should('be.visible')
            .should('contain', 'false');
    });

    it('reacts to online event', () => {
        cy.window()
            .then(win => {
                win.dispatchEvent(new Event('online'));
            });

        cy.get('[data-cy=online-status-indicator]')
            .should('be.visible')
            .should('contain', 'Online');

        cy.get('[data-cy=isOnline-value]')
            .should('be.visible')
            .should('contain', 'true');

        cy.get('[data-cy=isAssumedStatus-value]')
            .should('be.visible')
            .should('contain', 'false');
    });

    it('does not reacts to "duplicated" events', () => {
        cy.window()
            .then(win => {
                win.dispatchEvent(new Event('online'));
            });

        cy.get('[data-cy=online-status-indicator]')
            .should('be.visible')
            .should('contain', 'Online');

        cy.get('[data-cy=isOnline-value]')
            .should('be.visible')
            .should('contain', 'true');

        cy.get('[data-cy=isAssumedStatus-value]')
            .should('be.visible')
            .should('contain', 'false');
    });
});