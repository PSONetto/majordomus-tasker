import { Controller } from 'react-hook-form';

import { RadioButton } from 'primereact/radiobutton';

import { IRadioButtonProps } from '../interfaces';
import Label from '../label/Label';

export default function MTRadioButton({
  control,
  name,
  cols = 12,
  label,
  options,
  selectedOption,
  setSelectedOption,
  required = false,
}: IRadioButtonProps) {
  return (
    <span className={`col-12 md:col-${cols}`}>
      <Controller
        name={name ?? ''}
        control={control}
        render={({ field }) => (
          <>
            <Label required={required} label={label} name={name} />
            {options.map((option) => {
              const key = option.label + '_' + option.value;

              return (
                <div key={key} className="flex align-items-center">
                  <RadioButton
                    inputId={key}
                    name="option"
                    value={option}
                    onChange={(e) => {
                      const optionValue = e.target.value.value;

                      setSelectedOption(optionValue);
                      field.onChange(optionValue);
                    }}
                    checked={selectedOption === option.value}
                  />
                  <label htmlFor={key} className="ml-2">
                    {option.label}
                  </label>
                </div>
              );
            })}
          </>
        )}
      />
    </span>
  );
}
