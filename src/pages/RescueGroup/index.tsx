import { Pagination } from "@/components/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";
import { returnPaginatedData } from "@/services/utils";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { Container } from "./RescueGroup.styled";
import { ComboBox } from "@/components/ComboBox";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { Group, RescueGroup } from "@/services/entities";
import { useRescueGroup } from "@/services/hooks/useRescueGroup";
import { useUsers } from "@/services/hooks/useUser";
import { RescueGroupTable } from "@/components/RescueGroup/RescueGroupTable";

export default function RescueGroupComponent(group: Group) {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState } = useForm<RescueGroup>();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();

  const formDeletion = useForm();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rescueGroupWithoutPagination = useRescueGroup(group.id);

  const users = useUsers();

  let rescueGroup;

  const create = useMutation(
    async (addItem: RescueGroup) => {
      const response = await api.post("rescueGroup", {
        lubrificationSystems: {
          Group: addItem.Group,
          User: addItem.User,
        },
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RescueGroup");
      },
    }
  );

  if (rescueGroupWithoutPagination.data) {
    rescueGroup = returnPaginatedData<RescueGroup>(
      rescueGroupWithoutPagination.data,
      currentPage,
      numberOfItensPerPage
    );
  }
  const user = register("User", {
    required: "Selecione pelo menos um usuário",
    setValueAs(value) {
      return users.data?.find((act) => act.id == value);
    },
  });

  const handleCreate: SubmitHandler<RescueGroup> = async (
    values: RescueGroup
  ) => {
    const response = await create.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setError(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`rescueGroup`, {
      data: {
        ids: checkBoxValues,
      },
    });

    if (rescueGroup.length == checkBoxValues?.length) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    setCheckBoxValues([]);

    await queryClient.invalidateQueries("RescueGroup");
  }

  return (
    <Container>
      <div>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className="rescueGroupContent"
          title={"Form Adicionar Usuários no Grupo de Notificação"}
          placeholder={"Form Adicionar Usuários no Grupo de Notificação"}
        >
          <div className="DivFormFields">
            <label>Usuário: </label>
            {users.data && (
              <ComboBox
                title="Colaborador"
                comboboxData={users.data}
                handleClick={() => {}}
                {...user}
              ></ComboBox>
            )}
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="user" />
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
        <label>{error}</label>
      </div>

      {rescueGroupWithoutPagination.isLoading ? (
        "..."
      ) : rescueGroupWithoutPagination.error ? (
        <p>Falha ao Obter Dados</p>
      ) : (
        rescueGroupWithoutPagination.data && (
          <form
            title={"Form Excluir Lubrificarion System"}
            placeholder={"Form Excluir Lubrificarion System"}
            onSubmit={formDeletion.handleSubmit(handleDelete)}
          >
            <div className="LubrificationSystemTableContent">
              <RescueGroupTable
                rescueGroupData={rescueGroup}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
              />
            </div>
            <div>
              <Pagination
                totalCountOfRegisters={rescueGroupWithoutPagination.data.length}
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
