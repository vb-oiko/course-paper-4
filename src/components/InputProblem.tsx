import React from "react";

import { NumberInput } from "./UI/NumberInput";
import { ColumnHeader } from "./UI/Tabs/Table/ColumnHeader";
import { RowHeader } from "./UI/Tabs/Table/RowHeader";
import { Button } from "./UI/Button";
import { AppAction, changeAlpha, changeProblemA, changeProblemB, changeProblemP, resetProblem } from "../rdx/actions";
import { AppState } from "../rdx/useAppState";
import { InlineLatex } from "./InlineLatex";

export interface InputProblemProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const InputProblem: React.FC<InputProblemProps> = ({ state, dispatch }) => {
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

  const handleAlphaChange = React.useCallback((value) => dispatch(changeAlpha(value)), []);

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

      <div className="mt-4">
        <label htmlFor="input-alpha">
          <span>Ступень недомінованості</span>
          <InlineLatex className="ml-1">{"\\alpha_0"}</InlineLatex>
          <NumberInput
            id="input-alpha"
            key={`${state.alpha}`}
            value={state.alpha}
            onChange={handleAlphaChange}
            className="ml-2 w-24 inline-block"
            min={0.5}
            max={1}
            step={0.05}
          />
        </label>
      </div>

      <div className="mt-4">
        <Button className="ml-2" onClick={handleReset} variant="secondary">
          Повернути початкові значення
        </Button>
      </div>
    </div>
  );
};
