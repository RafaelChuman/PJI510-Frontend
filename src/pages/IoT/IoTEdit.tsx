import { IoT } from "@/services/entities";
import LubrificationSystemsComponent from "../RescueGroup";
import { Container } from "./IoT.styled";

export default function IoTEditComponent(ioT: IoT) {
  return (
    <Container>
      <div>
        <h1>Edit IoT</h1>
        <div className="DivFormFields">
          <label>IoT:</label>
          <label className="IoTEditLabelContent"> {ioT.name}</label>
        </div>
        <div className="DivFormFields">
          <label>Zona:</label>
          <label className="IoTEditLabelContent"> {ioT.Group.name}</label>
        </div>
      </div>
      {/* <LubrificationSystemsComponent
        createdAt={er.createdAt}
        id={er.id}
        number={er.number}
        zone={er.zone}
      /> */}
    </Container>
  );
}
