import { useState } from "react";
import { useMutation } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { Pagination } from "@/components/Pagination";
import { returnPaginatedData } from "@/services/utils";
import { ErrorMessage } from "@hookform/error-message";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { User } from "@/services/entities";
import { useUsers } from "@/services/hooks/useUser";
import UserEditComponent from "./edit";
import { UserTable } from "@/components/User/UserTable";
import { Container } from "./user.styled";

export default function UserComponent() {
  const numberOfItensPerPage = 5;

  const { register, handleSubmit, formState, control } = useForm<User>();

  const [Error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const userWithoutPagination = useUsers();

  const formDeletion = useForm();
  const [checkBoxValues, setCheckBoxValues] = useState<String[]>();
  const [UserToEdit, setUserToEdit] = useState<User>();

  let user;

  const userName = register("userName", {
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

  const password = register("password", {
    required: "A senha é obrigatória",
    minLength: {
      value: 5,
      message: "O Nome do  Collaborador deve ter pelo menos 5 caracteres",
    },
    maxLength: {
      value: 30,
      message: "O Nome do Collaborador deve ter no máximo 30 caracteres",
    },
  });

  const name = register("name", {
    required: "Nome é obrigatório",
    minLength: {
      value: 5,
      message: "O Nome deve ter pelo menos 5 caracteres",
    },
    maxLength: {
      value: 50,
      message: "O Nome deve ter no máximo 50 caracteres",
    },
  });

  const celular = register("celular", {
    required: "O Celular é obrigatório",
    pattern: {
      value: /\([0-9]{2}\) [9] [0-9]{4}\-[0-9]{4}/g,
      message: "Celular inválido.",
    },
  });

  const telegram = register("telegram", {
    required: "O Telegram é obrigatório",
    pattern: {
      value: /\([0-9]{2}\) [9] [0-9]{4}\-[0-9]{4}/g,
      message: "Telegram inválido.",
    },
  });

  const imgPath = register("imgPath", {
    required: { value: true, message: "O Contato por Whatsapp é obrigatório" },
    minLength: {
      value: 1,
      message: "O Caminho da Imagem deve ter pelo menos 1 caracteres",
    },
    maxLength: {
      value: 100,
      message: "O Caminho da Imagem deve ter no máximo 100 caracteres",
    },
  });

  const email = register("email", {
    required: { value: true, message: "O Contato por E-Mail é obrigatório" },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "E-Mail inválido.",
    },
  });

  const createUser = useMutation(
    async (user: User) => {
      const response = await api.post("user", {
        name: user.name,
        userName: user.name,
        password: user.password,
        celular: user.celular,
        telegram: user.telegram,
        email: user.email,
        imgPath: user.imgPath,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("User");
      },
    }
  );

  const handleCreate: SubmitHandler<User> = async (values: User) => {
    values.celular = Number(values.celular.toString().replace(/[^0-9]/g, ""));
    values.telegram = values.telegram.toString().replace(/[^0-9]/g, "");

    const response = await createUser.mutateAsync(values);

    if (response.status != 200) {
      const mesage = response.status;

      if (mesage != undefined) {
        setError(mesage.toString());
      }
    }
  };

  async function handleDelete() {

    const response = await api.delete(`user`, {
      data: {
        ids: checkBoxValues,
      },
    });

    if (user.length == checkBoxValues?.length) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }

    setCheckBoxValues([]);

    await queryClient.invalidateQueries("User");
  }

  if (userWithoutPagination.data) {
    user = returnPaginatedData<User>(
      userWithoutPagination.data,
      currentPage,
      numberOfItensPerPage
    );
  }

  if (UserToEdit) {
    return (
      <UserEditComponent
        setCheckBoxValues={setCheckBoxValues}
        setUser={setUserToEdit}
        user={UserToEdit}
      ></UserEditComponent>
    );
  }

  return (
    <Container>
      <Container>
        <h1>Usuários</h1>
        <form onSubmit={handleSubmit(handleCreate)}>
          <p>{Error}</p>

          <div className="FormContent">
            <div className="DivFormFields">
              {" "}
              <label>Nome:</label>
              <input
                alt="Usuário"
                type="text"
                title="Usuário"
                placeholder="Name"
                defaultValue={"Name"}
                {...name}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="name" />
            </div>

            <div className="DivFormFields">
              {" "}
              <label>User Name:</label>
              <input
                alt="User Name"
                type="text"
                title="User Name"
                placeholder="UserName"
                defaultValue={"User Name"}
                {...userName}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="userName" />
            </div>

            <div className="DivFormFields">
              {" "}
              <label>Senha:</label>
              <input
                alt="Senha"
                type="text"
                title="Senha"
                placeholder="Senha"
                defaultValue={"Senha"}
                {...password}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="password" />
            </div>

            <div className="DivFormFields">
              <label>Celular:</label>
              <InputMask
                alt="Celular"
                type="text"
                title="Celular"
                placeholder="Celular"
                mask={"(99) 9 9999-9999"}
                defaultValue={"(12) 9 9999-9999"}
                {...celular}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="celular" />
            </div>

            <div className="DivFormFields">
              <label>Telegram:</label>
              <InputMask
                alt="Telegram"
                type="text"
                title="Telegram"
                placeholder="(__) 9 ____ - ____"
                mask={"(99) 9 9999-9999"}
                defaultValue={"(12) 9 9999-9999"}
                {...telegram}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="telegram" />
            </div>

            <div className="DivFormFields">
              <label>E-Mail:</label>
              <input
                alt="E-Mail"
                type="text"
                title="E-Mail"
                placeholder="exemplo@email.com"
                defaultValue={"exemplo@email.com"}
                {...email}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="email" />
            </div>

            <div className="DivFormFields">
              <label>Cominho Imagem:</label>
              <input
                alt="Imagem"
                type="text"
                title="Imagem"
                placeholder="http://github.com/ImagemDoUsuário"
                defaultValue={"http://github.com/ImagemDoUsuário"}
                {...imgPath}
              />
            </div>
            <div>
              <ErrorMessage errors={formState.errors} name="imgPath" />
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

      {userWithoutPagination.isLoading ? (
        "..."
      ) : userWithoutPagination.error ? (
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
            {userWithoutPagination.data && (
              <>
                <UserTable
                  userData={user}
                  checkBoxValues={checkBoxValues}
                  setCheckBoxValues={setCheckBoxValues}
                  setUser={setUserToEdit}
                />

                <Pagination
                  totalCountOfRegisters={userWithoutPagination.data.length}
                  currentPage={currentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setCurrentPage}
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
