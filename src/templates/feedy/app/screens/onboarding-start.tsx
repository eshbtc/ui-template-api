import { View, Text, FlatList, Dimensions, Image, Pressable, SafeAreaView, ImageBackground } from 'react-native';
import { useState } from 'react';
import ThemedText from '@/components/ThemedText';
import ThemeToggle from '@/components/ThemeToggle';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import Icon from '@/components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';



export default function OnboardingScreen() {

    const insets = useSafeAreaInsets();

    return (
        <View className='flex-1 bg-background'>
            <ImageBackground
                source={require('@/assets/img/onboarding.jpg')}
                className='w-full h-full absolute top-0 left-0'
            >
            
                    <View className="flex-1 relative items-center justify-center">
                       
                        <ThemedText className='text-white text-4xl font-outfit-bold'>Welcome, Thomino</ThemedText>
                        <ThemedText className='text-white text-lg text-center px-20'>We are excited to have you on board. Let's set up your account.</ThemedText>

                        
                    </View>
                    {/* Login/Signup Buttons */}
                    <View style={{ bottom: insets.bottom }} className="px-6 mb-6">
                            <View className='flex flex-row items-center justify-center gap-2'>
                               
                                <Pressable 
                                    onPress={() => router.push('/screens/onboarding')} 
                                    className='flex-1 bg-highlight rounded-full flex flex-row items-center justify-center py-4'
                                >
                                    <Text className='text-black text-lg font-semibold mr-4'>Let's get started</Text>
                                    <Icon name="ArrowRight" size={20} color="black" />
                                </Pressable>
                             
                            </View>
                        </View>

            </ImageBackground>
        </View>
    );
}
