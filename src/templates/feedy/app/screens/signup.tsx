import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Platform, ImageBackground } from 'react-native';
import { Link, router, Stack } from 'expo-router';
import Input from '@/components/forms/Input';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import useThemeColors from '@/app/contexts/ThemeColors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AnimatedView from '@/components/AnimatedView';
import Icon from '@/components/Icon';
import { AntDesign } from '@expo/vector-icons';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');

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

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) {
      strength += 25;
    } else {
      feedback.push('At least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Add uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Add lowercase letter');
    }

    // Numbers or special characters check
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Add number or special character');
    }

    setPasswordStrength(strength);
    setStrengthText(feedback.join(' • ') || 'Strong password!');
    return strength >= 75;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    const isStrong = checkPasswordStrength(password);
    if (!isStrong) {
      setPasswordError('Please create a stronger password');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSignup = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to home screen after successful login
        router.replace('/screens/login-flow/welcome');
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
                      <Pressable className='flex-1 bg-secondary p-3 rounded-2xl'>
                        <ThemedText className="text-sm text-center">Login</ThemedText>
                      </Pressable>
                    </Link>
                    <Link href="/screens/signup" asChild>
                      <Pressable className='flex-1 bg-background p-3 rounded-xl'>
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
                      checkPasswordStrength(text);
                      if (passwordError) validatePassword(text);
                    }}
                    error={passwordError}
                    isPassword={true}
                    autoCapitalize="none"
                  />

                  <Input
                    label="Confirm password"
                    variant='animated'
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (confirmPasswordError) validateConfirmPassword(text);
                    }}
                    error={confirmPasswordError}
                    isPassword={true}
                    autoCapitalize="none"
                  />

                  {password.length > 0 && (
                    <View className="mb-4">
                      <View className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <View
                          className={`h-full rounded-full ${passwordStrength >= 75 ? 'bg-green-500' : passwordStrength >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </View>
                      <ThemedText className="text-xs mt-1 opacity-50">
                        {strengthText}
                      </ThemedText>
                    </View>
                  )}

                  <Button
                    title="Sign up"
                    onPress={handleSignup}
                    loading={isLoading}
                    size="large"
                    className="mb-4 !bg-highlight"
                    rounded="full"
                    textClassName='!text-black'
                  />

                  <View className="flex-row gap-4  p-1.5 rounded-2xl mb-4">
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

                  <View className="flex-row justify-center">
                    <ThemedText className="text-sm opacity-50">By signing up you agree to our Terms & Conditions</ThemedText>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </LinearGradient>

      </ImageBackground>
    </>
  );
}
