import React from "react";
import PropTypes from "prop-types";

import NumberFormat from "react-number-format";

import TextField from "@material-ui/core/TextField";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₹"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function PriceInputs(props) {
  const [values, setValues] = React.useState({
    textmask: "(1  )    -    ",
    numberformat: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <TextField
      label="Price"
      onChange={handleChange}
      fullWidth
      variant="outlined"
      name="price"
      inputRef={props.refprice({
        required: "Price Required.",
      })}
      error={Boolean(props.err.price)}
      helperText={props.err.price?.message}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}
