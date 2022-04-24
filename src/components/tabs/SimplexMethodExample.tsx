import { useSelector } from "react-redux";
import { selectSimplexTableaus } from "../../rdx/selectors";
import { Collapse } from "../Collapse";
import { TableauComponent } from "../TableauComponent";

export const SimplexMethodExample = () => {
  const tableaus = useSelector(selectSimplexTableaus);
  return (
    <>
      {tableaus.map((tableau, idx) => (
        <div key={idx} className="mb-6">
          <Collapse buttonTitle={`Iteration: ${idx}`}>
            <TableauComponent tableau={tableau} />
            {tableau.comments.map((comment, commentIdx) => (
              <div key={`${comment}-${commentIdx}`}>{comment}</div>
            ))}
          </Collapse>
        </div>
      ))}
    </>
  );
};
