import { Controller } from 'react-hook-form';

import { RadioButton } from 'primereact/radiobutton';

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
  defaultValue,
  disabled,
  required = false,
}: IRadioButtonProps) {
  return (
    <span className={`col-12 md:col-${cols}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          ...rules,
          required: { message: 'This field is required', value: required },
        }}
        render={({ field, fieldState }) => (
          <>
            <span>
              <Label required={required} label={label} name={name} />
              {options.map((option) => {
                const key = option.label + '_' + option.value;

                return (
                  <div key={key} className="flex align-items-center ml-2">
                    <RadioButton
                      inputId={key}
                      name="option"
                      value={option}
                      onChange={(e) => field.onChange(e.target.value.value)}
                      checked={field.value === option.value}
                      disabled={disabled}
                    />
                    <label htmlFor={key} className="ml-2">
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </span>
            {fieldState.error && <ErrorLabel fieldState={fieldState} />}
          </>
        )}
      />
    </span>
  );
}
