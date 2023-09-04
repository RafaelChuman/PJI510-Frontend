import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { ErrorMessage } from "@hookform/error-message";
import { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiRefreshLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { Container } from "./zones.styled";
import { Zones } from "@/services/entities";
import { convertToDateBR } from "@/services/utils";

interface EditZoneProps {
  zone: Zones;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetZone: (value: SetStateAction<Zones | undefined>) => void;
}

export default function EditZoneComponent({
  zone,
  SetZone,
  setCheckBoxValues,
}: EditZoneProps) {
  const { register, handleSubmit, formState } = useForm<Zones>();

  const editZone = useMutation(
    async (zoneUpd: Zones) => {
      const response = await api.put("zones", {
        id: zone.id,
        name: zoneUpd.name,
      });

      return response;
    },
    {
      onSuccess: () => {
        SetZone(undefined);
        setCheckBoxValues([]);
        queryClient.invalidateQueries("zones");
      },
    }
  );

  const handleEditZone: SubmitHandler<Zones> = async (values: Zones) => {
    const response = await editZone.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
    }
  };

  const name = register("name", {
    required: "Nome da Zona é obrigatório",
    minLength: {
      value: 3,
      message: "O Nome da Zona  deve ter pelo menos 3 caracteres",
    },
    maxLength: {
      value: 10,
      message: "O Nome da Zona  deve ter no máximo 10 caracteres",
    },
  });

  return (
    <Container>
      <h1>Zonas</h1>

      <div className="Fields">
        <label>ID:</label>
        <label>{zone.id}</label>
      </div>
      <div className="Fields">
        <label>Nome da Zona:</label>
        <label>{zone.name}</label>
      </div>
      <div className="Fields">
        <label>Data Criação:</label>
        <label>{convertToDateBR(zone.createdAt)}</label>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleEditZone)}
          className="zonaContent"
          title={"Form Criar Zona"}
          placeholder={"Form Criar Zona"}
        >
          <div className="Fields">
            <label>Insira o Nome da Zona:</label>
            <input
              width="100%"
              alt="Zona"
              type="text"
              title="Zona"
              placeholder="Zona"
              {...name}
            />
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="name" />
          </div>
          <div>
            <button type={"submit"} disabled={formState.isSubmitting}>
              {formState.isSubmitting ? (
                "..."
              ) : (
                <>
                  <RiRefreshLine /> Atualizar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
