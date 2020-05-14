class BreedingRepository {

    constructor(breedingApiClient) {
        this.breedingApiClient = breedingApiClient;
    }

    getBreedingList() {
        return this.breedingApiClient.findAll()
    }

    getImagesForBreedList(breedNameList) {
        return this.breedingApiClient.getImagesForBreeds(breedNameList)
    }
}
export default BreedingRepository;