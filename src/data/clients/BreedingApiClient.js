import {DOG_API_LIST_ALL_URL, DOG_API_BASE_URL} from "../constants/Endpoints";
class BreedingApiClient {
    async findAll() {
        const response = await fetch(DOG_API_LIST_ALL_URL);
        const data = await response.json();
        return data;
    }

    async findImageByBreed(breedName) {
        const response = await fetch(`${DOG_API_BASE_URL}/breed/${breedName}/images/random`);
        const data = await response.json();
        return data;
    }

    async getImagesForBreeds(breedList) {
        const response = await Promise.all(breedList.map(this.findImageByBreed));
        return response;
    }
}
export default BreedingApiClient;