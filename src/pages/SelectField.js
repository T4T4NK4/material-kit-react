import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { SetFieldValueAction } from 'State/Hydration/actionsTypes';

function sortOptions(options) {
  const sortedOptions = [...options].sort();
  return sortedOptions;
}

const SelectField = ({
  className = '',
  fullWidth = false,
  id,
  label = undefined,
  value,
  variant,
  options,
  onChange,
  onBlur = undefined,
  error = false,
  helperText,
  multiple = false,
  sort = false,
  selectClassName = '',
  selectDisplayStyleProp = undefined,
  disabled,
  onOpen = undefined,
}) => {
  const [sortedOptions, setSortedOptions] = useState([]);

  useEffect(() => {
    if (options.length && sort) {
      setSortedOptions(sortOptions(options));
    }
  }, [options.length, sort, sortOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormControl fullWidth={fullWidth} className={className} variant={variant} error={error} disabled={disabled}>
      <InputLabel id={id}>{label}</InputLabel>

      <Select
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        onOpen={onOpen}
        multiple={multiple}
        className={selectClassName}
        SelectDisplayProps={{
          style: selectDisplayStyleProp,
        }}
      >
        {(sortedOptions.length ? sortedOptions : options).map((option, i) => (
          <MenuItem key={`${i}-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
