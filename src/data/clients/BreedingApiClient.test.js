import BreedingApiClient from "./BreedingApiClient";

const unmockedFetch = global.fetch;
const apiClient = new BreedingApiClient();

afterAll(() => {
    global.fetch = unmockedFetch
})

test('Returns a json containing a message with the breeding list', async () => {
    global.fetch = () => Promise.resolve({
        json: () => {
            return {
                message: {
                    cairn: [],
                    hound: ["afghan", "basset", "blood", "english", "ibizan", "plott", "walker"],
                    spaniel: ["blenheim", "brittany", "cocker", "irish", "japanese", "sussex", "welsh"],
                    springer: ["english"],
                    stbernard: [],
                    terrier: ["american", "australian", "bedlington", "border", "dandie", "fox", "irish", "kerryblue", "lakeland", "norfolk", "norwich", "patterdale", "russell", "scottish", "sealyham", "silky", "tibetan", "toy", "westhighland", "wheaten", "yorkshire"],
                    vizsla: []
                },
                status: "success"
            }
        }
    })
    const json = await apiClient.findAll();
    expect(json.message.springer).toEqual(["english"]);
})

test('Returns an object containing the image for a breeding', async () => {
    global.fetch = () => Promise.resolve({
        json: () => {
            return {
                message: "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
                status: "success"
            }
        }
    })
    const json = await apiClient.findImageByBreed('')
    expect(json.message).toEqual("https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg");
})