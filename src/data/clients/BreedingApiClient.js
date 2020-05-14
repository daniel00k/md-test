class BreedingApiClient {
    async findAll() {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        return data;
    }

    async findByBreed(breedName) {
        const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);//https://dog.ceo/api/breed/australian/shepherd/images/random
        const data = await response.json();
        return data;
    }
}
export default BreedingApiClient;