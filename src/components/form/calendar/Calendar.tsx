import { Controller } from 'react-hook-form';

import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';

import { ICalendar } from '../interfaces';
import Label from '../label/Label';

export default function MTCalendar({
  control,
  name,
  label,
  cols = 12,
  required = false,
  minDate,
  maxDate,
}: ICalendar) {
  return (
    <span className={`col-12 md:col-${cols} mt-2`}>
      <Controller
        name={name ?? ''}
        control={control}
        rules={{ required }}
        render={({ field, fieldState }) => (
          <span className="p-float-label">
            <Calendar
              showOnFocus={false}
              className={classNames('w-full', {
                'p-invalid': fieldState.error,
              })}
              showIcon
              onChange={(e) => field.onChange(e.value)}
              value={field.value}
              minDate={minDate}
              maxDate={maxDate}
            />
            <Label required={required} label={label} name={name} />
          </span>
        )}
      />
    </span>
  );
}
