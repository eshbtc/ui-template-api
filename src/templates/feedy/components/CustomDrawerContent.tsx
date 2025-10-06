import { Link, router } from 'expo-router';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import ThemedText from './ThemedText';
import Icon, { IconName } from './Icon';
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';
import ThemedScroller from './ThemeScroller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionSheetThemed from './ActionSheetThemed';
import { ActionSheetRef } from 'react-native-actions-sheet';
import React, { useRef } from 'react';

export default function CustomDrawerContent() {
    const insets = useSafeAreaInsets();
    const switchAccountRef = useRef<ActionSheetRef>(null);
    return (
        <>
            <ThemedScroller className="flex-1 !px-10 bg-background " style={{ paddingTop: insets.top }}>


                {/* User Profile Section */}
                <View className=" mb-8 py-10 border-b border-border   rounded-xl">
                    <View className='flex-row items-center justify-between'>
                        <Avatar src={require('@/assets/img/thomino.jpg')} size="md" />
                        <View className='flex-row items-center'>
                            <Avatar bgColor='bg-slate-500' size="xxs" name="Thomino" />
                            <Icon name="CircleEllipsis" size={27} className='ml-2' onPress={() => switchAccountRef.current?.show()} />
                        </View>
                    </View>
                    <View className="mt-4">
                        <View className='flex-row items-center'>
                            <ThemedText className="font-semibold text-xl">Thomino</ThemedText>
                            <Icon name="Verified" size={16} strokeWidth={2} color="lime" className='ml-2' />
                        </View>
                        <ThemedText className="text-base opacity-50">ThominoDesign</ThemedText>
                    </View>
                </View>

                <View className='flex-col pb-6 mb-6 border-b border-border'>
                    <NavItem href="/(drawer)/(tabs)/profile" icon="User" label="Profile" />
                    <NavItem href="/screens/subscription" icon="Trophy" label="Premium" />
                    <NavItem href="/screens/chat/list" icon="Mail" label="Inbox" />
                    <NavItem href="/(drawer)/(tabs)/search" icon="Search" label="Discover" />
                    <NavItem href="/(drawer)/(tabs)/notifications" icon="Bell" label="Notifications" />
                    <NavItem href="/screens/settings" icon="Settings" label="Settings" />
                    <NavItem href="/screens/analytics" icon="ChartBar" label="Analytics" />
                    <NavItem href="/screens/login" icon="LogOut" label="Logout" />

                </View>

                <View className='flex-row justify-between items-center'>
                    <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext'>Version 1.0.0</ThemedText>
                </View>

            </ThemedScroller>
            <SwitchAccountDrawer ref={switchAccountRef} />
        </>
    );
}

type NavItemProps = {
    href: string;
    icon: IconName;
    label: string;
    className?: string;
    description?: string;
};

export const NavItem = ({ href, icon, label, description }: NavItemProps) => (
    <TouchableOpacity onPress={() => router.push(href)} className={`flex-row items-center py-4`}>

        <Icon name={icon} size={24} strokeWidth={1.8} className='' />

        <View className='flex-1 ml-6 '>
            {label &&
                <ThemedText className="text-2xl font-semibold ">{label}</ThemedText>
            }
            {description &&
                <ThemedText className='opacity-50 text-xs'>{description}</ThemedText>
            }
        </View>
    </TouchableOpacity>
);


const SwitchAccountDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global'>

                <ProfileItem isSelected src={require('@/assets/img/thomino.jpg')} name='Thomino' label='Personal account' />
                <ProfileItem name='TZ Studios' label='Business account' />
                <Pressable className='items-center justify-center pt-6 mt-6 border-t border-border'>
                    <ThemedText className='text-lg font-semibold'>Add Account</ThemedText>
                </Pressable>

            </View>
        </ActionSheetThemed>
    );
});

const ProfileItem = (props: any) => {
    return (
        <Pressable className='flex-row items-center  bg-secondary rounded-2xl py-4'>
            
            <View className='flex-1'>
                <ThemedText className='font-semibold text-xl'>{props.name}</ThemedText>
                <ThemedText className='text-sm'>{props.label}</ThemedText>
            </View>
            <View className='relative mr-4 flex-row items-center'>
            {props.isSelected && <Icon name='Check' color='white' size={14} strokeWidth={2} className=' w-7 mr-2 h-7 bg-highlight rounded-full border-2 border-secondary' />}
                <Avatar bgColor='bg-slate-500' src={props.src} size="sm" name={props.name} className='border border-border' />  
            </View>
        </Pressable>
    );
}


