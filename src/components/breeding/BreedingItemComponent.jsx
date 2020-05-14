import React from "react";

class BreedingItemComponent extends React.Component {
    getClassForToggleState = () => {
        return this.props.active ? "active" : ""
    }

    render() {
        return (
            <div className={this.getClassForToggleState()}>
                <span id={this.props.breeding.queryName}>{this.props.breeding.name}</span>
            </div>
        )
    }
}
BreedingItemComponent.defaultProps = {
    active: false,
    breeding: {}
};

export default BreedingItemComponent;