import React from 'react';
import { useController, Control, FieldError } from 'react-hook-form';
import { StyleSheet, TextInput, Text, View, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  control: Control<any>;
  error?: FieldError; // Optional error prop to handle errors specifically
}

const Input: React.FC<InputProps> = ({ label, name, control, error, ...rest }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <View>
      {label ? <Text style={[error ? styles.labelError : null]}>{label}</Text> : null}
      <View style={styles.container}>
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          style={[styles.input, error ? styles.inputError : null]} // Apply error style conditionally
          {...rest}
        />
        {/* Show the error message if there is an error */}
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 65
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 18,
    borderRadius: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  labelError: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
