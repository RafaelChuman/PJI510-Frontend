import React, { forwardRef } from "react";
import Select, { MultiValue } from "react-select";

export interface OptionsCombobox {
  id: string;
  name: string;
}

interface ComboBoxProps<T extends OptionsCombobox> {
  comboBoxData: T[];
  comboBoxDefaultValues: T[];
  comboBoxSetValues: (comboBoxData: T[]) => void;
}


function FormatDataToCombobox<T extends OptionsCombobox>(
  allData: T[] | undefined
) {
  if (allData) {
    const formatedData = allData.map((data) => {
      return {
        value: data.id ? data.id : "",
        label: data.name,
      };
    });

    return formatedData;
  }
  return [
    {
      value: "",
      label: "",
    },
  ];
}

function comboBoxInner<T extends OptionsCombobox>({
  comboBoxData,
  comboBoxDefaultValues,
  comboBoxSetValues,
  
}: ComboBoxProps<T>,
ref: React.LegacyRef<HTMLSelectElement> | undefined) {
  function updateDefaultValues(
    selectedOptions: MultiValue<{
      value: string;
      label: string;
    }>
  ) {
    let newComboBoxDefaultValues : T[] = [];
    
    selectedOptions.map((item) => {

      const foundItem = comboBoxData.find((data) => data.name === item.label);
      if (typeof foundItem !== "undefined") newComboBoxDefaultValues.push(foundItem);
    });

    
    if (newComboBoxDefaultValues)
      comboBoxSetValues(newComboBoxDefaultValues);
  }

  if (comboBoxData) {
    const comboboxDataFormated = FormatDataToCombobox(comboBoxData);
    const comboBoxDefaultValuesFormated = FormatDataToCombobox(
      comboBoxDefaultValues
    );

    if (comboBoxDefaultValuesFormated.length == 0) {
      return (
        <Select
          isMulti
          name="colors"
          options={comboboxDataFormated}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={updateDefaultValues}
        />
      );
    }

    return (
      <Select
        defaultValue={comboBoxDefaultValuesFormated}
        isMulti
        name="colors"
        options={comboboxDataFormated}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={updateDefaultValues}
      />
    );
  }
  return <></>;
}

export const ComboBoxMultiple = forwardRef(comboBoxInner) as <
  T extends OptionsCombobox
>(
  props: ComboBoxProps<T>
) => React.ReactElement;
