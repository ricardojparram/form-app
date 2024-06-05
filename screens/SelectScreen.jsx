import React, { useState, useCallback } from "react";
import { View, StatusBar } from "react-native";
import { Select } from "../components/FormInputs";
import { useForm } from "react-hook-form";
import { Text, Button } from "react-native-paper";

const SelectScreen = ({}) => {
  const { control, handleSubmit } = useForm();

  return (
    <View style={{ top: StatusBar.currentHeight }}>
      <Select
        control={control}
        placeholder="Acronimo"
        name="acronym"
        width="w-40"
        options={["V", "E"]}
        rules={{
          required: "El acronimo es requerido",
        }}
      />
      <Select
        control={control}
        placeholder="Acronimo"
        name="acronym"
        width="w-40"
        options={["V", "E"]}
        rules={{
          required: "El acronimo es requerido",
        }}
      />
      <Button
        className="w-[50%] m-auto mt-4 -z-10"
        mode="contained"
        onPress={handleSubmit((data) => console.log(data))}
      >
        Iniciar sesión
      </Button>
    </View>
  );
};

export default SelectScreen;
