import { useMutation } from "react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiCloseFill, RiAddFill } from "react-icons/ri";
import { api } from "@/services/api";
import { returnPaginatedData } from "@/services/utils";
import { ErrorMessage } from "@hookform/error-message";
import { Pagination } from "@/components/Pagination";
import { queryClient } from "@/services/queryClient";
import { ComboBox } from "@/components/ComboBox";
import { Container } from "./IoT.styled";
import { IoT } from "@/services/entities";
import { useIoT } from "@/services/hooks/useIoT";
import { useGroup } from "@/services/hooks/useGroup";
import IoTEditComponent from "./IoTEdit";
import { IoTTable } from "@/components/IoT/IoTTable";

export default function IoTComponent() {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState } = useForm<IoT>();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();
  const [ioTEdit, setIoTEdit] = useState<IoT>();

  const formDeletion = useForm();

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ioTWithoutPagination = useIoT();

  const groupWithoutFormat = useGroup();

  let ioT;

  const create = useMutation(
    async (iot: IoT) => {

      console.log(iot)

      const response = await api.post("ioT", {
        name: iot?.name,
        group: iot?.Group,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("IoT");
      },
    }
  );

  if (ioTWithoutPagination.data) {
    ioT = returnPaginatedData<IoT>(
      ioTWithoutPagination.data,
      currentPage,
      numberOfItensPerPage
    );
  }

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

  const handleCreate: SubmitHandler<IoT> = async (values: IoT) => {
    const response = await create.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setError(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`ioT`, {
      data: {
        ids: checkBoxValues,
      },
    });

    if (ioT.length == checkBoxValues?.length) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    setCheckBoxValues([]);

    await queryClient.invalidateQueries("IoT");
  }

  if (ioTEdit) {
    return <IoTEditComponent {...ioTEdit} />;
  } else {
    return (
      <Container>
        <h1>IoT's</h1>
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
            <div><ErrorMessage errors={formState.errors} name="name" /></div>

            <div className="DivFormFields">
              {groupWithoutFormat.data ? (
                <>
                  <label>Selecione a Zona: </label>
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
            <div><ErrorMessage errors={formState.errors} name="group" /></div>

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
            </div>
          </form>
        </div>

        {ioTWithoutPagination.isLoading
          ? "..."
          : ioTWithoutPagination.error
          ? "Falha ao Obter Dados"
          : ioTWithoutPagination.data && (
              <form
                title={"Form Excluir IoT"}
                placeholder={"Form Excluir IoT"}
                onSubmit={formDeletion.handleSubmit(handleDelete)}
              >
                <div className="ERTableContent">
                  <IoTTable
                    ioTData={ioT}
                    checkBoxValues={checkBoxValues}
                    setCheckBoxValues={setCheckBoxValues}
                    SetIoTValues={setIoTEdit}
                  />
                </div>
                <Pagination
                  totalCountOfRegisters={ioTWithoutPagination.data.length}
                  currentPage={currentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setCurrentPage}
                ></Pagination>

                <button type="submit" className="DeleteButton">
                  <RiCloseFill /> Excluir
                </button>
              </form>
            )}
        {error}
      </Container>
    );
  }
}
