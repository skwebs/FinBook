import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define TypeScript types for form values
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Define Yup validation schema
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = data => {
    console.log("Registration data:", data);
    // Proceed with API call for registration
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image width={100} height={100} style={styles.image} source={require("./../../assets/images/ama128.png")} />
      </View>
      <View style={styles.formContainer}>


        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </View>
          )}
        />

        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    padding: 20
  },
  registerTextContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    gap: 15,
    paddingVertical: 35
  },
});

export default RegisterScreen;
