import { Controller } from 'react-hook-form';

import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { IInputTextProps } from '../interfaces';
import Label from '../label/Label';

export default function MTInputText({
  control,
  name,
  defaultValue = '',
  rules,
  cols = 12,
  label,
  mask,
  placeholder,
  keyfilter,
  required = false,
  disabled,
  autoFocus = false,
  onBlur,
}: IInputTextProps) {
  return (
    <span className={`col-12 md:col-${cols} mt-2`}>
      <Controller
        name={name ?? ''}
        control={control}
        rules={rules}
        render={({ field, fieldState }) =>
          mask ? (
            <div className="p-float-label">
              <Label
                label={label ?? ''}
                name={name ?? ''}
                required={required}
              />
              <InputMask
                id={name}
                name={name}
                value={field.value ?? defaultValue}
                className={classNames('w-full', {
                  'p-invalid': fieldState.error,
                })}
                onChange={(e) => field.onChange(e.target.value)}
                mask={mask}
                placeholder={placeholder}
                keyfilter={keyfilter}
                required={required}
                onBlur={onBlur}
                disabled={disabled}
                autoFocus={autoFocus}
              />
            </div>
          ) : (
            <span className="p-float-label">
              <InputText
                id={name}
                name={name}
                value={field.value ?? defaultValue}
                className={classNames('w-full', {
                  'p-invalid': fieldState.error,
                })}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={placeholder}
                keyfilter={keyfilter}
                required={required}
                onBlur={onBlur}
                disabled={disabled}
                autoFocus={autoFocus}
              />
              <Label label={label} name={name} required={required} />
            </span>
          )
        }
      />
    </span>
  );
}
