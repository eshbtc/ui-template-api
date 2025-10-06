import { View, Pressable, Image } from "react-native";
import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import ThemedText from "./ThemedText";
import Icon from "./Icon";
import { CardScroller } from "./CardScroller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionSheetThemed from "./ActionSheetThemed";
import { ActionSheetRef } from "react-native-actions-sheet";
import { router } from "expo-router";

interface SocialPostProps {
    src?: any;
    name?: string;
    time?: string;
    content?: string;
    images?: string[];
}

export default function SocialPost(props: SocialPostProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const userActionsSheetRef = useRef<ActionSheetRef>(null);
    const insets = useSafeAreaInsets();
    return (
        <>
            <View className=" border-b border-border py-8">
                <View className='items-start flex-row w-full'>
                    <View className="pl-global pr-3 flex-shrink-0 ">
                        <Avatar link="/screens/user-profile" size='sm' src={props.src} />
                    </View>
                    <View className='flex-1 pr-global'>
                        <View className='flex-row items-center justify-start'>
                            <Pressable onPress={() => router.push('/screens/user-profile')}>
                                <ThemedText className='text-base font-bold'>{props.name}</ThemedText>
                            </Pressable>
                            <ThemedText className='text-xs opacity-40 ml-2'>{props.time}</ThemedText>
                            <Icon onPress={() => userActionsSheetRef.current?.show()} name='MoreVertical' size={18} className="ml-auto opacity-60" />
                        </View>
                        {props.content && <Pressable onPress={() => router.push('/screens/post-detail')}><ThemedText className='text-base mb-4'>{props.content}</ThemedText></Pressable>}
                    </View>
                </View>
                {props.images && props.images.length > 1 && (
                    <CardScroller className=''>

                        <View className="w-16" />
                        {props.images.map((imageUri, index) => (
                            <Pressable key={index} onPress={() => router.push('/screens/post-detail')}>
                                <Image

                                    className="h-60 rounded-xl"
                                    style={{ aspectRatio: 0.8 }} // Fixed aspect ratio
                                    source={{ uri: imageUri }}
                                    resizeMode="cover"
                                />
                            </Pressable>
                        ))}
                        <View className="w-16" />

                    </CardScroller>

                )}
                {props.images && props.images.length === 1 && (
                    <Pressable onPress={() => router.push('/screens/post-detail')} className="flex-row pr-global">
                        <View className="w-20" />
                        <Image
                            className="flex-1 rounded-xl"
                            style={{ aspectRatio: 1.2 }}
                            source={{ uri: props.images[0] }}
                            resizeMode="cover"
                        />
                    </Pressable>
                )}
                <Actions />
            </View >

            <UserActionsSheet ref={userActionsSheetRef} />
        </>
    );
}

const Actions = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(12);

    const handleLikePress = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <View className='flex-row items-center mt-4 pl-20 pr-global'>
            <View className='flex-row items-center'>
                <Icon
                    onPress={handleLikePress}
                    name='Heart'
                    size={18}
                    color={isLiked ? '#ef4444' : undefined}
                    fill={isLiked ? '#ef4444' : undefined}
                />
                <ThemedText className='text-sm ml-1'>{likeCount}</ThemedText>
            </View>
            <View className='flex-row items-center ml-6'>
                <Icon onPress={() => { }} name='MessageCircle' size={18} />
                <ThemedText className='text-sm ml-1'>12</ThemedText>
            </View>
            <View className='flex-row items-center ml-auto'>
                <Icon onPress={() => { }} name='SendHorizonal' size={18} />
            </View>
        </View>
    );
}


const UserActionsSheet = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global'>

                <View className="rounded-2xl bg-background mb-4">
                    <SheetItem icon="QrCode" name='QR code' />
                    <SheetItem icon="Link2" name='Copy link' />
                    <SheetItem icon="Share2" name='Share post' />
                </View>
                <View className="rounded-2xl bg-background mb-4">
                    <SheetItem icon="Volume" name='Mute user' />
                    <SheetItem icon="UserLock" name='Restrict' />
                </View>
                <View className="rounded-2xl bg-background">
                    <SheetItem icon="UserX" name='Block user' />
                    <SheetItem icon="ShieldAlert" name='Report post' />
                </View>
            </View>
        </ActionSheetThemed>
    );
});

const SheetItem = (props: any) => {
    return (

        <Pressable onPress={props.onPress} className='flex-row justify-between items-center  rounded-2xl p-4 border-b border-border'>
            <ThemedText className='font-semibold text-base'>{props.name}</ThemedText>
            <Icon name={props.icon} size={20} />
        </Pressable>
    );
}       