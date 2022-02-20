import React from "react";
import update from "immutability-helper";

import { NumberInput } from "./UI/NumberInput";
import { ColumnHeader } from "./UI/Tabs/Table/ColumnHeader";
import { RowHeader } from "./UI/Tabs/Table/RowHeader";
import { problem } from "../const/problem";
import { Problem } from "../core/Problem";
import { Button } from "./UI/Button";

export interface InputProblemProps {
  onSubmit: (problem: Problem) => void;
}

export const InputProblem: React.FC<InputProblemProps> = ({ onSubmit }) => {
  const [a, setA] = React.useState<number[][]>(problem.a);
  const [b, setB] = React.useState<number[]>(problem.b);
  const [p, setP] = React.useState<number[]>(problem.p);

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
                  key={`a-${rowIdx}${columnIdx}`}
                  value={a[rowIdx][columnIdx]}
                  onChange={handleChangeA(rowIdx, columnIdx)}
                />
              ))}
              <NumberInput key={`p-${rowIdx}$`} value={p[rowIdx]} onChange={handleChangeP(rowIdx)} />
            </React.Fragment>
          );
        })}

        <RowHeader>Кількість підприємств</RowHeader>
        {b.map((_, columnIdx) => (
          <NumberInput key={`b-${columnIdx + 1}`} value={b[columnIdx]} onChange={handleChangeB(columnIdx)} />
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={handleSubmit}>Створити математичну модель</Button>
      </div>
    </div>
  );
};
