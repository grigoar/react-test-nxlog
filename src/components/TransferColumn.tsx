import classes from './TransferColumn.module.scss';

type Props = {
  options: React.ReactNode[];
};

const TransferColumn = ({ options }: Props) => {
  return (
    <div className={classes.columnContainer}>
      <ul className={classes.optionsList}>{options}</ul>
    </div>
  );
};

export default TransferColumn;

