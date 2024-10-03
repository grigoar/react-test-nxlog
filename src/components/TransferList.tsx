import { useState } from 'react';

import Button from './Button';
import TransferColumn from './TransferColumn';
import classes from './TransferList.module.scss';
import TransferOption from './TransferOption';

const options = [
  'JS',
  'HTML',
  'CSS',
  'TS',
  'React',
  'Angular',
  'Vue',
  'Svelte',
];

export type TransferDirectionType = 'left' | 'right';

const TransferList = () => {
  const [leftColumnOptions, setLeftColumnOptions] = useState<string[]>(options);
  const [rightColumnOptions, setRightColumnOptions] = useState<string[]>([]);

  const [selectedOptionsLeft, setSelectedOptionsLeft] = useState<string[]>([]);
  const [selectedOptionsRight, setSelectedOptionsRight] = useState<string[]>(
    []
  );

  const handleTransferAll = (direction: TransferDirectionType) => {
    if (direction === 'left') {
      setLeftColumnOptions([...leftColumnOptions, ...rightColumnOptions]);
      setRightColumnOptions([]);
    } else {
      setRightColumnOptions([...rightColumnOptions, ...leftColumnOptions]);
      setLeftColumnOptions([]);
    }
  };

  const handleTransferSelected = (direction: TransferDirectionType) => {
    if (direction === 'left') {
      setLeftColumnOptions([...leftColumnOptions, ...selectedOptionsRight]);
      setRightColumnOptions(
        rightColumnOptions.filter(
          (option) => !selectedOptionsRight.includes(option)
        )
      );
      setSelectedOptionsRight([]);
    }

    if (direction === 'right') {
      setRightColumnOptions([...rightColumnOptions, ...selectedOptionsLeft]);
      setLeftColumnOptions(
        leftColumnOptions.filter(
          (option) => !selectedOptionsLeft.includes(option)
        )
      );
      setSelectedOptionsLeft([]);
    }
  };

  const handleOptionSelect = (
    option: string,
    direction: TransferDirectionType
  ) => {
    if (direction === 'left') {
      if (selectedOptionsLeft.includes(option)) {
        setSelectedOptionsLeft(
          selectedOptionsLeft.filter((item) => item !== option)
        );
        return;
      }
      setSelectedOptionsLeft([...selectedOptionsLeft, option]);
    }
    if (direction === 'right') {
      if (selectedOptionsRight.includes(option)) {
        setSelectedOptionsRight(
          selectedOptionsRight.filter((item) => item !== option)
        );
        return;
      }
      setSelectedOptionsRight([...selectedOptionsRight, option]);
    }
  };

  const optionsLeft = leftColumnOptions.map((option) => (
    <TransferOption
      option={option}
      handleOptionSelect={() => handleOptionSelect(option, 'left')}
    />
  ));

  const optionsRight = rightColumnOptions.map((option) => (
    <TransferOption
      option={option}
      handleOptionSelect={() => handleOptionSelect(option, 'right')}
    />
  ));

  return (
    <div className={classes.transferListContainer}>
      <TransferColumn options={optionsLeft} />
      <div className={classes.buttonsContainer}>
        <Button
          handleAction={() => handleTransferAll('right')}
          isDisabled={optionsLeft.length === 0}
          label={'>>'}
        />
        <Button
          handleAction={() => handleTransferSelected('right')}
          isDisabled={selectedOptionsLeft.length === 0}
          label={'>'}
        />
        <Button
          handleAction={() => handleTransferSelected('left')}
          isDisabled={selectedOptionsRight.length === 0}
          label={'<'}
        />
        <Button
          handleAction={() => handleTransferAll('left')}
          isDisabled={optionsRight.length === 0}
          label={'<<'}
        />
      </div>
      <TransferColumn options={optionsRight} />
    </div>
  );
};

export default TransferList;

