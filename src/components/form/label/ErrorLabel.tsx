import { ControllerFieldState } from 'react-hook-form';

interface IErrorLabelProps {
  fieldState: ControllerFieldState;
}

export default function ErrorLabel({ fieldState }: IErrorLabelProps) {
  return (
    <span className="text-xs text-red-300 ml-2">
      {fieldState.error?.message}
    </span>
  );
}
