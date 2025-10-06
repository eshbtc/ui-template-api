import React, { useState } from 'react';
import { View, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '@/components/forms/Input';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AnimatedView from '@/components/AnimatedView';
import Icon from '@/components/Icon';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
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

  const handleResetPassword = () => {
    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Show success message
        Alert.alert(
          "Password Reset Link Sent",
          "We've sent a password reset link to your email address. Please check your inbox.",
          [
            { text: "OK", onPress: () => router.back() }
          ]
        );
      }, 1500);
    }
  };

  return (
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
            <AnimatedView duration={500} delay={200} animation='slideInBottom' className=' w-full flex-1'>
              <View className=' py-14 flex-1 justify-center px-10'>
                <ThemedText className="text-4xl text-center font-outfit-bold">Reset your password</ThemedText>
                <ThemedText className="text-sm text-center opacity-50 mt-2">Enter your email to receive a reset link</ThemedText>
              </View>
              <View className="p-10 bg-background  rounded-3xl flex-1" style={{ paddingBottom: insets.bottom }}>
              

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

                <Button
                  title="Send Reset Link"
                  onPress={handleResetPassword}
                  loading={isLoading}
                  size="large"
                  className="mb-4 !bg-highlight"
                  rounded="full"
                  textClassName='!text-black'
                />

                <Link className='underline text-center text-text text-sm mb-4' href="/screens/login">
                  Back to Login
                </Link>
              </View>
            </AnimatedView>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}