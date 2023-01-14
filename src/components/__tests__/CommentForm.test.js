/* eslint-disable linebreak-style */
import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { CommentForm } from 'components';
import { Provider } from 'react-redux';
import { store } from 'utilities';
import userEvent from '@testing-library/user-event';

test('Render Not FOund Page', () => {
  render(<Provider store={store}><CommentForm /></Provider>);
  expect(screen.getByText('Email address')).toBeInTheDocument();
});

test('On Submit Event', async () => {
  render(<Provider store={store}><CommentForm /></Provider>);
  const user = userEvent.setup();
  const textArea = screen.getByPlaceholderText('Tuliskan isi komentarmu disini');

  await user.type(textArea, 'Wah thread yang menarik gan');

  await user.click(screen.getByRole('button', { name: /Tambah/i }));

  await waitFor(() => {
    expect(textArea.value).toBe('Wah thread yang menarik gan');
  });
});
