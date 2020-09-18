import React, {Component} from "react";

import './svg.css';


class SVG extends Component{
    state = {
        assetColor: "#000000"
    }

    constructor(props){
        super(props)
    }

    render(){
        return(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 5" shape-rendering="crispEdges">
                <rect fill={this.state.assetColor} x="1" y="0" width="1" height="1" />
                <rect fill={this.state.assetColor} x="2" y="0" width="1" height="1" />
                <rect fill={this.state.assetColor} x="3" y="0" width="1" height="1" />
                <rect fill={this.state.assetColor} x="4" y="0" width="1" height="1" />

                <rect fill={this.state.assetColor} x="0" y="1" width="1" height="1" />
                <rect fill={this.state.assetColor} x="1" y="1" width="1" height="1" />
                <rect fill={this.state.assetColor} x="2" y="1" width="1" height="1" />
                <rect fill={this.state.assetColor} x="3" y="1" width="1" height="1" />
                <rect fill={this.state.assetColor} x="5" y="1" width="1" height="1" />
                
                <rect fill={this.state.assetColor} x="0" y="2" width="1" height="1" />
                <rect fill={this.state.assetColor} x="1" y="2" width="1" height="1" />
                <rect fill={this.state.assetColor} x="2" y="2" width="1" height="1" />
                <rect fill={this.state.assetColor} x="3" y="2" width="1" height="1" />
                <rect fill={this.state.assetColor} x="4" y="2" width="1" height="1" />

                <rect fill={this.state.assetColor} x="0" y="3" width="1" height="1" />
                <rect fill={this.state.assetColor} x="1" y="3" width="1" height="1" />
                <rect fill={this.state.assetColor} x="2" y="3" width="1" height="1" />
                <rect fill={this.state.assetColor} x="3" y="3" width="1" height="1" />
                <rect fill={this.state.assetColor} x="5" y="3" width="1" height="1" />

                <rect fill={this.state.assetColor} x="1" y="4" width="1" height="1" />
                <rect fill={this.state.assetColor} x="2" y="4" width="1" height="1" />
                <rect fill={this.state.assetColor} x="3" y="4" width="1" height="1" />
                <rect fill={this.state.assetColor} x="4" y="4" width="1" height="1" />
            </svg>
        );
    }
}

export default SVG;