import React from "react";
import Latex from "react-latex";
import { ExperimentTable } from "../experiment/ExperimentTable";
import { InlineLatex } from "../InlineLatex";

export interface ProblemStatementTabProps {
  prop?: number;
}

export const ProblemStatementTab: React.FC<ProblemStatementTabProps> = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Завдання про розподіл виробничої програми між підприємствами</h2>
      <p className="mb-4">
        Один із видів кінцевої продукції, що випускається галуззю, комплектується з трьох видів виробів, які можна
        виготовляти на різних підприємствах. Кількість виробів кожного виду, що входить в комплект готової продукції,
        задано. Крім того, відома місячна продуктивність кожного підприємства з випуску виробів кожного виду. Потрібно
        оптимально розподілити випуск виробів по підприємствах, тобто визначити спеціалізацію підприємств з тим, щоб
        забезпечити максимальний випуск комплектної продукції.
      </p>

      <p className="mb-2">У табл.1. представлені вихідні дані. Продуктивність підприємства задана у тисячах тонн.</p>
      <ExperimentTable
        experimentData={{
          labels: ["Тип 1", "Тип 2", "Тип 3", "Тип 4", "Тип 5", "Кількість виробів у комплекті"],
          datasets: [
            { label: "Виріб 1", data: [200, 100, 300, 50, 20, 1] },
            { label: "Виріб 2", data: [70, 100, 300, 100, 400, 4] },
            { label: "Виріб 3", data: [60, 150, 100, 300, 500, 2] },
            { label: "Кількість підприємств", data: [10, 4, 60, 7, 5] },
          ],
        }}
        headerClassName="w-32"
        className="mb-4"
      />

      <p className="mb-4">
        Припустимо, що місячна продуктивність кожного підприємства є нечіткою випадковою величиною з функцією
        приналежності
      </p>

      <p className="text-xl">
        <Latex displayMode={true}>
          {"$$ \\mu_{ij}(a_{ij}) = \\frac{1}{1 + \\frac{(a_{ij} - \\overline{a}_{ij})^2}{\\overline{a}_{ij}^2}}, $$"}
        </Latex>
      </p>

      <p className="mb-4">
        де <InlineLatex>{"a_{ij}"}</InlineLatex> - це дані, наведені в таблиці 1, <InlineLatex>{"i"}</InlineLatex> -
        номер виробу; <InlineLatex>{"j"}</InlineLatex> - тип підприємства,{" "}
        <InlineLatex>{"j=\\overline{(1, 5)}"}</InlineLatex>. Побудувати відповідну модель задачі НМП. Знайти підмножини
        максимізуючих альтернатив, недомінованих, зі ступенем <InlineLatex>{"\\alpha=\\alpha_0"}</InlineLatex>, зокрема
        для стратегій оптиміста та песиміста, та порівняти отримані рішення.
      </p>
    </div>
  );
};
