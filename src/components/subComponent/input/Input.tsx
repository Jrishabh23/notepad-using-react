import PropsTypes from "prop-types";
import { memo } from "react";
import Validators from "../../../utility/validations";
import "./Input.css";
const Input = (props: any) => {
    const { name, placeHolder, type, label, handleEvent, errorMessage, value } =
        props;
    return (
        <div className="form-control-group">
            <label>{label}</label>
            <div>
                <input
                    type={type}
                    placeholder={placeHolder}
                    name={name}
                    onChange={handleEvent}
                    pattern={Validators[name]}
                    className="form-control"
                    value={value}
                />
                <p className="error">{errorMessage}</p>
            </div>
        </div>
    );
};

Input.defaultProps = {
    placeHolder: "",
    label: "",
    type: "text",
    name: "name",
    handleEvent: (e: any) => console.log(e.target.value),
    errorMessage: "",
    value: "",
};

Input.prototype = {
    name: PropsTypes.string,
    label: PropsTypes.string,
    type: PropsTypes.string,
    handleEvent: PropsTypes.func,
    placeHolder: PropsTypes.string,
    errorMessage: PropsTypes.string,
    value: PropsTypes.string,
};

export default memo(Input);
