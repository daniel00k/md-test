class BreedingApiClient {
    async findAll() {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        return data;
    }

    async findImageByBreed(breedName) {
        const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
        const data = await response.json();
        return data;
    }

    async getImagesForBreeds(breedList) {
        const response = await Promise.all(breedList.map(this.findImageByBreed));
        return response;
    }
}
export default BreedingApiClient;