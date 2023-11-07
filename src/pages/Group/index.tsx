import { Pagination } from "@/components/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";
import { returnPaginatedData } from "@/services/utils";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { Container } from "./group.styled";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { Group } from "@/services/entities";
import { useGroup } from "@/services/hooks/useGroup";
import { GroupTable } from "@/components/Group/GroupTable";
import RescueGroupComponent from "../RescueGroup";
import EditGroupComponent from "./edit";

export default function GroupComponent() {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState } = useForm<Group>();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();
  const [groupToEdit, setGroupToEdit] = useState<Group>();
  const [rescueGroup, setRescueGroup] = useState<Group>();

  const formDeletion = useForm();

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const groupsWithoutPagination = useGroup();

  let groups;

  const createGroup = useMutation(
    async (group: Group) => {
      const response = await api.post("group", {
        name: group.name,
        humidity: group.humidity,
        temperature: group.temperature,
        noBreak: group.noBreak,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Group");
      },
    }
  );

  if (groupsWithoutPagination.data) {
    groups = returnPaginatedData<Group>(
      groupsWithoutPagination.data,
      currentPage,
      numberOfItensPerPage
    );
  }

  const name = register("name", {
    required: "Nome é obrigatório",
    minLength: {
      value: 3,
      message: "O Nome deve ter pelo menos 3 caracteres",
    },
    maxLength: {
      value: 20,
      message: "O Nome deve ter no máximo 10 caracteres",
    },
  });

  const humidity = register("humidity", {
    required: "A Umidade é obrigatório",
    minLength: {
      value: 0,
      message: "A Umidade deve ser maior do que 0%",
    },
    maxLength: {
      value: 100,
      message: "A Umidade deve ser menor do que 100%",
    },
    valueAsNumber: true,
  });

  const temperature = register("temperature", {
    required: "A Temperatura é obrigatório",
    minLength: {
      value: 0,
      message: "A Temperatura deve ser maior do que 0ºC",
    },
    maxLength: {
      value: 50,
      message: "A Temperatura deve ser menor do que 50ºC",
    },
    valueAsNumber: true,
  });

  const noBreak = register("noBreak", {
    required: "O Tempo é obrigatório",
    minLength: {
      value: 1,
      message: "O deve ser maior do que 1 min",
    },
    maxLength: {
      value: 120,
      message: "O deve ser maior do que 2 horas (120 min)",
    },
    valueAsNumber: true,
  });

  const handleCreate: SubmitHandler<Group> = async (values: Group) => {
    const response = await createGroup.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setError(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`group`, {
      data: {
        ids: checkBoxValues,
      },
    });

    await queryClient.invalidateQueries("Group");

    if (groups.length == checkBoxValues?.length) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    setCheckBoxValues([]);
  }

  if (groupToEdit) {
    return (
      <EditGroupComponent
        setGroup={setGroupToEdit}
        setCheckBoxValues={setCheckBoxValues}
        group={groupToEdit}
      />
    );
  }

  if (rescueGroup) {
    return (
      <RescueGroupComponent group={rescueGroup} setGroup={setRescueGroup} />
    );
  }

  return (
    <Container>
      <h1>Grupos</h1>
      <div>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className="GroupContent"
          title={"Form Criar Grupo"}
          placeholder={"Form Criar Grupo"}
        >
          <p>{error}</p>

          <div className="Fields">
            <label>Nome:</label>
            <input
              width="100%"
              alt="Name"
              type="text"
              title="Name"
              placeholder="Name"
              {...name}
            />
          </div>
          <div className="Fields">
            <ErrorMessage errors={formState.errors} name="name" />
          </div>

          <div className="Fields">
            <label>Umidade (%):</label>
            <input
              width="100%"
              alt="Humidity"
              type="number"
              title="Humidity"
              placeholder="Humidity"
              {...humidity}
            />
          </div>
          <div className="Fields">
            <ErrorMessage errors={formState.errors} name="humidity" />
          </div>

          <div className="Fields">
            <label>Temperatura (ºC):</label>
            <input
              width="100%"
              alt="Temperature"
              type="number"
              title="Temperature"
              placeholder="Temperature"
              {...temperature}
            />
          </div>
          <div className="Fields">
            <ErrorMessage errors={formState.errors} name="temperature" />
          </div>

          <div className="Fields">
            <label>NoBreak (min):</label>
            <input
              width="100%"
              alt="NoBreak"
              type="number"
              title="NoBreak"
              placeholder="NoBreak"
              {...noBreak}
            />
          </div>
          <div className="Fields">
            <ErrorMessage errors={formState.errors} name="noBreak" />
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

      {groupsWithoutPagination.isLoading ? (
        "..."
      ) : groupsWithoutPagination.error ? (
        <p>Falha ao Obter Dados</p>
      ) : (
        groupsWithoutPagination.data && (
          <form
            title={"Form Excluir Group"}
            placeholder={"Form Excluir Group"}
            onSubmit={formDeletion.handleSubmit(handleDelete)}
          >
            <div className="GroupTableContent">
              <GroupTable
                groupData={groups}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
                setGroup={setGroupToEdit}
                setRescueGroup={setRescueGroup}
              />
            </div>
            <div>
              <Pagination
                totalCountOfRegisters={groupsWithoutPagination.data.length}
                currentPage={currentPage}
                registersPerPage={numberOfItensPerPage}
                onPageClick={setCurrentPage}
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
