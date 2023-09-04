import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { ErrorMessage } from "@hookform/error-message";
import { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiRefreshLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { Container } from "./activities.styled";
import { Activities } from "@/services/entities";
import { convertToDateBR } from "@/services/utils";

interface EditActivityProps {
  activity: Activities;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setActivity: (value: SetStateAction<Activities | undefined>) => void;
}

export default function EditActivityComponent({
  activity,
  setActivity,
  setCheckBoxValues,
}: EditActivityProps) {
  const { register, handleSubmit, formState } = useForm<Activities>();

  const editActivity = useMutation(
    async (activityUpd: Activities) => {
      const response = await api.put("activities", {
        id: activity.id,
        name: activityUpd.name,
      });

      return response;
    },
    {
      onSuccess: () => {
        setActivity(undefined);
        setCheckBoxValues([]);
        queryClient.invalidateQueries("activities");
      },
    }
  );

  const handleEditActivity: SubmitHandler<Activities> = async (
    values: Activities
  ) => {
    const response = await editActivity.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
    }
  };

  const name = register("name", {
    required: "Nome do Seriviço é obrigatório",
    minLength: {
      value: 3,
      message: "O Nome do Seriviço  deve ter pelo menos 3 caracteres",
    },
    maxLength: {
      value: 10,
      message: "O Nome do Seriviço  deve ter no máximo 10 caracteres",
    },
  });

  return (
    <Container>
      <h1>Atividades</h1>

      <div className="Fields">
        <label>ID:</label>
        <label>{activity.id}</label>
      </div>
      <div className="Fields">
        <label>Nome da Atividade:</label>
        <label>{activity.name}</label>
      </div>
      <div className="Fields">
        <label>Data Criação:</label>
        <label>{convertToDateBR(activity.createdAt)}</label>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleEditActivity)}
          className="activityContent"
          title={"Form Editar Serviço"}
          placeholder={"Form Editar Serviço"}
        >
          <div>
            <label>Insira a descrição do Serviço:</label>
            <input
              width="100%"
              alt="Serviço"
              type="text"
              title="Serviço"
              placeholder="Serviço"
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
                  <RiRefreshLine /> Editar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
