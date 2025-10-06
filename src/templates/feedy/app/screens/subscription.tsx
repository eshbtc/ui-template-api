import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import useThemeColors from '../contexts/ThemeColors';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import ThemedFooter from '@/components/ThemeFooter';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import { ActionSheetRef } from 'react-native-actions-sheet';
import Switch from '@/components/forms/Switch';

export default function EditProfileScreen() {
    const [selectedPlan, setSelectedPlan] = useState('Monthly');
    const actionSheetRef = useRef<ActionSheetRef>(null);
    return (
        <>
            <View className='flex-1 bg-background'>
                <Header showBackButton />
                <ThemedScroller>

                    <View className='w-full my-10  items-center'>
                        <ThemedText className='font-semibold text-4xl text-center '>Unlock premium features</ThemedText>
                        <ThemedText className='text-lg font-light mt-1 text-center'>Unlock all premium features</ThemedText>
                    </View>
                    <View className=' items-start w-[240px] mx-auto mb-14'>
                        <CheckItem title='No ads' active={true} />
                        <CheckItem title='Unlimited content access' active={true} />
                        <CheckItem title='Offline access' active={true} />
                    </View>
                    
                    <SubscriptionCard
                        icon='Star'
                        title='Weekly'
                        description='Unlock all premium features'
                        price='$19.99'
                        active={selectedPlan === 'Weekly'}
                        onPress={() => setSelectedPlan('Weekly')}
                    />
                    <SubscriptionCard
                        icon='Trophy'
                        title='Monthly'
                        description='All premium features + goal tracker'
                        price='$29.99'
                        discount='20%'
                        active={selectedPlan === 'Monthly'}
                        onPress={() => setSelectedPlan('Monthly')}
                    />
                    <SubscriptionCard
                        icon='Medal'
                        title='Yearly'
                        description='All premium features + goal tracker + 1000+ recipes'
                        price='$199.99'
                        discount='50%'
                        active={selectedPlan === 'Yearly'}
                        onPress={() => setSelectedPlan('Yearly')}
                    />
                    <Switch className='mb-4 mt-4' label='Enable auto renew' />
                </ThemedScroller>
                <ThemedFooter>
                    <ThemedText className='text-sm font-light text-center mb-4'>1 month free trial then $29.99/month</ThemedText>
                    <Button onPress={() => actionSheetRef.current?.show()} className='!bg-highlight' textClassName='!text-black' size='large' rounded='full' title="Upgrade to plus" />
                </ThemedFooter>
            </View>
            <ActionSheetThemed
                gestureEnabled
                containerStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: 10,
                }}
                ref={actionSheetRef}>
                <View className='px-6 pt-10 items-center'>
                    <Icon name='Check' size={24} className='w-20 h-20 bg-background rounded-full mb-6' />
                    <ThemedText className='font-semibold text-4xl'>All setup</ThemedText>
                    <ThemedText className='text-lg text-center px-14 font-light mt-2 mb-32'>Hope you are satisfied. We will update you for the next subscription date.</ThemedText>
                    <Button onPress={() => actionSheetRef.current?.hide()} className='!bg-highlight !px-10' textClassName='!text-black' size='large' rounded='full' title="Upgrade to plus" />
                </View>
            </ActionSheetThemed>
        </>
    );
}

const SubscriptionCard = (props: any) => {
    const colors = useThemeColors()
    return (
        <Pressable onPress={props.onPress} className={`bg-secondary rounded-2xl relative flex-row items-center border mb-4 ${props.active ? 'border-highlight' : ' border-transparent'}`}>


            <View className='py-6 px-6  flex-1 flex-row justify-start items-center'>

                {props.icon && <Icon name="Check" strokeWidth={3} size={18} color={props.active ? 'black' : 'transparent'} className={`rounded-full border w-8 h-8 mr-3 ${props.active ? 'bg-highlight border-highlight' : 'bg-transparent border-border'}`} />}

                <ThemedText className='font-semibold text-xl'>{props.title}</ThemedText>
                {props.discount && <ThemedText className='text-xs font-semibold bg-background text-highlight rounded-full px-2 py-1  ml-2'>{props.discount} off</ThemedText>}
                <ThemedText className='text-lg  ml-auto'>{props.price}</ThemedText>

            </View>
        </Pressable>
    );
}

const CheckItem = (props: any) => {
    return (
        <View className='flex-row items-center my-3'>
            <Icon name="Check" strokeWidth={3} size={15} color={props.active ? 'white' : 'transparent'} className={`rounded-full w-7 h-7 mr-3 ${props.active ? 'bg-lime-500/20' : 'bg-transparent'}`} />
            <ThemedText className='font-semibold text-xl'>{props.title}</ThemedText>
        </View>
    );
}