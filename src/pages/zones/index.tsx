import { Pagination } from "@/components/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";
import { returnPaginatedData } from "@/services/utils";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useZones } from "@/services/hooks/useZones";
import { ZoneTable } from "@/components/zones/ZoneTable";
import { Container } from "./zones.styled";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import EditZoneComponent from "./editZone";
import { Zones } from "@/services/entities";

export default function ZonesComponent() {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState } = useForm<Zones>();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();
  const [zone, setZone] = useState<Zones>();

  const formDeletion = useForm();

  const [ErrorZone, setErrorZone] = useState("");

  const [zoneCurrentPage, setZoneCurrentPage] = useState(1);

  const zonesWithoutPagination = useZones();

  let zones;

  const createZone = useMutation(
    async (zone: Zones) => {
      const response = await api.post("zones", {
        name: zone.name,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("zones");
      },
    }
  );

  if (zonesWithoutPagination.data) {
    zones = returnPaginatedData<Zones>(
      zonesWithoutPagination.data,
      zoneCurrentPage,
      numberOfItensPerPage
    );
  }

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

  const handleCreateZone: SubmitHandler<Zones> = async (values: Zones) => {
    const response = await createZone.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setErrorZone(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`zones`, {
      data: {
        ids: checkBoxValues,
      },
    });

    await queryClient.invalidateQueries("zones");

    if (zones.length == checkBoxValues?.length) {
      if (zoneCurrentPage > 1) setZoneCurrentPage(zoneCurrentPage - 1);
    }

    setCheckBoxValues([]);
  }

  if (zone) {
    return (
      <EditZoneComponent
        SetZone={setZone}
        setCheckBoxValues={setCheckBoxValues}
        zone={zone}
      />
    );
  } else {
    return (
      <Container>
        <h1>Zonas</h1>
        <div>
          <form
            onSubmit={handleSubmit(handleCreateZone)}
            className="zonaContent"
            title={"Form Criar Zona"}
            placeholder={"Form Criar Zona"}
          >
            <p>{ErrorZone}</p>
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
            <div className="Fields">
              <ErrorMessage errors={formState.errors} name="name" />
            </div>
            <div className="Fields">
              <button type={"submit"} disabled={formState.isSubmitting}>
                {formState.isSubmitting ? (
                  "..."
                ) : (
                  <>
                    <RiAddFill /> Salvar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {zonesWithoutPagination.isLoading ? (
          "..."
        ) : zonesWithoutPagination.error ? (
          <p>Falha ao Obter Dados</p>
        ) : (
          zonesWithoutPagination.data && (
            <form
              title={"Form Excluir Zona"}
              placeholder={"Form Excluir Zona"}
              onSubmit={formDeletion.handleSubmit(handleDelete)}
            >
              <div className="ZoneTableContent">
                <ZoneTable
                  zoneData={zones}
                  checkBoxValues={checkBoxValues}
                  setCheckBoxValues={setCheckBoxValues}
                  SetZone={setZone}
                />
              </div>
              <div>
                <Pagination
                  totalCountOfRegisters={zonesWithoutPagination.data.length}
                  currentPage={zoneCurrentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setZoneCurrentPage}
                ></Pagination>
              </div>
              <button type="submit" className="DeleteButton">
                <RiCloseFill /> Excluir
              </button>
            </form>
          )
        )}
      </Container>
    );
  }
}
