import React from "react";
import BreedingListComponent from "./breeding/BreedingListComponent";
import BreedingGalleryPresenter from "../presenters/BreedingGalleryPresenter";
import BreedingApiClient from "../data/clients/BreedingApiClient";
import BreedingRepository from "../data/repositories/BreedingRepository";

class BreedingGalleryComponent extends React.Component {
    state = {
        originalList: [],
        breedingList: [],
        subBreedingList: [],
        imageUrls: []
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
                breedingList: data.map(breeding => { return { value: breeding.name, label: breeding.name, selected: false } })
            })
        );
    }

    updateSelectedBreedingQueryList = (breedingListName) => {
        const newBreedingList = this.state.breedingList.map(breeding => {
            if (breedingListName.includes(breeding.value)) {
                breeding.selected = true;
            } else {
                breeding.selected = false;
            }
            return breeding;
        });
        const subList = this.presenter.getUpdatedSubBreedingList(this.state.originalList, breedingListName)
            .map(m => {
                const elementFromCurrentState = this.state.subBreedingList.filter(element => element.label === m.name)[0];
                if (elementFromCurrentState !== undefined) {
                    return elementFromCurrentState;
                }
                return {
                    label: m.name,
                    options: m.subBreedings.map(sb => {
                        return {
                            value: sb.queryName, label: sb.name, selected: false
                        }
                    }
                    )
                }
            });
        this.setState({
            breedingList: newBreedingList,
            subBreedingList: subList
        })
    }

    updateSelectedSubBreedingQueryList = (breedingListName) => {
        const newSubBreedingList = this.state.subBreedingList.reduce((accum, breeding) => {
            const updatedOptions = breeding.options.map(option => {
                if (breedingListName.includes(option.value)) {
                    option.selected = true;
                } else {
                    option.selected = false;
                }
                return option;
            });
            accum.push({ label: breeding.label, options: updatedOptions })
            return accum;
        }, []);

        this.setState({
            subBreedingList: newSubBreedingList
        })
    }

    getImages = () => {
        this.presenter
            .getImagesForBreeding(this.state.breedingList, this.state.subBreedingList)
            .then(data => this.setState({ imageUrls: data }))
    }

    render() {
        const selectedBreedingList = this.presenter.getSelectedBreedingList(this.state.breedingList);
        const selectedSubBreedingList = this.presenter.getSelectedSubBreedingList(this.state.subBreedingList);
        return (
            <div className="row">
                {/* Esto podria ir en su propio componente usando una prop para el label */}
                <div className="col-lg-6">
                    <div className="form-group">
                        <label htmlFor="">Seleccione Raza:</label>
                        <BreedingListComponent selectedValues={selectedBreedingList} onMultiselectChange={this.updateSelectedBreedingQueryList} breedingListOptions={this.state.breedingList} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label htmlFor="">Seleccione SubRaza:</label>
                        <BreedingListComponent selectedValues={selectedSubBreedingList} onMultiselectChange={this.updateSelectedSubBreedingQueryList} breedingListOptions={this.state.subBreedingList} />
                    </div>
                    {/* Esto podria ir en su propio componente */}
                    <button type="submit" onClick={this.getImages} className="btn btn-primary">Submit</button>
                </div>
                Galería:
                <div className="card-columns">
                    {this.state.imageUrls.map((url, index) => <div key={index}className="card"><img className="card-img" src={url} /></div>)}
                </div>
            </div>
        )
    }
}
export default BreedingGalleryComponent;