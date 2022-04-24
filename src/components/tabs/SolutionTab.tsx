import React from "react";
import Latex from "react-latex";
import { InlineLatex } from "../InlineLatex";

export interface SolutionTabProps {}

export const SolutionTab: React.FC<SolutionTabProps> = () => {
  return (
    <>
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
      <Latex displayMode={true}>{"$$ \\mu(a_{ij})  \\ge \\alpha_0 $$"}</Latex>

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
    </>
  );
};
