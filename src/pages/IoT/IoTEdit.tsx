import { IoT } from "@/services/entities";
import LubrificationSystemsComponent from "../RescueGroup";
import { Container } from "./IoT.styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { RiAddFill, RiArrowGoBackFill } from "react-icons/ri";
import { ErrorMessage } from "@hookform/error-message";
import { ComboBox } from "@/components/ComboBox";
import { useGroup } from "@/services/hooks/useGroup";

export interface IoTEditParams {
  ioT: IoT;
  setIoT: (values: SetStateAction<IoT | undefined>) => void;
}

export default function IoTEditComponent({ ioT, setIoT }: IoTEditParams) {
  const { register, handleSubmit, formState } = useForm<IoT>();
  const [error, setError] = useState("");

  const groupWithoutFormat = useGroup();

  const name = register("name", {
    required: "O name é obrigatório",
    min: {
      value: 3,
      message: "O Nome deve ter pelo menos 3 caracteres.",
    },
    maxLength: {
      value: 25,
      message: "O Nome deve ter no máximo 25 caracteres",
    },
  });

  const group = register("Group", {
    required: "O Grupo é obrigatório",
  });

  const edit = useMutation(
    async (iot: IoT) => {
      const response = await api.put("ioT", {
        id: ioT.id,
        name: iot?.name,
        group: iot?.Group,
      });

      return response;
    },
    {
      onSuccess: () => {
        setIoT(undefined);
        queryClient.invalidateQueries("IoT");
      },
    }
  );

  const handleCreate: SubmitHandler<IoT> = async (values: IoT) => {
    const response = await edit.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setError(mesage.toString());
      }
    }
  };

  return (
    <Container>
      <div>
        <h1>Edit IoT</h1>
        <div className="DivFormFields">
          <label>IoT:</label>
          <label className="IoTEditLabelContent"> {ioT.name}</label>
        </div>
        <div className="DivFormFields">
          <label>Grupo:</label>
          <label className="IoTEditLabelContent"> {ioT.Group.name}</label>
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className="IoTContent"
          title={"Form Criar IoT"}
          placeholder={"Form Criar IoT"}
        >
          <div className="DivFormFields">
            <label>Nome: </label>
            <input
              width="100%"
              alt="Nome"
              type="text"
              title="Nome"
              placeholder="Nome do IoT"
              {...name}
            />
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="name" />
          </div>

          <div className="DivFormFields">
            {groupWithoutFormat.data ? (
              <>
                <label>Selecione o Grupo: </label>
                <ComboBox
                  comboboxData={groupWithoutFormat.data}
                  handleClick={() => console.log("Combobox Clicked")}
                  title={"Grupo"}
                  {...group}
                ></ComboBox>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="group" />
          </div>

          <div className="DivFormFields">
            <button type={"submit"} disabled={formState.isSubmitting}>
              {formState.isSubmitting ? (
                "..."
              ) : (
                <>
                  <RiAddFill /> Salvar
                </>
              )}
            </button>

            <button
              className="ReturnButton"
              onClick={() => {
                setIoT(undefined);
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
