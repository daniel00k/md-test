import BreedingListPresenter from "./BreedingListPresenter";

test('returns a list of breeding names based on the values of the options', () => {
    const breedingListPresenter = new BreedingListPresenter();
    const selectedOptions = [{
            value: "affenpinscher",
            label: "affenpinscher",
            selected: true
        },
        {
            value: "akita",
            label: "akita",
            selected: true
        }
    ]

    const actual = breedingListPresenter.getSelectedValues(selectedOptions);
    const expected = ["affenpinscher", "akita"];
    expect(actual).toEqual(expect.arrayContaining(expected));
});