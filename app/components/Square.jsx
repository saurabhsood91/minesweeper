import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        // Makes `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    renderMine() {
        let {hasMine} = this.props;
        if(hasMine) {
            return "MINE";
        }
    }

    handleClick() {
        let {row, column} = this.props;
        console.log('SQUARE clicked', row, column);
    }

    render() {
        return (
            <div className="square align-left" onClick={this.handleClick}>
                {this.renderMine()}
            </div>
        );
    }
}

export default Square;