import { Pagination } from "@/components/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";
import { returnPaginatedData } from "@/services/utils";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useERs } from "@/services/hooks/useERs";
import { Container } from "./ers.styled";
import { ERTable } from "@/components/ers/ERTable";
import { useZones } from "@/services/hooks/useZones";
import { ComboBox } from "@/components/ComboBox";
import EditERsComponent from "./editERs";
import { RiCloseFill, RiAddFill } from "react-icons/ri";
import { ERs } from "@/services/entities";

export default function ERsComponent() {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState } = useForm<ERs>();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();
  const [er, setER] = useState<ERs>();

  const formDeletion = useForm();

  const [ErrorER, setErrorER] = useState("");

  const [erCurrentPage, setERCurrentPage] = useState(1);

  const ersWithoutPagination = useERs();

  const zonesWithoutFormat = useZones();

  let ers;

  const createER = useMutation(
    async (er: ERs) => {
      const response = await api.post("ers", {
        number: er.number,
        zone: er.zone,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ers");
      },
    }
  );

  if (ersWithoutPagination.data) {
    ers = returnPaginatedData<ERs>(
      ersWithoutPagination.data,
      erCurrentPage,
      numberOfItensPerPage
    );
  }

  const number = register("number", {
    required: "O Número da ER é obrigatório",
    min: {
      value: 1,
      message: "O Número da ER deve ser maior que 0.",
    },
    maxLength: {
      value: 1000,
      message: "O Número da ER deve ser menor que 1000.",
    },
    valueAsNumber: true,
  });

  const zone = register("zone", {
    required: "O Zona é obrigatório",
  });

  const handleCreateER: SubmitHandler<ERs> = async (values: ERs) => {
    const response = await createER.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;
      if (mesage != undefined) {
        setErrorER(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`ers`, {
      data: {
        ids: checkBoxValues,
      },
    });

    if (ers.length == checkBoxValues?.length) {
      if (erCurrentPage > 1) setERCurrentPage(erCurrentPage - 1);
    }

    setCheckBoxValues([]);

    await queryClient.invalidateQueries("ers");
  }

  if (er) {
    return <EditERsComponent {...er} />;
  } else {
    return (
      <Container>
        <h1>ER's</h1>
        <div>
          <form
            onSubmit={handleSubmit(handleCreateER)}
            className="zonaContent"
            title={"Form Criar Zona"}
            placeholder={"Form Criar Zona"}
          >
            <div className="DivFormFields">
              <label>Insira o Número da ER: </label>
              <input
                width="100%"
                alt="Número"
                type="number"
                title="Número"
                placeholder="Número da ER"
                {...number}
              />
            </div>
            <div><ErrorMessage errors={formState.errors} name="number" /></div>

            <div className="DivFormFields">
              {zonesWithoutFormat.data ? (
                <>
                  <label>Selecione a Zona: </label>
                  <ComboBox
                    comboboxData={zonesWithoutFormat.data}
                    handleClick={() => console.log("Combobox Clicked")}
                    title={"Zones"}
                    {...zone}
                  ></ComboBox>
                </>
              ) : (
                <></>
              )}
            </div>
            <div><ErrorMessage errors={formState.errors} name="zone" /></div>

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

        {ersWithoutPagination.isLoading
          ? "..."
          : ersWithoutPagination.error
          ? "Falha ao Obter Dados"
          : ersWithoutPagination.data && (
              <form
                title={"Form Excluir ER"}
                placeholder={"Form Excluir ER"}
                onSubmit={formDeletion.handleSubmit(handleDelete)}
              >
                <div className="ERTableContent">
                  <ERTable
                    erData={ers}
                    checkBoxValues={checkBoxValues}
                    setCheckBoxValues={setCheckBoxValues}
                    SetERValues={setER}
                  />
                </div>
                <Pagination
                  totalCountOfRegisters={ersWithoutPagination.data.length}
                  currentPage={erCurrentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setERCurrentPage}
                ></Pagination>

                <button type="submit" className="DeleteButton">
                  <RiCloseFill /> Excluir
                </button>
              </form>
            )}
        {ErrorER}
      </Container>
    );
  }
}
