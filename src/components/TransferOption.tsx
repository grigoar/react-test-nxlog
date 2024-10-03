import classes from './TransferOption.module.scss';

type Props = {
  option: string;
  handleOptionSelect: () => void;
};

const TransferOption = ({ option, handleOptionSelect }: Props) => {
  return (
    <li className={classes.option}>
      <input
        type='checkbox'
        id={option}
        key={option}
        className={classes.option}
        onChange={handleOptionSelect}
      />
      <label htmlFor={option}>{option}</label>
    </li>
  );
};

export default TransferOption;

