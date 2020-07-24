import {Field} from "formik";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import StyledErrorMessage from "../../components/StyledErrorMessage/StyledErrorMessage";
import React from "react";

export const renderFields = fieldsArr => {
    return fieldsArr.map( ({ name, isDisabled, labelText, labelStyles, inputStyles, ...rest }) => (
        <Field key={name} name={name}>
            {
                fieldProps => (
                    <Label style={labelStyles}>
                        {labelText}
                        <Input style={inputStyles} {...rest} {...fieldProps} disabled={isDisabled}/>
                        {fieldProps.meta.touched && fieldProps.meta.error && <StyledErrorMessage style={{marginBottom: "20px"}} name={fieldProps.field.name}/>}
                    </Label>
                )
            }
        </Field>) );
}