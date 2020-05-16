import React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import BreedingListPresenter from '../../presenters/BreedingListPresenter';

const animatedComponents = makeAnimated();

class BreedingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.breedingListPresenter = new BreedingListPresenter();
    }

    handleChange = (e) => {
        this.props.onMultiselectChange(this.breedingListPresenter.getSelectedValues(e))
    }

    render() {
        return (
            <div>
                <label className="d-none" htmlFor={this.props.inputId}>{this.props.selectMessage}</label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    value={this.props.selectedValues}
                    placeholder={this.props.selectMessage}
                    name={this.props.inputId}
                    inputId={this.props.inputId}
                    noOptionsMessage={() => { return "No hay opciones" }}
                    isMulti
                    onChange={this.handleChange}
                    options={this.props.breedingListOptions}
                />
            </div>
        )
    }
}

BreedingListComponent.defaultProps = {
    breedingListOptions: [],
    selectMessage: "Seleccione una opción",
    inputId: "breedingListSelect"
};

BreedingListComponent.propTypes = {
    breedingListOptions: PropTypes.array.isRequired,
    onMultiselectChange: PropTypes.func.isRequired
};

export default BreedingListComponent;