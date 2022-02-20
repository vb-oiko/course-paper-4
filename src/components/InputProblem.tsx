import React from "react";

import { NumberInput } from "./UI/NumberInput";
import { ColumnHeader } from "./UI/Tabs/Table/ColumnHeader";
import { RowHeader } from "./UI/Tabs/Table/RowHeader";
import { Problem } from "../core/Problem";
import { Button } from "./UI/Button";
import { AppAction, changeProblemA, changeProblemB, changeProblemP, resetProblem } from "../rdx/actions";
import { AppState } from "../rdx/useAppState";

export interface InputProblemProps {
  defaultProblem: Problem;
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const InputProblem: React.FC<InputProblemProps> = ({ children, defaultProblem, state, dispatch }) => {
  const handleChangeA = React.useCallback(
    (rowIdx: number, colIdx: number) => (value: number) => {
      dispatch(changeProblemA(rowIdx, colIdx, value));
    },
    [dispatch]
  );

  const handleChangeB = React.useCallback(
    (colIdx: number) => (value: number) => {
      dispatch(changeProblemB(colIdx, value));
    },
    [dispatch]
  );

  const handleChangeP = React.useCallback(
    (rowIdx: number) => (value: number) => {
      dispatch(changeProblemP(rowIdx, value));
    },
    [dispatch]
  );

  const handleReset = React.useCallback(() => {
    dispatch(resetProblem());
  }, [dispatch]);

  return (
    <div>
      <div className="mt-1 grid grid-cols-7 gap-4">
        <ColumnHeader>Номер виробу</ColumnHeader>
        {state.problem.b.map((_, columnIdx) => (
          <ColumnHeader key={`column-header-${columnIdx + 1}`}>{`Тип ${columnIdx + 1}`}</ColumnHeader>
        ))}
        <ColumnHeader>Кількість виробів у комплекті</ColumnHeader>

        {state.problem.a.map((row, rowIdx) => {
          return (
            <React.Fragment key={`row-${rowIdx + 1}`}>
              <RowHeader>{`Виріб ${rowIdx + 1}`}</RowHeader>
              {row.map((_, columnIdx) => (
                <NumberInput
                  key={`a-${rowIdx}${columnIdx}-${state.problem.a[rowIdx][columnIdx]}`}
                  value={state.problem.a[rowIdx][columnIdx]}
                  onChange={handleChangeA(rowIdx, columnIdx)}
                  min={0}
                />
              ))}
              <NumberInput
                key={`p-${rowIdx}$-${state.problem.p[rowIdx]}`}
                value={state.problem.p[rowIdx]}
                onChange={handleChangeP(rowIdx)}
                min={0}
              />
            </React.Fragment>
          );
        })}

        <RowHeader>Кількість підприємств</RowHeader>
        {state.problem.b.map((_, columnIdx) => (
          <NumberInput
            key={`b-${columnIdx + 1}-${state.problem.b[columnIdx]}`}
            value={state.problem.b[columnIdx]}
            onChange={handleChangeB(columnIdx)}
            min={0}
          />
        ))}
      </div>
      {children}
      <div className="mt-4">
        <Button className="ml-2" onClick={handleReset} variant="secondary">
          Повернути початкові значення
        </Button>
      </div>
    </div>
  );
};
