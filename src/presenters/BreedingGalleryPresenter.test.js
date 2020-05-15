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
            },
            getImagesForBreedList: () => {
                return [
                    { message: "https://images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg", status: "success" },
                    { message: "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_3766.jpg", status: "success" }
                ]
            }
        }
    };
});

test("Returns a parsed list of images from the api response", async () => {
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
        selected: false
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
            selected: false
        },
        {
            value: "spaniel/blenheim",
            label: "blenheim",
            selected: true
        }
        ]
    }]
    const expected = ["https://images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg",
        "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_3766.jpg"
    ];

    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, new BreedingRepository({}));
    const actual = await breedingGalleryPresenter.getImagesForBreeding(breedingList, subBreedingList);
    expect(actual).toEqual(expected);

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

test('Returns a list containing only the breedings that have subBreedings ', () => {
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
    }]

    const breedingListName = ["african", "spaniel"]

    const actual = breedingGalleryPresenter.filterBreedingsWithoutSubBreedings(breedingList, breedingListName);
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

test("", () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const subBreedingList = [
        {
          "label": "hound",
          "options": [
            {
              "value": "hound/afghan",
              "label": "afghan",
              "selected": false
            },
            {
              "value": "hound/basset",
              "label": "basset",
              "selected": true
            },
            {
              "value": "hound/blood",
              "label": "blood",
              "selected": false
            },
            {
              "value": "hound/english",
              "label": "english",
              "selected": true
            },
            {
              "value": "hound/ibizan",
              "label": "ibizan",
              "selected": false
            },
            {
              "value": "hound/plott",
              "label": "plott",
              "selected": false
            },
            {
              "value": "hound/walker",
              "label": "walker",
              "selected": false
            }
          ]
        },
        {
          "label": "spaniel",
          "options": [
            {
              "value": "spaniel/blenheim",
              "label": "blenheim",
              "selected": true
            },
            {
              "value": "spaniel/brittany",
              "label": "brittany",
              "selected": false
            },
            {
              "value": "spaniel/cocker",
              "label": "cocker",
              "selected": false
            },
            {
              "value": "spaniel/irish",
              "label": "irish",
              "selected": false
            },
            {
              "value": "spaniel/japanese",
              "label": "japanese",
              "selected": false
            },
            {
              "value": "spaniel/sussex",
              "label": "sussex",
              "selected": false
            },
            {
              "value": "spaniel/welsh",
              "label": "welsh",
              "selected": false
            }
          ]
        }
      ]
    const breedingsWithSubBreedings = [
        {
          "name": "spaniel",
          "subBreedings": [
            {
              "name": "blenheim",
              "queryName": "spaniel/blenheim",
              "subBreeding": []
            },
            {
              "name": "brittany",
              "queryName": "spaniel/brittany",
              "subBreeding": []
            },
            {
              "name": "cocker",
              "queryName": "spaniel/cocker",
              "subBreeding": []
            },
            {
              "name": "irish",
              "queryName": "spaniel/irish",
              "subBreeding": []
            },
            {
              "name": "japanese",
              "queryName": "spaniel/japanese",
              "subBreeding": []
            },
            {
              "name": "sussex",
              "queryName": "spaniel/sussex",
              "subBreeding": []
            },
            {
              "name": "welsh",
              "queryName": "spaniel/welsh",
              "subBreeding": []
            }
          ]
        }
      ]
    const actual = breedingGalleryPresenter.getUpdatedSubBreedingList(subBreedingList, breedingsWithSubBreedings)

    const expected = [
        {
          "label": "spaniel",
          "options": [
            {
              "value": "spaniel/blenheim",
              "label": "blenheim",
              "selected": true
            },
            {
              "value": "spaniel/brittany",
              "label": "brittany",
              "selected": false
            },
            {
              "value": "spaniel/cocker",
              "label": "cocker",
              "selected": false
            },
            {
              "value": "spaniel/irish",
              "label": "irish",
              "selected": false
            },
            {
              "value": "spaniel/japanese",
              "label": "japanese",
              "selected": false
            },
            {
              "value": "spaniel/sussex",
              "label": "sussex",
              "selected": false
            },
            {
              "value": "spaniel/welsh",
              "label": "welsh",
              "selected": false
            }
          ]
        }
      ];
    expect(actual).toEqual(expected);
});

test("Returns an updated subBreeding list", () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const subBreedingList = [
        {
            label: "australian",
            options: [{ value: "australian/shepherd", label: "shepherd", selected: true }]
        }
    ]
    const breedingListName = ["australian/shepherd"]

    const actual = breedingGalleryPresenter.getSubBreedingListWithUpdatedSelectedValue(subBreedingList, breedingListName);
    const expected = [
        {
            label: "australian",
            options: [{ value: "australian/shepherd", label: "shepherd", selected: true }]
        }
    ];
    expect(actual).toEqual(expected);
});

//TODO: Check this implementation
test("Returns an updated breeding list", () => {
    const breedingGalleryPresenter = new BreedingGalleryPresenter({}, {});
    const breedingList = [{
        value: "affenpinscher",
        label: "affenpinscher",
        selected: true
    },
    {
        value: "australian",
        label: "australian",
        selected: true
    },
    {
        value: "airedale",
        label: "airedale",
        selected: false
    }]
    const breedingListName = ["affenpinscher", "australian"]

    const actual = breedingGalleryPresenter.getBreedingListWithUpdatedSelectedValue(breedingList, breedingListName);
    const expected = [{
        value: "affenpinscher",
        label: "affenpinscher",
        selected: true
    },
    {
        value: "australian",
        label: "australian",
        selected: true
    },
    {
        value: "airedale",
        label: "airedale",
        selected: false
    }]
    expect(actual).toEqual(expected);
})