import Header from '@/components/Header';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import Avatar from '@/components/Avatar';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '../contexts/ThemeColors';
import Icon from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { CardScroller } from '@/components/CardScroller';
import * as ImagePicker from 'expo-image-picker';
import AnimatedView from '@/components/AnimatedView';

const galleryImages = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
];

export default function AddPostScreen() {
    const colors = useThemeColors();
    const whoCanSeeSheetRef = useRef<ActionSheetRef>(null);
    const tagPeopleSheetRef = useRef<ActionSheetRef>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    const selectGalleryImage = (uri: string) => {
        if (!selectedImages.includes(uri)) {
            setSelectedImages([...selectedImages, uri]);
        }
    };

    const removeImage = (uri: string) => {
        setSelectedImages(selectedImages.filter(img => img !== uri));
    };
    return (
        <>
            <Header
                showBackButton
                title='New Post'
                rightComponents={[<Button size='small' className='-mr-2' textClassName='!text-highlight' variant='ghost' title="Draft" />, <Button size='small' title="Publish" />]}
            />

            <View className="flex-1 bg-background">
                <View>
                    <View className='flex flex-row items-center justify-between px-global'>
                        <View className='flex flex-row items-start gap-2'>
                            <Avatar src={require('@/assets/img/thomino.jpg')} size='sm' />
                            <View className='ml-2 flex-1 items-start justify-start'>
                                <Pressable onPress={() => whoCanSeeSheetRef.current?.show()} className='px-3 py-2 flex-row items-center mr-auto border border-highlight rounded-full'>
                                    <Text className='text-highlight'>Everyone</Text>
                                    <Icon name='ChevronDown' size={16} color={colors.highlight} />
                                </Pressable>
                                <TextInput textAlignVertical='top' style={{ height: 100 }} placeholderTextColor={colors.placeholder} className='text-2xl pt-4 w-full h-44 text-text ' placeholder="What's happening?" multiline numberOfLines={10} />

                            </View>
                        </View>

                    </View>
                </View>
                {selectedImages.length > 0 && (
                    <CardScroller className='mb-2 px-2' space={4}>
                        <View className="w-20 h-20" />
                        {selectedImages.map((uri, index) => (
                            <AnimatedView animation="scaleIn" key={index} className="w-44 h-44 relative">
                                <Pressable onPress={() => removeImage(uri)} className='absolute top-2 right-2 z-50 bg-background w-8 h-8 rounded-full items-center justify-center'>
                                    <Icon name="Trash" size={15} />
                                </Pressable>
                                <Image source={{ uri }} className='w-full h-full rounded-lg' />
                            </AnimatedView>
                        ))}
                    </CardScroller>
                )}

            </View>
            <ThemedFooter className='!px-0'>
                <CardScroller className='mb-2 px-2' space={4}>
                    <Pressable onPress={pickImage} className='w-24 h-24 rounded-lg border border-border items-center justify-center'>
                        <Icon name="Plus" size={24} />
                    </Pressable>
                    {galleryImages.map((uri, index) => (
                        <Pressable key={index} onPress={() => selectGalleryImage(uri)}>
                            <Image source={{ uri }} className='w-24 h-24 rounded-lg' />
                        </Pressable>
                    ))}
                    <View className='w-24 h-24 rounded-lg ' />
                </CardScroller>
                <Pressable onPress={() => whoCanSeeSheetRef.current?.show()} className='flex flex-row items-center border-y border-border px-global py-4'>
                    <Icon name="Globe" size={18} color={colors.highlight} />
                    <Text className='text-highlight ml-2'>Everyone can reply</Text>
                </Pressable>
                <View className='flex flex-row items-center gap-10 py-4 px-global'>
                    <Icon name="Image" size={22} onPress={pickImage} />
                    <Icon name="Tag" size={22} onPress={() => tagPeopleSheetRef.current?.show()} />
                    <Icon name="MapPin" size={22} />
                    <Icon name="PlusCircle" className='ml-auto' size={22} />
                </View>
            </ThemedFooter>
            <WhoCanSeeSheet ref={whoCanSeeSheetRef} />
            <TagPeopleSheet ref={tagPeopleSheetRef} />
        </>
    );
}



const WhoCanSeeSheet = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global'>
                <ThemedText className='text-2xl font-bold mb-4'>Who can see this post?</ThemedText>
                <SheetItem isSelected icon="Globe" name='Everyone' label='Everyone can see the post' />
                <SheetItem icon="Lock" name='Private' label='Only you can see the post' />
                <SheetItem icon="UserCheck" name='My followers' label='Only your followers can see the post' />
            </View>
        </ActionSheetThemed>
    );
});

const SheetItem = (props: any) => {
    return (
        <Pressable className='flex-row items-center  bg-secondary rounded-2xl py-4'>
            <View className='relative mr-4'>
                <Icon name={props.icon} size={24} />

            </View>
            <View className='flex-1'>
                <ThemedText className='font-semibold text-xl'>{props.name}</ThemedText>
                <ThemedText className='text-sm'>{props.label}</ThemedText>
            </View>
            {props.isSelected && <Icon name='Check' color='white' size={14} strokeWidth={2} className='w-7 h-7 bg-highlight rounded-full border-2 border-secondary' />}
        </Pressable>
    );
}

const TagPeopleSheet = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global'>
                <ThemedText className='text-2xl font-bold mb-4'>Tag people</ThemedText>
                <TagPerson src={require('@/assets/img/user-1.jpg')} name='Jennie' username='jen' />
                <TagPerson src={require('@/assets/img/user-2.jpg')} name='Abby' username='abbie' />
                <TagPerson src={require('@/assets/img/user-3.jpg')} name='Andy' username='Andy' />
            </View>
        </ActionSheetThemed>
    );
});

const TagPerson = (props: any) => {
    const [tagged, setTagged] = useState(false);

    const toggleTag = () => {
        setTagged(!tagged);
    }

    return (
        <Pressable className='flex-row items-center  bg-secondary rounded-2xl py-3'>
            <View className='relative mr-4'>
                <Avatar src={props.src} size="md" name={props.name} className='border border-border' />
            </View>
            <View className='flex-1'>
                <ThemedText className='font-semibold text-xl'>{props.name}</ThemedText>
                <ThemedText className='text-sm'>{props.username}</ThemedText>
            </View>
            <Pressable onPress={toggleTag} className={`items-center my-auto rounded-lg px-4 py-2 ml-auto ${tagged ? 'bg-transparent border border-border' : 'bg-text'}`}>
                <Text className={`${tagged ? 'text-text' : 'text-background'} text-sm font-semibold`}>
                    {tagged ? 'Tagged' : 'Tag'}</Text>
            </Pressable>
        </Pressable>
    );
}


