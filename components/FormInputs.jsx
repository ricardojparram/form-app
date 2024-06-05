import React, { useState, useCallback } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { Controller, set } from "react-hook-form";
import { View, FlatList, TouchableOpacity, StatusBar } from "react-native";

export const CustomInput = ({
  rules,
  control,
  name,
  placeholder,
  default_value = "",
  style,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onBlur, onChange },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            {...props}
            style={style}
            label={placeholder}
            mode="outlined"
            value={value}
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
          />
          {error && (
            <Text className="text-theme-error font-bold">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};

export const PasswordInput = ({
  rules,
  control,
  name,
  placeholder,
  default_value = "",
  style,
  ...props
}) => {
  const [passwordTypeText, setpasswordTypeText] = useState(true);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onBlur, onChange },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={style}
            label={placeholder}
            secureTextEntry={passwordTypeText}
            mode="outlined"
            autoCapitalize="none"
            value={value}
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
            right={
              <TextInput.Icon
                icon={passwordTypeText ? "eye" : "eye-off"}
                onPress={() => setpasswordTypeText(!passwordTypeText)}
              />
            }
            {...props}
          />
          {error && (
            <Text className="text-theme-error font-bold">{error.message}</Text>
          )}
        </>
      )}
    />
  );
};

export const AnchorText = ({ children, additionalText = "", href, style }) => {
  return (
    <Button mode="text" onPress={href} style={style}>
      <Text className="">{additionalText}</Text>
      {children}
    </Button>
  );
};

export const Select = ({
  rules,
  control,
  name,
  placeholder,
  default_value = "",
  style,
  width,
  options = [],
  ...props
}) => {
  const [show, setShow] = useState(false);
  const openPicker = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View
            className="flex flex-row justify-around my-5"
            style={{ top: StatusBar.currentHeight }}
          >
            <TouchableOpacity onPress={openPicker} className={`${width} `}>
              <TextInput
                label={placeholder}
                style={style}
                editable={false}
                mode="outlined"
                value={value}
                error={error}
                right={
                  <TextInput.Icon
                    pointerEvents="none"
                    icon="chevron-down"
                    size={20}
                  />
                }
              />
              {show ? (
                <FlatList
                  className="bg-theme-background border border-theme-primar rounded z-50 w-full mt-[60px] absolute"
                  style={{
                    elevation: 5,
                    zIndex: 50,
                  }}
                  data={options}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        onChange(item);
                        setShow(false);
                      }}
                    >
                      <Text style={{ padding: 8 }}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
              ) : null}
            </TouchableOpacity>
            {error && (
              <Text className="text-theme-error font-bold">
                {error.message}
              </Text>
            )}
          </View>
        </>
      )}
    />
  );
};
