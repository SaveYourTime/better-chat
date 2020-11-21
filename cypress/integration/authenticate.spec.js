/* eslint-disable no-shadow */
/// <reference types="cypress" />

describe('Authenticate', () => {
  it('[LOGIN] login through Google', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    const loginUrl = Cypress.env('loginUrl');
    const cookieName = Cypress.env('cookieName');
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      preLoginSelector: '[data-testid="auth"]',
      loginSelector: 'button[data-provider-id="google.com"]',
      postLoginSelector: '[data-testid="chatroom"]',
      isPopup: true,
      popupDelay: 3000, // if test failed, try to set the delay more longer
    };

    return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
      cy.clearCookies();

      const cookie = cookies.filter((cookie) => cookie.name === cookieName).pop();
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        });

        Cypress.Cookies.defaults({
          preserve: cookieName,
        });
      }
    });
  });
});
