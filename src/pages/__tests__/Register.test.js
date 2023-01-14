/* eslint-disable linebreak-style */
import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'utilities';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Register from 'pages/Register';

test('Render register page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>,
  );
  const user = userEvent.setup();
  const email = screen.getByTestId('input-name');
  const password = screen.getByTestId('input-password');
  const passwordConfirm = screen.getByTestId('input-password-confirm');

  await user.type(email, 'admin@mail.com');
  await user.type(password, 'adminaja');
  await user.type(passwordConfirm, 'adminaja');

  await user.click(screen.getByRole('button', { name: /Register/i }));

  await waitFor(() => {
    expect(email.value).toBe('admin@mail.com');
    expect(password.value).toBe('adminaja');
    expect(passwordConfirm.value).toBe('adminaja');
  });
});
