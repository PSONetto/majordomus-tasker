import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';

import { ICalendar } from '../interfaces';
import ErrorLabel from '../label/ErrorLabel';
import Label from '../label/Label';

export default function MTCalendar({
  control,
  name = '',
  label,
  cols = 12,
  rules,
  required = false,
  minDate,
  maxDate,
  showTime,
  showOnFocus = true,
  defaultValue,
  disabled,
  onShow,
  onHide,
}: ICalendar) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <span className={`col-12 md:col-${cols} mt-2`}>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          required: { message: 'This field is required', value: required },
        }}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label">
              <Calendar
                showOnFocus={showOnFocus}
                className={classNames('w-full', {
                  'p-invalid': fieldState.error,
                })}
                showIcon
                onChange={(e) => field.onChange(e.value)}
                value={field.value}
                minDate={minDate}
                maxDate={maxDate}
                showTime={showTime}
                hourFormat={showTime ? '24' : undefined}
                touchUI={windowSize.current[0] <= 576}
                disabled={disabled}
                onShow={onShow}
                onHide={onHide}
              />
              <Label required={required} label={label} name={name} />
            </span>
            {fieldState.error && <ErrorLabel fieldState={fieldState} />}
          </>
        )}
      />
    </span>
  );
}
