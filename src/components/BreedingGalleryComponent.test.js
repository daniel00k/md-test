import { render, fireEvent } from '@testing-library/react';
import { screen, waitForElement } from '@testing-library/dom'
import BreedingGalleryComponent from './BreedingGalleryComponent';
import React from 'react';

test('Shows Filtrar button after data is loaded', async() => {
    const {getByText, getByTestId, container} = render(<BreedingGalleryComponent />);
    const elem = await waitForElement(() => getByTestId('dataloaded'))
    expect(elem).toHaveTextContent('Filtrar');
})
