
async function checkBoxClickEvent(
  event: React.ChangeEvent<HTMLInputElement>,
  checkBoxValues: String[] | undefined,
  setCheckBoxValues: React.Dispatch<React.SetStateAction<String[] | undefined>>
) {
  const isCheked = event.target.checked;
  const checkBoxValue = event.target.id;

  if (isCheked) {
    let valueAlredyExists = undefined;

    if (checkBoxValues) {
      valueAlredyExists = checkBoxValues.find(
        (item: String) => item == checkBoxValue
      );

      if (valueAlredyExists == undefined) {
        setCheckBoxValues([...checkBoxValues, checkBoxValue]);
      }
    } else {
      setCheckBoxValues([checkBoxValue]);
    }
  } else {
    if (checkBoxValues) {
      const valueAlredyExists = checkBoxValues.findIndex(
        (item: String) => item == checkBoxValue
      );

      if (valueAlredyExists > -1) {
        checkBoxValues.splice(valueAlredyExists, 1);
      }
    }
  }
}

interface CheckBoxBasicProps {
  id: string;
}

export interface CheckBoxProps extends React.HTMLProps<HTMLInputElement> {
  dataOfCheckbox: CheckBoxBasicProps;
  checkBoxValues: String[] | undefined,
  setCheckBoxValues: React.Dispatch<React.SetStateAction<String[] | undefined>>,
}

export function Checkbox({
dataOfCheckbox,
  checkBoxValues, 
  setCheckBoxValues,
  ...props
}: CheckBoxProps)  {
  return (
    <input
      type={"checkbox"}
      id={dataOfCheckbox.id}
      value={dataOfCheckbox.id}
      onChange={ (event) => checkBoxClickEvent(event, checkBoxValues, setCheckBoxValues)}
      {...props}
    ></input>
  );
};
