interface ILabelProps {
  name?: string;
  label?: string;
  required: boolean;
}

export default function Label({ name, label, required }: ILabelProps) {
  return (
    <label htmlFor={name} className="mb-1 ml-1">
      {label}&nbsp;
      {required ? (
        <span className="vertical-align-top text-red-600">*</span>
      ) : (
        <span className="text-color-secondary">(Optional)</span>
      )}
    </label>
  );
}
