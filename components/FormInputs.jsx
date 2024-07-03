import { useState, useCallback } from "react";
import { TextInput, Button, Text, Dialog, Portal } from "react-native-paper";
import { Controller, set } from "react-hook-form";
import { View, FlatList, TouchableOpacity } from "react-native";

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
            style={style}
            label={placeholder}
            mode="outlined"
            {...props}
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
  const [selectedName, setSelectedName] = useState("");
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
          <View>
            <TouchableOpacity onPress={openPicker} className={`${width} -z-1`}>
              <TextInput
                style={style}
                placeholder={placeholder}
                editable={false}
                mode="outlined"
                value={selectedName}
                error={!!error}
                right={
                  <TextInput.Icon
                    pointerEvents="none"
                    icon="chevron-down"
                    size={20}
                  />
                }
              />
            </TouchableOpacity>
            {error && (
              <Text className="text-theme-error font-bold">
                {error.message}
              </Text>
            )}
          </View>
          <View>
            <Portal>
              <Dialog visible={show} onDismiss={() => setShow(false)}>
                <Dialog.Title className="font-bold">{placeholder}</Dialog.Title>
                <Dialog.Content>
                  <FlatList
                    data={options}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          onChange(item.value);
                          setSelectedName(item.name);
                          setShow(false);
                        }}
                        className="my-2 "
                      >
                        <Text className="text-lg font-bold ">{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.value}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setShow(false)}>Cerrar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </>
      )}
    />
  );
};
