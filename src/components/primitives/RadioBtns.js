import React from 'react';


class RadioBtns extends React.Component {

    getSizeRadioButtons(currValue, values, labelField, onChange) {
        return Object.keys(values).map((key) => {
            const value = values[key];
            return <td key={value[labelField] + "_td"}><input
                key={value[labelField] + "_radio"}
                type="radio"
                name={value[labelField]}
                onChange={() => onChange(value)}
                value={value}
                checked={currValue === value}/>{value[labelField]}</td>
        });
    }

    render() {
        const {value, values, labelField, onChange} = this.props;

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        {this.getSizeRadioButtons(value, values, labelField, onChange)}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RadioBtns;