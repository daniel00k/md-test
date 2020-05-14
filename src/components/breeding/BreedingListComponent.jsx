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
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                
                isMulti
                onChange={this.handleChange}
                options={this.props.breedingListOptions}
            />
            // <Select onChange={this.handleChange}>
            //     {
            //         this.props.breedingListOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
            //     }
            // </select>
        )
    }
}

BreedingListComponent.defaultProps = {
    breedingListOptions: []
};

BreedingListComponent.propTypes = {
    breedingListOptions: PropTypes.array.isRequired,
    onMultiselectChange: PropTypes.func.isRequired
};

export default BreedingListComponent;