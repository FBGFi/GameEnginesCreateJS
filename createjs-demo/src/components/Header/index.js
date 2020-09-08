import React, {Component} from "react";

import './Header.css';

const Button = (props) => {
    return(
        <button onClick={() => props.onClick(Math.floor(Math.random() * 100))} className="Button">Kasvata numeroa</button>
    );
}

class Header extends Component{
    state = {
        numero: 0
    }

    constructor(props){
        super(props)
        this.state.numero = props.muuttuja;
    }

    render(){
        return(
            <div className="Header">
                <div>{this.state.numero == 0 ? "Numero on nolla" : `Numero on ${this.state.numero}`}</div>
                <Button onClick={(numero) => {
                    this.setState({ ...this.state, ...{numero: this.state.numero + numero}});
                }} />
            </div>
        );
    }
}

export default Header;