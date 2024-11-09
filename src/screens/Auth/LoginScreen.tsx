import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthRootStackParamList } from '../../navigation/AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define TypeScript types for form values
type LoginFormData = {
  email: string;
  password: string;
};

type LoginScreenProps = NativeStackScreenProps<AuthRootStackParamList, 'Login'>

// Define Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    console.log("Registration data:", data);
    // Proceed with API call for registration
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image width={100} height={100} style={styles.image} source={require("./../../assets/images/ama128.png")} />
      </View>
      {/* <Text style={styles.title}>Login</Text> */}

      <View style={styles.formContainer}>


        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (

            <View>
              <Text>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input]}
                  placeholder="email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (

            <View>
              <Text>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
                {errors.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
              </View>
            </View>
          )}
        />


        <Button title="Login" onPress={handleSubmit(onSubmit)} />

        <View style={styles.registerTextContainer}>
          <Text style={{ fontSize: 16 }}>You have not an account?</Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ fontSize: 16, color: "#007AFF" }}>Register</Text>
          </Pressable>
        </View>
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

export default LoginScreen;
