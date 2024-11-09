import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../components/Input';

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
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one Small letter')
    .matches(/[A-Z]/, 'Password must contain at least one Capital letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors, touchedFields }, } = useForm<RegisterFormData>({
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
            <View style={{ marginBottom: 2 }}>
              <Input
                label='Name'
                name="name"
                control={control}
                error={errors.name}
                placeholder="Name"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (

            <View style={{ marginBottom: 5 }}>
              <Input
                label='Email'
                name="email"
                control={control}
                error={errors.email}
                placeholder="Email"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (

            <View style={{ marginBottom: 5 }}>
              <Input
                label='Password'
                name="password"
                control={control}
                error={errors.password}
                placeholder="Password"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 5 }}>
              <Input
                label='Confirm Password'
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
                placeholder="Confirm Password"
              />
            </View>
          )}
        />

        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </View>
    </View >
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

  inputWrapper: {
    height: 60
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 13
  },
});

export default RegisterScreen;
