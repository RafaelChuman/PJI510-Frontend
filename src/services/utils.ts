
interface dataToComboBox {
  id?: string;
  name: string;
}

export function convertToDateBR(date: Date | string | undefined) {
  let value = "";

  if (date) {
    try {
      value = new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch(erro) {
      console.log(erro)
    }
  }

  return value;
}

export function convertToBRL(value: string | undefined) {
  let valor = 0;

  if (value === undefined || value === "") {
    valor = 0;
  } else {
    valor = parseInt(value);
  }

  const valueFormated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor / 100);

  return valueFormated;
}

export function convertToWhatsAppMask(value: string | undefined) {
  let valueFormated = "";

  if (value?.length == 11) {
    valueFormated = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(
      3,
      7
    )}-${value.slice(7, 11)}`;
  }

  return valueFormated;
}

export function returnPaginatedData<Type>(
  schema: Type[] | undefined,
  page: number,
  perPage: number
): Type[] | undefined {
  if (!schema) {
    return undefined;
  }
  const startPage = (page - 1) * perPage;
  const endPage = startPage + perPage;

  return schema.slice(startPage, endPage);
}
