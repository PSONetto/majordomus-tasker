import { Controller } from 'react-hook-form';

import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';

import { IMultiSelectProps } from '../interfaces';
import ErrorLabel from '../label/ErrorLabel';
import Label from '../label/Label';

export default function MTMultiSelect({
  control,
  name = '',
  cols = 12,
  label,
  options,
  value,
  filter,
  disabled,
  rules,
  required = false,
  placeholder,
  loading,
  setValue,
}: IMultiSelectProps) {
  return (
    <span className={`col-12 md:col-${cols} mt-2`}>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          required: { message: 'This field is required', value: required },
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label">
              <MultiSelect
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  field.onChange(e.target.value);
                }}
                options={options}
                placeholder={placeholder}
                className={classNames('w-full', {
                  'p-invalid': fieldState.error,
                })}
                filter={filter}
                disabled={disabled || loading}
                showClear
                required={required}
                dropdownIcon={loading ? 'pi pi-spin pi-spinner' : undefined}
                display="chip"
              />
              <Label label={label} name={name} required={required} />
            </span>
            {fieldState.error && <ErrorLabel fieldState={fieldState} />}
          </>
        )}
      />
    </span>
  );
}
