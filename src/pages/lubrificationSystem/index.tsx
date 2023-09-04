import { Pagination } from "@/components/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";
import { returnPaginatedData } from "@/services/utils";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { Container } from "./lubrificationSystem.styled";
import { useActivities } from "@/services/hooks/useActivity";
import { LubrificationSystemTable } from "@/components/lubrificationSystem/LubrificationSystemTable";
import { ComboBox } from "@/components/ComboBox";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { ERs, LubrificationSystems } from "@/services/entities";
import { useLubrificationSystemsByErId } from "@/services/hooks/useLubrificationSystems";
import { useCollaborators } from "@/services/hooks/useCollaborators";

export default function LubrificationSystemsComponent(er: ERs) {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState } = useForm<LubrificationSystems>();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();

  const formDeletion = useForm();
  const [ErrorLubrificationSystem, setErrorLubrificationSystem] = useState("");
  const [lubrificationSystemCurrentPage, setLubrificationSystemCurrentPage] =
    useState(1);

  const lubrificationSystemsWithoutPagination = useLubrificationSystemsByErId(
    er.id
  );

  const collaborators = useCollaborators();
  const activities = useActivities();

  let lubrificationSystems;

  const createLubrificationSystem = useMutation(
    async (lubrificationSystem: LubrificationSystems) => {
      const response = await api.post("lubrificationSystems", {
        lubrificationSystems: {
          add: lubrificationSystem.add,
          er: er,
          collaborator: lubrificationSystem.collaborator,
          activity: lubrificationSystem.activity,
          obs: lubrificationSystem.obs,
        },
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("lubrificationSystems");
      },
    }
  );

  if (lubrificationSystemsWithoutPagination.data) {
    lubrificationSystems = returnPaginatedData<LubrificationSystems>(
      lubrificationSystemsWithoutPagination.data,
      lubrificationSystemCurrentPage,
      numberOfItensPerPage
    );
  }

  const add = register("add", {
    required: "Quantidade de Lubrificante Adicionada é obrigatório",
    min: {
      value: 0,
      message: "O Valor mínimo é 0",
    },
    max: {
      value: 100,
      message: "O Valor máximo é 100",
    },
    valueAsNumber: true,
  });

  const obs = register("obs", {
    required: false,
  });

  const activity = register("activity", {
    required: "Atividade é obrigatória",
    setValueAs(value) {
      return activities.data?.find((act) => act.id == value);
    },
  });

  const collaborator = register("collaborator", {
    required: "Colaborador é obrigatório",
    setValueAs(value) {
      return collaborators.data?.find((col) => col.id == value);
    },
  });

  const handleCreateLubrificationSystem: SubmitHandler<
    LubrificationSystems
  > = async (values: LubrificationSystems) => {
    const response = await createLubrificationSystem.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setErrorLubrificationSystem(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`lubrificationSystems`, {
      data: {
        ids: checkBoxValues,
      },
    });

    if (lubrificationSystems.length == checkBoxValues?.length) {
      if (lubrificationSystemCurrentPage > 1)
        setLubrificationSystemCurrentPage(lubrificationSystemCurrentPage - 1);
    }

    setCheckBoxValues([]);

    await queryClient.invalidateQueries("lubrificationSystems");
  }

  return (
    <Container>
      <div>
        <form
          onSubmit={handleSubmit(handleCreateLubrificationSystem)}
          className="lubrificarionSystemContent"
          title={"Form Criar Lubrificarion System"}
          placeholder={"Form Criar Lubrificarion System"}
        >
          <div className="DivFormFields">
            <label>Qnt Lubrificante Add: </label>
            <input
              width="100%"
              alt="QuantidadeLubrificante Adicionado"
              type="number"
              title="Quantidade Lubrificante Adicionado"
              placeholder="Quantidade Lubrificante Adicionado"
              {...add}
            />
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="add" />
          </div>

          <div className="DivFormFields">
            <label>Observações: </label>
            <input
              width="100%"
              alt="Observações"
              type="text"
              title="Observações"
              placeholder="Observações"
              {...obs}
            />
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="obs" />
          </div>

          <div className="DivFormFields">
            <label>Colaborador: </label>
            {collaborators.data && (
              <ComboBox
                title="Colaborador"
                comboboxData={collaborators.data}
                handleClick={() => {}}
                {...collaborator}
              ></ComboBox>
            )}
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="collaborator" />
          </div>

          <div className="DivFormFields">
            <label>Atividade: </label>
            {activities.data && (
              <ComboBox
                title="Atividade"
                comboboxData={activities.data}
                handleClick={() => {}}
                {...activity}
              ></ComboBox>
            )}
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="activity" />
          </div>

          <div>
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
        <label>{ErrorLubrificationSystem}</label>
      </div>

      {lubrificationSystemsWithoutPagination.isLoading ? (
        "..."
      ) : lubrificationSystemsWithoutPagination.error ? (
        <p>Falha ao Obter Dados</p>
      ) : (
        lubrificationSystemsWithoutPagination.data && (
          <form
            title={"Form Excluir Lubrificarion System"}
            placeholder={"Form Excluir Lubrificarion System"}
            onSubmit={formDeletion.handleSubmit(handleDelete)}
          >
            <div className="LubrificationSystemTableContent">
              <LubrificationSystemTable
                lubrificationSystemData={lubrificationSystems}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
              />
            </div>
            <div>
              <Pagination
                totalCountOfRegisters={
                  lubrificationSystemsWithoutPagination.data.length
                }
                currentPage={lubrificationSystemCurrentPage}
                registersPerPage={numberOfItensPerPage}
                onPageClick={setLubrificationSystemCurrentPage}
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
