import React from "react";

import { NumberInput } from "./UI/NumberInput";
import { ColumnHeader } from "./UI/Tabs/Table/ColumnHeader";
import { RowHeader } from "./UI/Tabs/Table/RowHeader";
import { range } from "../core/utils";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const handleChange = React.useCallback((newValue: number) => {
    console.warn({ newValue });
  }, []);

  const columns = range(5, 1);
  const rows = range(3, 1);

  return (
    <div className="mt-1 grid grid-cols-7 gap-4">
      <ColumnHeader>Номер виробу</ColumnHeader>
      {columns.map((column, columnIdx) => (
        <ColumnHeader key={`column-header-${column}`}>{`Тип ${column}`}</ColumnHeader>
      ))}
      <ColumnHeader>Кількість виробів у комплекті</ColumnHeader>

      {rows.map((row, rowIdx) => {
        return (
          <>
            <RowHeader key={`row-${rowIdx}`}>{`Виріб ${row}`}</RowHeader>
            {columns.map((column, columnIdx) => (
              <NumberInput key={`a-${rowIdx}${columnIdx}`} value={0} onChange={handleChange} />
            ))}
            <NumberInput key={`p-${rowIdx}$`} value={0} onChange={handleChange} />
          </>
        );
      })}

      <RowHeader>Кількість підприємств</RowHeader>
      {columns.map((column, columnIdx) => (
        <NumberInput key={`b-${columnIdx}`} value={0} onChange={handleChange} />
      ))}
    </div>
  );
};
