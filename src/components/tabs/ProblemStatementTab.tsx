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

      <p className="mb-4">
        Позначимо через <InlineLatex>{"x_{ij}"}</InlineLatex> - кількість підприємстві <InlineLatex>{"j"}</InlineLatex>
        -го типу, на яких буде вироблятися виріб <InlineLatex>{"i"}</InlineLatex>-го типу, через{" "}
        <InlineLatex>{"b_{j}"}</InlineLatex> - кількість підприємств <InlineLatex>{"j"}</InlineLatex>-го типу, а через{" "}
        <InlineLatex>{"p_i"}</InlineLatex> - кількість виробів <InlineLatex>{"i"}</InlineLatex>-го типу у комплекті.
        Позначимо через <InlineLatex>{"x"}</InlineLatex> кількість комплектів. Тоді математична модель матиме такий
        вигляд:
      </p>

      <Latex displayMode={true}>{"$$ \\max x $$"}</Latex>

      <p>При обмеженнях</p>

      <Latex displayMode={true}>{"$$ \\sum_{j=1}^{5} a_{ij} x_{ij} \\ge p_i x \\quad i=1..3 $$"}</Latex>
      <Latex displayMode={true}>{"$$ \\sum_{i=1}^{3} x_{ij} \\le b_{j}, \\quad j=1..5 $$"}</Latex>
      <Latex displayMode={true}>{"$$ x_{ij} \\in \\Z^{\\ge} , \\quad i=1..3, \\quad j=1..5 $$"}</Latex>
      <Latex displayMode={true}>{"$$ \\mu(a_{ij})  \\ge 0.8 $$"}</Latex>

      <p>
        Вирішуємо нерівність та знайдемо кінці інтервалу нечіткої множини <InlineLatex>{"a_{ij}"}</InlineLatex> рівня{" "}
        <InlineLatex>{"\\alpha_0"}</InlineLatex>
      </p>

      <Latex displayMode={true}>
        {
          "$$ \\mu_{ij}(a_{ij}) = \\frac{1}{1 + \\frac{(a_{ij} - \\overline{a}_{ij})^2}{\\overline{a}_{ij}^2}} \\ge \\alpha_0 $$"
        }
      </Latex>

      <Latex displayMode={true}>
        {"$$ 1 \\ge \\alpha_0 (1 + \\frac{(a_{ij} - \\overline{a}_{ij})^2}{\\overline{a}_{ij}^2}) $$"}
      </Latex>

      <Latex displayMode={true}>
        {"$$ 1 \\ge \\alpha_0 + \\alpha_0 \\frac{(a_{ij} - \\overline{a}_{ij})^2}{\\overline{a}_{ij}^2} $$"}
      </Latex>

      <Latex displayMode={true}>
        {"$$ \\alpha_0 \\frac{(a_{ij} - \\overline{a}_{ij})^2}{\\overline{a}_{ij}^2} \\le (1 - \\alpha_0)$$"}
      </Latex>

      <Latex displayMode={true}>
        {"$$ (a_{ij} - \\overline{a}_{ij})^2 \\le \\frac{1-\\alpha_0}{\\alpha_0} \\overline{a}_{ij}^2$$"}
      </Latex>

      <Latex displayMode={true}>
        {"$$ |a_{ij} - \\overline{a}_{ij}| \\le \\sqrt{\\frac{1-\\alpha_0}{\\alpha_0}} |\\overline{a}_{ij}|$$"}
      </Latex>

      <p>
        Зробимо зауваження, що згідно умовам задачі <InlineLatex>{"a_{ij} > 0"}</InlineLatex>, отже{" "}
      </p>

      <Latex displayMode={true}>
        {"$$ |a_{ij} - \\overline{a}_{ij}| \\le \\sqrt{\\frac{1-\\alpha_0}{\\alpha_0}} \\overline{a}_{ij}$$"}
      </Latex>

      <Latex displayMode={true}>
        {
          "$$ \\overline{a}_{ij} - \\sqrt{\\frac{1-\\alpha_0}{\\alpha_0}} \\overline{a}_{ij} \\le a_{ij} \\le \\overline{a}_{ij} + \\sqrt{\\frac{1-\\alpha_0}{\\alpha_0}} \\overline{a}_{ij}$$"
        }
      </Latex>

      <Latex displayMode={true}>
        {
          "$$ \\left(1 - \\sqrt{\\frac{1-\\alpha_0}{\\alpha_0}} \\right) \\overline{a}_{ij} \\le a_{ij} \\le \\left( 1+ \\sqrt{\\frac{1-\\alpha_0}{\\alpha_0}} \\right) \\overline{a}_{ij}$$"
        }
      </Latex>
    </div>
  );
};
