class BreedingRepository {

    constructor(breedingApiClient) {
        this.breedingApiClient = breedingApiClient;
    }

    getBreedingList() {
        return this.breedingApiClient.findAll()
    }
}
export default BreedingRepository;