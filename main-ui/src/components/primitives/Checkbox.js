import React from 'react';


class Checkbox extends React.Component {

    render() {
        const {isChecked, label} = this.props;

        return (
            <div>
                <input type="checkbox" checked={!!isChecked} onChange={() => this.props.onChange(!isChecked)}/>
                <span>{label}</span>
            </div>
        );
    }
}

export default Checkbox;