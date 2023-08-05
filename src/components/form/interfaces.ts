import { SetStateAction } from 'react';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

import { CalendarProps } from 'primereact/calendar';
import { DropdownProps } from 'primereact/dropdown';
import { InputTextProps } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import { MultiSelectProps } from 'primereact/multiselect';
import { RadioButtonProps } from 'primereact/radiobutton';
import { SelectItemOptionsType } from 'primereact/selectitem';

export interface IControlledComponent {
  control: Control<FieldValues, unknown>;
  cols?: number;
  label?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, 'inputText'>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  required?: boolean;
  placeholder?: string;
  loading?: boolean;
}

export interface IInputTextProps extends IControlledComponent, InputTextProps {
  mask?: string;
  keyfilter?: KeyFilterType;
}

interface IOption {
  label: string;
  value: number;
}

export interface ISelectProps extends IControlledComponent, DropdownProps {
  options: SelectItemOptionsType;
  value: unknown;
  filter?: boolean;
  disabled?: boolean;
  setValue: React.Dispatch<SetStateAction<string>>;
}

export interface IMultiSelectProps
  extends IControlledComponent,
    MultiSelectProps {
  options: SelectItemOptionsType;
  value: number[];
  filter?: boolean;
  disabled?: boolean;
  setValue: React.Dispatch<SetStateAction<number[]>>;
}

export interface IRadioButtonProps
  extends IControlledComponent,
    RadioButtonProps {
  options: IOption[];
  selectedOption: number;
  setSelectedOption: React.Dispatch<SetStateAction<number>>;
}

export interface ICalendar extends IControlledComponent, CalendarProps {}
