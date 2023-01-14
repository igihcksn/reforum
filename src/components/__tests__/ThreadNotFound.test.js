/* eslint-disable linebreak-style */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThreadNotFound } from 'components';

test('Render Not FOund Page', () => {
  render(<ThreadNotFound />);
  expect(screen.getByText('Data tidak ditemukan')).toBeInTheDocument();
});
