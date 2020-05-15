import BreedingGalleryPresenter from './BreedingGalleryPresenter';
import BreedingRepository from '../data/repositories/BreedingRepository';
import Breeding from '../data/entities/Breeding';

jest.mock('../data/repositories/BreedingRepository', () => {
    return function () {
        return {
            getBreedingList: () => {
                return {
                    message: { african: [], australian: ['shepherd'] }
                }
            }
        };
    };
});

test("Returns a parsed list of the api response", async () => {
    const expected = [
        new Breeding("african", "african", []),
        new Breeding("australian", "australian", [new Breeding("shepherd", "australian/shepherd", [])])
    ]

    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, new BreedingRepository({}));
    const actual = await breedingGalleryPresenter.getList();
    expect(actual).toEqual(expected);

});

test('Filters a list and returns a simplified list with breeding options', () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const breedingList = [{
        value: "affenpinscher",
        label: "affenpinscher",
        selected: false
    },
    {
        value: "akita",
        label: "akita",
        selected: false
    },
    {
        value: "airedale",
        label: "airedale",
        selected: true
    }
    ]

    const actual = breedingGalleryPresenter.getSelectedBreedingList(breedingList);
    const expected = [{
        value: "airedale",
        label: "airedale",
        selected: true
    }];
    expect(actual).toEqual(expect.arrayContaining(expected));
});

test('Filters a list and returns a simplified list with subBreeding options', () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const subBreedingList = [{
        label: "spaniel",
        options: [{
            value: "spaniel/brittany",
            label: "brittany",
            selected: false
        },
        {
            value: "spaniel/cocker",
            label: "cocker",
            selected: true
        },
        {
            value: "spaniel/irish",
            label: "irish",
            selected: false
        },
        {
            value: "spaniel/japanese",
            label: "japanese",
            selected: true
        }
        ]
    }]

    const actual = breedingGalleryPresenter.getSelectedSubBreedingList(subBreedingList);
    const expected = [{
        value: "spaniel/cocker",
        label: "cocker",
        selected: true
    }, {
        value: "spaniel/japanese",
        label: "japanese",
        selected: true
    }];
    expect(actual).toEqual(expect.arrayContaining(expected));
});

test('Returns a list of names to make the request to an api', () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const breedingList = [{
        value: "affenpinscher",
        label: "affenpinscher",
        selected: false
    },
    {
        value: "akita",
        label: "akita",
        selected: true
    },
    {
        value: "airedale",
        label: "airedale",
        selected: true
    }
    ]
    const subBreedingList = [{
        label: "spaniel",
        options: [{
            value: "spaniel/brittany",
            label: "brittany",
            selected: false
        },
        {
            value: "spaniel/cocker",
            label: "cocker",
            selected: true
        },
        {
            value: "spaniel/irish",
            label: "irish",
            selected: false
        }
        ]
    }]

    const actual = breedingGalleryPresenter.getFilteredListToRequest(breedingList, subBreedingList);
    const expected = ["akita", "airedale", "spaniel/cocker"];
    expect(actual).toEqual(expect.arrayContaining(expected));
});

test('Returns a list containing objects with the name of the breeding and its subBreedings ', () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const breedingList = [{
        name: "african",
        queryName: "african",
        subBreeding: []
    },
    {
        name: "spaniel",
        queryName: "spaniel",
        subBreeding: [{
            name: "blenheim",
            queryName: "spaniel/blenheim",
            subBreeding: []
        },
        {
            name: "irish",
            queryName: "spaniel/irish",
            subBreeding: []
        }
        ]
    }
    ]
    const breedingListName = ["african", "spaniel"]

    const actual = breedingGalleryPresenter.getUpdatedSubBreedingList(breedingList, breedingListName);
    const expected = [{
        name: "spaniel",
        subBreedings: [{
            name: "blenheim",
            queryName: "spaniel/blenheim",
            subBreeding: []
        },
        {
            name: "irish",
            queryName: "spaniel/irish",
            subBreeding: []
        }
        ]
    }];
    expect(actual).toEqual(expect.arrayContaining(expected));
});