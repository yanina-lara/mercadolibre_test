import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from "./searchInput";
import { MemoryRouter } from 'react-router-dom';

describe('Test de SearchInput', () => {
  it('Display component', () => {
    const {baseElement: searchInputComponent} = render(<SearchInput/>, {wrapper: MemoryRouter});
    expect(searchInputComponent).toMatchSnapshot();
    fireEvent.submit(screen.getByTestId('search-form'));
    fireEvent.change(screen.getByTestId('search-input'), {target:{value:'test'}});
  });
  it('Display component 2', () => {
    const {baseElement: searchInputComponent} = render(<SearchInput searchValueDefault="test"/>, {wrapper: MemoryRouter});
    expect(searchInputComponent).toMatchSnapshot();
    fireEvent.submit(screen.getByTestId('search-form'));
  });
});
