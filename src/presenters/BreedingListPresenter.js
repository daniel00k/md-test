class BreedingListPresenter {
    getSelectedValues(selectedOptions) {
        if (selectedOptions === null) {
            return []
        };
        return selectedOptions.map(option => option.value);
    }
}
export default BreedingListPresenter;