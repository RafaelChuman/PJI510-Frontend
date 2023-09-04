import { ERs } from "@/services/entities";
import LubrificationSystemsComponent from "../lubrificationSystem";
import { Container } from "./ers.styled";

export default function EditERsComponent(er: ERs) {
  return (
    <Container>
      <div>
        <h1>Edit ER</h1>
        <div className="DivFormFields">
          <label>ER:</label>
          <label className="EREditLabelContent"> {er.number}</label>
        </div>
        <div className="DivFormFields">
          <label>Zona:</label>
          <label className="EREditLabelContent"> {er.zone.name}</label>
        </div>
      </div>
      <LubrificationSystemsComponent
        createdAt={er.createdAt}
        id={er.id}
        number={er.number}
        zone={er.zone}
      />
    </Container>
  );
}
