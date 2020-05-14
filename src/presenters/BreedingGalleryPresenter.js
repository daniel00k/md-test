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