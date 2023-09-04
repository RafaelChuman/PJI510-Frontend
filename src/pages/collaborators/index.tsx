import { Pagination } from "@/components/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCollaborators } from "@/services/hooks/useCollaborators";
import { CollaboratorTable } from "@/components/collaborators/CollaboratorTable";
import { returnPaginatedData } from "@/services/utils";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import InputMask from "react-input-mask";
import { Container } from "./collaborators.styled";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import EditCollaboratorComponent from "./editCollaborator";
import { Collaborators } from "@/services/entities";

export default function CollaboratorsComponent() {
  const today = new Date();
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState, control } =
    useForm<Collaborators>();

  const [ErrorCollaborator, setErrorCollaborator] = useState("");

  const [collaboratorCurrentPage, setCollaboratorCurrentPage] = useState(1);
  const [collaboratorNumberPage, setCollaboratorNumberPage] = useState(1);

  const collaboratorsWithoutPagination = useCollaborators();

  const formDeletion = useForm();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();
  const [collaborator, setCollaborator] = useState<Collaborators>();

  let collaborators;

  const createCollaborator = useMutation(
    async (collaborator: Collaborators) => {
      const response = await api.post("collaborators", {
        name: collaborator.name,
        whatsApp: collaborator.whatsApp,
        cellphone: collaborator.cellphone,
        cep: collaborator.cep,
        numberAddress: collaborator.numberAddress,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("collaborators");
      },
    }
  );

  if (collaboratorsWithoutPagination.data) {
    collaborators = returnPaginatedData<Collaborators>(
      collaboratorsWithoutPagination.data,
      collaboratorCurrentPage,
      numberOfItensPerPage
    );
  }

  const name = register("name", {
    required: "Nome do Collaborador é obrigatório",
    minLength: {
      value: 5,
      message: "O Nome do  Collaborador deve ter pelo menos 5 caracteres",
    },
    maxLength: {
      value: 30,
      message: "O Nome do Collaborador deve ter no máximo 30 caracteres",
    },
  });

  const cep = register("cep", {
    required: "O CEP é obrigatório",
    pattern: {
      value: /[0-9]{2}\.[0-9]{3}\-[0-9]{3}/g,
      message: "CEP inválido.",
    },
  });

  const numberAddress = register("numberAddress", {
    required: "O Número é obrigatório",
    minLength: {
      value: 1,
      message: "O Número deve ter pelo menos 1 caracteres",
    },
    maxLength: {
      value: 8,
      message: "O Número deve ter no máximo 8 caracteres",
    },
  });

  const cellphone = register("cellphone", {
    required: "O Celular é obrigatório",
    pattern: {
      value: /\([0-9]{2}\) [9] [0-9]{4}\-[0-9]{4}/g,
      message: "Celular inválido.",
    },
  });

  const whatsApp = register("whatsApp", {
    required: { value: false, message: "O Contato por Whatsapp é opcional" },
    pattern: {
      value: /\([0-9]{2}\) [9] [0-9]{4}\-[0-9]{4}/g,
      message: "whatsApp inválido.",
    },
  });

  const handleCreateCollaborator: SubmitHandler<Collaborators> = async (
    values: Collaborators
  ) => {
    values.cep = values.cep.toString().replace(/[^0-9]/g, "");
    values.cellphone = values.cellphone.toString().replace(/[^0-9]/g, "");
    values.whatsApp = values.whatsApp.toString().replace(/[^0-9]/g, "");

    const response = await createCollaborator.mutateAsync(values);

    if (response.status == 200) {
      const mesage = response.status;

      if (mesage != undefined) {
        setErrorCollaborator(mesage.toString());
      }
    }
  };

  async function handleDelete() {
    const response = await api.delete(`collaborators`, {
      data: {
        ids: checkBoxValues,
      },
    });

    if (collaborators.length == checkBoxValues?.length) {
      if (collaboratorCurrentPage > 1) {
        setCollaboratorCurrentPage(collaboratorCurrentPage - 1);
      }
    }

    setCheckBoxValues([]);

    await queryClient.invalidateQueries("collaborators");
  }

  if (collaborator) {
    return (
      <EditCollaboratorComponent
        setCheckBoxValues={setCheckBoxValues}
        setCollaborator={setCollaborator}
        collaborator={collaborator}
      ></EditCollaboratorComponent>
    );
  }
  return (
    <Container>
      <Container>
        <h1>Colaboradores</h1>
        <form onSubmit={handleSubmit(handleCreateCollaborator)}>
          <p>{ErrorCollaborator}</p>
          <div className="FormContent">
            <div className="DivFormFields">
              {" "}
              <label>Insira o Nome:</label>
              <input
                alt="Collaborador"
                type="text"
                title="Collaborador"
                placeholder="Collaborador"
                {...name}
              />
            </div>
            <ErrorMessage errors={formState.errors} name="name" />
            <div></div>
            <div className="DivFormFields">
              <label>Insira o CEP:</label>
              <InputMask
                alt="CEP"
                type="text"
                title="CEP"
                placeholder="__.___ - ___"
                mask={"99.999-999"}
                {...cep}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="cep" />
            </div>
            <div className="DivFormFields">
              <label>Insira o Número:</label>
              <input
                alt="Número"
                type="text"
                title="Número"
                placeholder="Número"
                {...numberAddress}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="numberAddress" />
            </div>
            <div className="DivFormFields">
              <label>Insira o Telefone:</label>
              <InputMask
                alt="Celular"
                type="text"
                title="Celular"
                placeholder="(__) 9 ____ - ____"
                mask={"(99) 9 9999-9999"}
                {...cellphone}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="cellphone" />
            </div>
            <div className="DivFormFields">
              <label>Insira o WhatsApp:</label>
              <InputMask
                alt="WhatsApp"
                type="text"
                title="whatsApp"
                placeholder="(__) 9 ____ - ____"
                mask={"(99) 9 9999-9999"}
                {...whatsApp}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="whatsApp" />
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
            </div>
          </div>
        </form>
      </Container>

      {collaboratorsWithoutPagination.isLoading ? (
        "..."
      ) : collaboratorsWithoutPagination.error ? (
        <div>
          <p>Falha ao Obter Dados</p>
        </div>
      ) : (
        <div className="TreatmentTableContainer">
          <form
            title={"Form Excluir Colaborador"}
            placeholder={"Form Excluir Colaborador"}
            onSubmit={formDeletion.handleSubmit(handleDelete)}
          >
            {collaboratorsWithoutPagination.data && (
              <>
                <CollaboratorTable
                  collaboratorsData={collaborators}
                  checkBoxValues={checkBoxValues}
                  setCheckBoxValues={setCheckBoxValues}
                  setCollaborator={setCollaborator}
                />

                <Pagination
                  totalCountOfRegisters={
                    collaboratorsWithoutPagination.data.length
                  }
                  currentPage={collaboratorCurrentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setCollaboratorCurrentPage}
                ></Pagination>
              </>
            )}
            <button type="submit" className="DeleteButton">
              <RiCloseFill /> Excluir
            </button>
          </form>
        </div>
      )}
    </Container>
  );
}
