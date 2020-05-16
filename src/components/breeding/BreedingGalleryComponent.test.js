import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { waitForElement } from '@testing-library/dom'
import selectEvent from 'react-select-event'
import BreedingGalleryComponent from './BreedingGalleryComponent';

const {
    getByTestId,
    getByLabelText,
    getAllByRole,
    getByText
} = render(<BreedingGalleryComponent />);

test('Shows gallery after images are loaded', async () => {

    const elem = await waitForElement(() => getByTestId('dataloaded'));
    await selectEvent.select(getByLabelText('Seleccione una raza'), ['akita', 'australian']);
    await selectEvent.select(getByLabelText('Seleccione una sub raza'), ['shepherd']);
    fireEvent.click(getByText('Buscar'));
    const gallery = await waitForElement(() => getByTestId('imagesloaded'), { timeout: 10000 });
    const images = getAllByRole("img");
    const expectedNumberOfImages = 3;
    expect(images.length).toEqual(expectedNumberOfImages);
    cleanup();
})