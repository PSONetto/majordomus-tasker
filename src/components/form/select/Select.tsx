import { Controller } from 'react-hook-form';

import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

import { ISelectProps } from '../interfaces';

export default function MTSelect({
  control,
  name,
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
}: ISelectProps) {
  return (
    <Controller
      name={name ?? ''}
      control={control}
      rules={{ ...rules, required }}
      render={({ field, fieldState }) => (
        <>
          <span className={`col-12 md:col-${cols}`}>
            <label htmlFor={field.name} className="mb-1 ml-1">
              {label}&nbsp;
              {required && (
                <span className="vertical-align-top text-red-600 text-sm">
                  *
                </span>
              )}
            </label>

            <Dropdown
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
            />
          </span>
        </>
      )}
    />
  );
}
