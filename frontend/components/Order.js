import react, { Component } from "react";
import PropTypes from "prop-types";

export default class Order extends Component {
    render() {
        return (
            <p>{this.props.id}</p>
        )
    }

    static propTypes = {
        id: PropTypes.string.isRequired
    }
}