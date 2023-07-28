export default function Label({
  name,
  label,
  required,
}: {
  name?: string;
  label?: string;
  required: boolean;
}) {
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
