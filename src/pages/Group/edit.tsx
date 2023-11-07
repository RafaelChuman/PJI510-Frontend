import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { ErrorMessage } from "@hookform/error-message";
import { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiArrowGoBackFill, RiRefreshLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { Container } from "./group.styled";
import { convertToDateBR } from "@/services/utils";
import { Group } from "@/services/entities";

interface GroupEditProps {
  group: Group;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setGroup: (value: SetStateAction<Group | undefined>) => void;
}

export default function EditGroupComponent({
  group,
  setGroup,
  setCheckBoxValues,
}: GroupEditProps) {
  const { register, handleSubmit, formState } = useForm<Group>();

  const editGroup = useMutation(
    async (group: Group) => {
      const response = await api.put("group", {
        id: group.id,
        name: group.name,
        temperature: group.temperature,
        humidity: group.humidity,
        noBreak: group.noBreak,
      });

      return response;
    },
    {
      onSuccess: () => {
        setGroup(undefined);
        setCheckBoxValues([]);
        queryClient.invalidateQueries("Group");
      },
    }
  );

  const handleEdit: SubmitHandler<Group> = async (values: Group) => {
    const response = await editGroup.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
    }
  };

  const name = register("name", {
    required: "Nome é obrigatório",
    minLength: {
      value: 3,
      message: "O Nome deve ter pelo menos 3 caracteres",
    },
    maxLength: {
      value: 10,
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

  return (
    <Container>
      <h1>Grupos</h1>

      <div className="Fields">
        <label>ID:</label>
        <label>{group.id}</label>
      </div>
      <div className="Fields">
        <label>Nome do Grupo:</label>
        <label>{group.name}</label>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleEdit)}
          className="groupContent"
          title={"Form Editar Group"}
          placeholder={"Form Editar Group"}
        >
          <div className="Fields">
            <label>Nome:</label>
            <input
              width="100%"
              alt="Name"
              type="text"
              title="Name"
              placeholder={group.name.toString()}
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
              type="text"
              title="Humidity"
              placeholder={group.humidity.toString()}
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
              type="text"
              title="Temperature"
              placeholder={group.temperature.toString()}
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
              type="text"
              title="NoBreak"
              placeholder={group.noBreak.toString()}
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
                  <RiRefreshLine /> Atualizar
                </>
              )}
            </button>

            <button
              className="ReturnButton"
              onClick={() => {
                setGroup(undefined);
              }}
            >
              <RiArrowGoBackFill /> Retornar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
