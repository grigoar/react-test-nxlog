type Props = {
  handleAction: () => void;
  isDisabled: boolean;
  label: string;
};

const Button = ({ label, handleAction, isDisabled }: Props) => {
  return (
    <button onClick={handleAction} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default Button;

