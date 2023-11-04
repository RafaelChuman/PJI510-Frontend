import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { ErrorMessage } from "@hookform/error-message";
import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiRefreshLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { Container } from "./user.styled";
import InputMask from "react-input-mask";
import { User } from "@/services/entities";

interface UserEditProps {
  user: User;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setUser: (value: SetStateAction<User | undefined>) => void;
}

export default function UserEditComponent({
  user,
  setUser,
  setCheckBoxValues,
}: UserEditProps) {
  
  
  const { register, handleSubmit, formState } = useForm<User>();
  const [Error, setError] = useState("");

  const editUser = useMutation(
    async (UserUpd: User) => {
      const response = await api.put("user", {
        id: user.id,
        name: UserUpd.name,
        password: UserUpd.password,
        celular: UserUpd.celular,
        telegram: UserUpd.telegram,
        email: UserUpd.email,
        imgPath: UserUpd.imgPath,
      });

      return response;
    },
    {
      onSuccess: () => {
        setUser(undefined);
        setCheckBoxValues([]);
        queryClient.invalidateQueries("User");
      },
    }
  );

  const handleEditUser: SubmitHandler<User> = async (values: User) => {
    values.celular = Number(values.celular.toString().replace(/[^0-9]/g, ""));
   
    const response = await editUser.mutateAsync(values);

    if (response.status != 200) {
      const mesage = response.status;

      if (mesage != undefined) {
        setError(mesage.toString());
      }
    }
  };

  const password = register("password", {
    required: false,
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

  return (
    <Container>
      <h1>Usuários</h1>

      <div>
        <div className="DivFormFields">
          <label>Nome:</label>
          <label>{user.name}</label>
        </div>
        <div className="DivFormFields">
          <label>UserName:</label>
          <label>{user.userName}</label>
        </div>

        <div className="DivFormFields">
          <label>Telefone:</label>
          <label>{user.celular}</label>
        </div>
        <div className="DivFormFields">
          <label>Telegram:</label>
          <label>{user.telegram}</label>
        </div>
        <div className="DivFormFields">
          <label>Email:</label>
          <label>{user.email}</label>
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleEditUser)}
          className="userContent"
          title={"Form Editar Usuário"}
          placeholder={"Form Editar Usuário"}
        >
          <p>{Error}</p>
          
          <div className="DivFormFields">
            {" "}
            <label>Nome:</label>
            <input
              alt="Usuário"
              type="text"
              title="Usuário"
              placeholder="Name"
              defaultValue={user.name}
              {...name}
            />
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="name" />
          </div>

          <div className="DivFormFields">
            {" "}
            <label>Senha:</label>
            <input
              alt="Senha"
              type="text"
              title="Senha"
              placeholder="Senha"
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
              defaultValue={user.celular}
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
              defaultValue={user.telegram}
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
              defaultValue={user.email}
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
              defaultValue={user.imgPath}
              {...imgPath}
            />
          </div>
          <div>
            <ErrorMessage errors={formState.errors} name="imgPath" />
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
