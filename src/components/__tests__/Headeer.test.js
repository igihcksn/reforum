/* eslint-disable linebreak-style */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from 'components';

test('Render Not FOund Page', () => {
  render(<Header />);
  expect(screen.getByText('Berforum Bersama dan Berkarya Ceria')).toBeInTheDocument();
});
