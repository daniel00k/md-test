import React from "react";
import { Alert } from 'reactstrap';
import BreedingListComponent from "./BreedingListComponent";
import BreedingGalleryPresenter from "../../presenters/BreedingGalleryPresenter";
import BreedingApiClient from "../../data/clients/BreedingApiClient";
import BreedingRepository from "../../data/repositories/BreedingRepository";
import Logo from "../../assets/images/logo.svg"

const buttonDefaultText = "Buscar";
const buttonLoadingText = "Cargando...";

class BreedingGalleryComponent extends React.Component {
    state = {
        originalList: [],
        breedingList: [],
        subBreedingList: [],
        imageUrls: [],
        isLoadingData: true,
        isLoadingImages: false,
        showGallery: false
    }

    constructor(props) {
        super(props);
        const breedingApiClient = new BreedingApiClient();
        const breedingRepository = new BreedingRepository(breedingApiClient);
        this.presenter = new BreedingGalleryPresenter(breedingApiClient, breedingRepository);
    }

    componentDidMount() {
        this.presenter.getList().then(data =>
            this.setState({
                originalList: data,
                breedingList: data.map(breeding => { return { value: breeding.name, label: breeding.name, selected: false } }),
                isLoadingData: false
            })
        );
    }

    updateSelectedBreedingQueryList = (breedingListName) => {
        const newBreedingList = this.presenter.getBreedingListWithUpdatedSelectedValue(this.state.breedingList, breedingListName);
        const breedingsWithSubBreedings = this.presenter.filterBreedingsWithoutSubBreedings(this.state.originalList, breedingListName)
        const subList = this.presenter.getUpdatedSubBreedingList(this.state.subBreedingList, breedingsWithSubBreedings);
        this.setState({
            breedingList: newBreedingList,
            subBreedingList: subList
        })
    }

    updateSelectedSubBreedingQueryList = (breedingListName) => {
        const newSubBreedingList = this.presenter.getSubBreedingListWithUpdatedSelectedValue(this.state.subBreedingList, breedingListName);
        this.setState({
            subBreedingList: newSubBreedingList
        });
    }

    getImages = () => {
        this.setState({
            isLoadingImages: true
        })
        this.presenter
            .getImagesForBreeding(this.state.breedingList, this.state.subBreedingList)
            .then(data => this.setState({ imageUrls: data, showGallery: true, isLoadingImages: false }))
    }

    getFilterButton() {
        if (this.state.isLoadingData) {
            return (
                <div className="col-lg-2">
                </div>
            )
        } else {
            return (
                <div className="col-lg-2" data-testid="dataloaded">
                    <button type="submit" onClick={this.getImages} className="btn btn-primary">{this.state.isLoadingImages ? buttonLoadingText : buttonDefaultText}</button>
                </div>
            )
        }
    }

    getGallery() {
        if (this.state.showGallery) {
            if (this.state.imageUrls.length === 0) {
                return (
                    <div className="col-lg-12" data-testid="imagesloaded">
                        <Alert color="warning">
                            No se encontraron imágenes, intente con otros filtros.
                        </Alert>
                    </div>
                )
            }
            return (
                <div className="card-columns" data-testid="imagesloaded">
                    {this.state.imageUrls.map((url, index) => <div key={index} className="card"><img className="card-img" src={url} /></div>)}
                </div>
            )
        }
    }

    render() {
        const selectedBreedingList = this.presenter.getSelectedBreedingList(this.state.breedingList);
        const selectedSubBreedingList = this.presenter.getSelectedSubBreedingList(this.state.subBreedingList);
        return (
            <div className="container jumbotron jumbotron-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1>Dog API <img src={Logo} alt="" style={{ height: "50px" }} /></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="form-group" >
                            <BreedingListComponent inputId={"breedingSelect"} selectMessage={"Seleccione una raza"} selectedValues={selectedBreedingList} onMultiselectChange={this.updateSelectedBreedingQueryList} breedingListOptions={this.state.breedingList} />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="form-group">
                            <BreedingListComponent inputId={"subBreedingSelect"} selectMessage={"Seleccione una sub raza"} selectedValues={selectedSubBreedingList} onMultiselectChange={this.updateSelectedSubBreedingQueryList} breedingListOptions={this.state.subBreedingList} />
                        </div>
                    </div>
                    {this.getFilterButton()}
                </div>
                <div className="row-fluid">
                    {this.getGallery()}
                </div>
            </div>
        )
    }
}
export default BreedingGalleryComponent;