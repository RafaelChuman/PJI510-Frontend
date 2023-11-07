import React, { ChangeEvent, forwardRef, SetStateAction } from "react";

export interface Options {
  id: string;
  name: string;
}

interface ComboBoxProps<T extends Options> extends React.HTMLProps<HTMLSelectElement>{
  comboboxData: T[];
  handleClick: (value: SetStateAction<[] | undefined>) => void;
}

function FormatDataToCombobox<T extends Options>(allData: T[]): Options[] {
  if (allData) {
    const formatedData = allData.map((data) => {
      return {
        id: data.id ? data.id : "",
        name: data.name,
      };
    });

    return formatedData;
  }
  return [
    {
      id: "",
      name: "",
    },
  ];
}

// function handleChange<T extends Options>(
//   event: ChangeEvent<HTMLSelectElement>,
//   { handleClick, comboboxData }: ComboBoxProps<T>
// ) {

//   const value = comboboxData?.find((data) => data.id === event.target.value);

//   if(value)
//     handleClick([value])
// }

function comboBoxInner<T extends Options>(
  { handleClick, comboboxData, ...rest }: ComboBoxProps<T>,
  ref: React.LegacyRef<HTMLSelectElement> | undefined
) {
  if (comboboxData) {
    const comboboxDataFormated = FormatDataToCombobox(comboboxData);

    return (
      <select
        ref={ref}
        {...rest}
        //onChange={(e) => handleChange(e, { handleClick, comboboxData })}
      >
        {comboboxDataFormated?.map((combData) => {
          return (
            <option
              key={combData.id}
              onMouseEnter={() => console.log("Click")}
              value={combData.id}
            >
              {combData.name}
            </option>
          );
        })}
      </select>
    );
  }
  return <></>;
}

export const ComboBox = forwardRef(comboBoxInner);

// () => {
//   handleClick(combData);
// }

// return (
//   <Menu>
//     <MenuButton
//       as={Select}
//       border={"1px"}
//       borderColor={"pink.500"}
//       borderRadius="8px"
//       _hover={{
//         background: "gray.800",
//         color: "gray.200",
//       }}
//       _active={{
//         background: "gray.800",
//         color: "gray.200",
//       }}
//       placeholder={comboboxData?.find((x) => x.id === value)?.value ||
//         placeHolder ||
//         "Selecione uma Opção..."}
//       height={"3rem"}
//       bg={"gray.800"}
//       color="gray.50"
//       w="100%"
//     >

//     </MenuButton>
//     <MenuList
//       w="100%"
//       minWidth={"400px"}
//       alignContent="center"
//       alignItems={"center"}
//       background={"gray.600"}
//       backgroundColor={"gray.600"}
//       border={"1px"}
//       borderColor={"pink.500"}
//     >
//       {comboboxData ? (
//         comboboxData.map((data) => {
//           return (
//             <MenuItem
//               width={"100%"}
//               background={"gray.600"}
//               backgroundColor={"gray.600"}
//               color="gray.50"
//               _hover={{
//                 color: "gray.200",
//               }}
//               _focus={{
//                 color: "gray.200",
//               }}
//               onClick={() => handleClick(data.id)}
//               key={data.id}
//               icon={<RiCheckLine opacity={value === data.id ? 1 : 0} />}
//             >
//               {data.value}
//             </MenuItem>
//           );
//         })
//       ) : (
//         <></>
//       )}
//     </MenuList>
//   </Menu>
// );
