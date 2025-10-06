import Icon from '@/components/Icon';
import { useThemeColors } from 'app/contexts/ThemeColors';
import { TabButton } from 'components/TabButton';
import { router } from 'expo-router';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{
          alignItems: 'center',
          backgroundColor: colors.bg,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Home Tab */}
        <TabTrigger
          name="index"
          href="/"
          asChild
        >
          <TabButton labelAnimated={true} icon="Home">Home</TabButton>
        </TabTrigger>

        <TabTrigger
          name="search"
          href="/search"
          asChild
        >
          <TabButton labelAnimated={true} icon="Search">Search</TabButton>
        </TabTrigger>

        <View className='w-1/5 items-center justify-center'>
          <Pressable onPress={() => router.push('/screens/add-post')} className='w-full'>
            <Icon name="SquarePlus" size={24} className='opacity-40' color={colors.text} />
          </Pressable>
        </View>

      
        <TabTrigger
          name="notifications"
          href="/notifications"
          asChild
        >
          <TabButton labelAnimated={true} icon="Bell" hasBadge>Notifications</TabButton>
        </TabTrigger>

        <TabTrigger
          name="profile"
          href="/profile"
          asChild
        >
          <TabButton labelAnimated={true} avatar={require('@/assets/img/thomino.jpg')}>Profile</TabButton>
        </TabTrigger>


      </TabList>
    </Tabs>
  );
}
