import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Stack, Link, router } from 'expo-router';
import Input from '@/components/forms/Input';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useThemeColors from '@/app/contexts/ThemeColors';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AnimatedView from '@/components/AnimatedView';
import Icon from '@/components/Icon';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to home screen after successful login
        router.replace('/(drawer)/(tabs)/');
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <>
    <Stack.Screen options={{
      headerShown: false,
      animation: 'none',
    }} />
      <ImageBackground source={require('@/assets/img/wallpaper.webp')} style={{ flex: 1 }}>
        <LinearGradient colors={['transparent', 'transparent']} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            className="flex-1">
            <StatusBar style='light' />


            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
              className='flex-1 justify-center w-full'

            >
              <View className=' w-full flex-1'>
                <View className=' py-14 justify-center px-10' style={{ paddingTop: insets.top + 100}}>
                  <ThemedText className="text-4xl text-center font-outfit-bold">Go ahead and set up your account</ThemedText>
                  <ThemedText className="text-sm text-center opacity-50 mt-2">Create an account to get started</ThemedText>
                </View>
                <View className="p-10 bg-background  rounded-3xl flex-1" style={{ paddingBottom: insets.bottom }}>
                  <View className="flex-row gap-4 bg-secondary p-1.5 rounded-2xl mb-8">
                    <Link href="/screens/login" asChild>
                      <Pressable className='flex-1 bg-background p-3 rounded-xl'>
                        <ThemedText className="text-sm text-center">Login</ThemedText>
                      </Pressable>
                    </Link>
                    <Link href="/screens/signup" asChild>
                      <Pressable className='flex-1 bg-secondary p-3 rounded-2xl'>
                        <ThemedText className="text-sm text-center">Signup</ThemedText>
                      </Pressable>
                    </Link>
                  </View>



                  <Input
                    label="Email"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (emailError) validateEmail(text);
                    }}
                    error={emailError}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    variant='animated'
                  />

                  <Input
                    label="Password"
                    variant='animated'
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (passwordError) validatePassword(text);
                    }}
                    error={passwordError}
                    isPassword={true}
                    autoCapitalize="none"
                  />
                  <Button
                    title="Login"
                    onPress={handleLogin}
                    loading={isLoading}
                    size="large"
                    className="mb-4 !bg-highlight"
                    rounded="full"
                    textClassName='!text-black'
                  />
                  <Link className='underline text-center text-text text-sm mb-4' href="/screens/forgot-password">
                    Forgot Password?
                  </Link>

                  <View className='flex flex-row items-center justify-center gap-2'>
                    <Pressable
                      onPress={() => router.push('/screens/onboarding-start')}
                      className='flex-1 border border-white rounded-full flex flex-row items-center justify-center py-4'
                    >
                      <AntDesign name="google" size={22} color="white" />
                    </Pressable>

                    <Pressable
                      onPress={() => router.push('/screens/onboarding-start')}
                      className='flex-1 border border-white rounded-full flex flex-row items-center justify-center py-4'
                    >
                      <AntDesign name="apple" size={22} color="white" />
                    </Pressable>
                  </View>


                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </LinearGradient>
      </ImageBackground >
    </>
  );
}