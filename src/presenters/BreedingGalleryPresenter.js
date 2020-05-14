import Breeding from '../data/entities/Breeding';

class BreedingGalleryPresenter {
    constructor(breedingApiClient, breedingRepository) {
        this.breedingApiClient = breedingApiClient;
        this.breedingRepository = breedingRepository;
    }

    async getList() {
        const rawList = await this.breedingRepository.getBreedingList();
        return Object.keys(rawList.message).map(
            name => new Breeding(name, name, rawList.message[name].map(subBreedingName => new Breeding(subBreedingName, `${name}/${subBreedingName}`, []))));
    }

    async getImagesForBreeding(breedingList, subBreedingList) {
        const rawResponse = await this.breedingRepository.getImagesForBreedList(this.getFilteredListToRequest(breedingList, subBreedingList))
        return rawResponse.map(r=>r.message);
    }

    getSelectedBreedingList(breedingList) {
        return breedingList.reduce((accum, breeding) => {
            if (breeding.selected) {
                accum.push(breeding)
            }
            return accum;
        }, []);
    }

    getSelectedSubBreedingList(subBreedingList) {
        return subBreedingList.reduce((accum, element) => {
            element.options.map(subBreeding => {
                if (subBreeding.selected) {
                    accum.push(subBreeding)
                }
            })
            return accum;
        }, []);
    }

    // breedingList =[{ value: "african", label: "african", selected: true },
    // { value: "akita", label: "akita", selected: true },
    // ​{ value: "spaniel", label: "spaniel", selected: true }]    
    // subBreedingList =[{ value: "spaniel/cocker", label: "cocker", selected: true }]

    getFilteredListToRequest(breedingList, subBreedingList) {
        const breedingListName = this.getSelectedBreedingList(breedingList).map(b => b.value);
        const subBreedingListName = this.getSelectedSubBreedingList(subBreedingList).map(sb => sb.value);
        const itemsToRemove = subBreedingListName.map(sb => sb.split("/")[0]);
        return breedingListName.concat(subBreedingListName).filter(name => !itemsToRemove.includes(name))
    }

    getUpdatedSubBreedingList(breedingList, breedingListName) {
        return breedingListName.reduce((accum, name) => {
            const breeding = breedingList.filter(b => b.name === name)[0]
            let subBreedings = breeding.subBreeding;
            if (subBreedings.length !== 0) {
                accum.push({
                    name: name,
                    subBreedings: subBreedings.map(sb => sb)
                })
            }
            return accum;
        }, [])
    }
}
export default BreedingGalleryPresenter;