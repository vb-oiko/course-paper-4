import React from "react";
import update from "immutability-helper";

import { NumberInput } from "./UI/NumberInput";
import { ColumnHeader } from "./UI/Tabs/Table/ColumnHeader";
import { RowHeader } from "./UI/Tabs/Table/RowHeader";
import { Problem } from "../core/Problem";
import { Button } from "./UI/Button";

export interface InputProblemProps {
  defaultProblem: Problem;
  onSubmit: (problem: Problem) => void;
  onReset?: () => void;
}

export const InputProblem: React.FC<InputProblemProps> = ({ onSubmit, children, defaultProblem, onReset }) => {
  const [a, setA] = React.useState<number[][]>(defaultProblem.a);
  const [b, setB] = React.useState<number[]>(defaultProblem.b);
  const [p, setP] = React.useState<number[]>(defaultProblem.p);

  const handleChangeA = React.useCallback(
    (rowIdx: number, colIdx: number) => (value: number) => {
      setA(update(a, { [rowIdx]: { [colIdx]: { $set: value } } }));
    },
    [a]
  );

  const handleChangeB = React.useCallback(
    (colIdx: number) => (value: number) => {
      setB(update(b, { [colIdx]: { $set: value } }));
    },
    [b]
  );

  const handleChangeP = React.useCallback(
    (rowIdx: number) => (value: number) => {
      setP(update(p, { [rowIdx]: { $set: value } }));
    },
    [p]
  );

  const handleSubmit = React.useCallback(() => {
    onSubmit({ a, b, p });
  }, [a, b, onSubmit, p]);

  const handleReset = React.useCallback(() => {
    setA(defaultProblem.a);
    setB(defaultProblem.b);
    setP(defaultProblem.p);
    if (onReset) {
      onReset();
    }
  }, [defaultProblem.a, defaultProblem.b, defaultProblem.p, onReset]);

  return (
    <div>
      <div className="mt-1 grid grid-cols-7 gap-4">
        <ColumnHeader>Номер виробу</ColumnHeader>
        {b.map((_, columnIdx) => (
          <ColumnHeader key={`column-header-${columnIdx + 1}`}>{`Тип ${columnIdx + 1}`}</ColumnHeader>
        ))}
        <ColumnHeader>Кількість виробів у комплекті</ColumnHeader>

        {a.map((row, rowIdx) => {
          return (
            <React.Fragment key={`row-${rowIdx + 1}`}>
              <RowHeader>{`Виріб ${rowIdx + 1}`}</RowHeader>
              {row.map((_, columnIdx) => (
                <NumberInput
                  key={`a-${rowIdx}${columnIdx}-${a[rowIdx][columnIdx]}`}
                  value={a[rowIdx][columnIdx]}
                  onChange={handleChangeA(rowIdx, columnIdx)}
                  min={0}
                />
              ))}
              <NumberInput
                key={`p-${rowIdx}$-${p[rowIdx]}`}
                value={p[rowIdx]}
                onChange={handleChangeP(rowIdx)}
                min={0}
              />
            </React.Fragment>
          );
        })}

        <RowHeader>Кількість підприємств</RowHeader>
        {b.map((_, columnIdx) => (
          <NumberInput key={`b-${columnIdx + 1}`} value={b[columnIdx]} onChange={handleChangeB(columnIdx)} min={0} />
        ))}
      </div>
      {children}
      <div className="mt-4">
        <Button onClick={handleSubmit}>Створити математичну модель</Button>
        <Button className="ml-2" onClick={handleReset} variant="secondary">
          Повернути початкові значення
        </Button>
      </div>
    </div>
  );
};
