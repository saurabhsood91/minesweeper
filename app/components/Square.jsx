import React from 'react';

class Square extends React.Component {
    renderMine() {
        let {hasMine} = this.props;
        if(hasMine) {
            return "MINE";
        }
    }

    render() {
        return (
            <div className="square align-left">
                {this.renderMine()}
            </div>
        );
    }
}

export default Square;