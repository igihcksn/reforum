/* eslint-disable linebreak-style */
import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'utilities';
import userEvent from '@testing-library/user-event';
import Login from 'pages/Login';
import { MemoryRouter } from 'react-router';

test('Render login page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>,
  );
  const user = userEvent.setup();
  const email = screen.getByTestId('input-name');
  const password = screen.getByTestId('input-password');

  await user.type(email, 'admin@mail.com');
  await user.type(password, 'adminaja');

  await user.click(screen.getByRole('button', { name: /Login/i }));

  await waitFor(() => {
    expect(email.value).toBe('admin@mail.com');
    expect(password.value).toBe('adminaja');
  });
});
