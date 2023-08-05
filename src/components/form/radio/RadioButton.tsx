import { Controller } from 'react-hook-form';

import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';

import { IRadioButtonProps } from '../interfaces';
import ErrorLabel from '../label/ErrorLabel';
import Label from '../label/Label';

export default function MTRadioButton({
  control,
  name = '',
  cols = 12,
  label,
  options,
  rules,
  selectedOption,
  setSelectedOption,
  required = false,
}: IRadioButtonProps) {
  return (
    <span className={`col-12 md:col-${cols}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={selectedOption}
        rules={{
          ...rules,
          required: { message: 'This field is required', value: required },
        }}
        render={({ field, fieldState }) => (
          <>
            <Label required={required} label={label} name={name} />
            {options.map((option) => {
              const key = option.label + '_' + option.value;

              function handleChange(e: RadioButtonChangeEvent) {
                const optionValue = e.target.value.value;

                setSelectedOption(optionValue);
                field.onChange(optionValue);
              }

              return (
                <div key={key} className="flex align-items-center">
                  <RadioButton
                    inputId={key}
                    name="option"
                    value={option}
                    onChange={handleChange}
                    checked={selectedOption === option.value}
                  />
                  <label htmlFor={key} className="ml-2">
                    {option.label}
                  </label>
                </div>
              );
            })}
            {fieldState.error && <ErrorLabel fieldState={fieldState} />}
          </>
        )}
      />
    </span>
  );
}
