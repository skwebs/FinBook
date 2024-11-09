import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthRootStackParamList } from '../../navigation/AuthNavigator';

// Define TypeScript types for form values
type LoginFormData = {
  username: string;
  email: string;
  password: string;
};

type LoginScreenProps = NativeStackScreenProps<AuthRootStackParamList, 'Login'>

// Define Yup validation schema
const schema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
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

  const onPress = () => {
    Alert.alert("onPress");
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image width={100} height={100} style={styles.image} source={require("./../../assets/images/ama128.png")} />
      </View>
      {/* <Text style={styles.title}>Login</Text> */}

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
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

export default LoginScreen;
