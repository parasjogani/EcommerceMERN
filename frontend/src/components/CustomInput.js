import React from "react";

const CustomInput = (props) => {
    const { type, name, placeholder, classname, onChange, value } = props;
    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`form-control ${classname}`}
            />
        </div>
    );
};

export default CustomInput;