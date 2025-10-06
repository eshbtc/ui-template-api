import Header from "@/components/Header";
import Section from "@/components/layout/Section";
import ThemedScroller from "@/components/ThemeScroller";
import AnimatedView from "@/components/AnimatedView";
import { Pressable, Text, View } from "react-native";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";
import ThemedText from "@/components/ThemedText";
import { useState } from "react";

export default function NotificationsScreen() {


    return (
        <>
            <Header
                className='pt-10'
            />
            <AnimatedView
                animation="scaleIn"
                className='flex-1 bg-background'
                duration={300}
            >
                <ThemedScroller className="flex-1 bg-background !px-0">
                    <Section title="Notifications" titleSize="4xl" className=" px-global mt-10 mb-10" />
                    <LikedPost />
                    <NewFollower />
                    <ReplyPost />
                    <PinnedPost />
                    <LikedPost />
                    <ReplyPost />
                    <NewFollower />
                    <LikedPost />
                    <PinnedPost />
                    <ReplyPost />
                    <NewFollower />
                    <LikedPost />
                    <PinnedPost />
                    <ReplyPost />
                    <LikedPost />
                </ThemedScroller>
            </AnimatedView>
        </>
    );
}


const LikedPost = () => {
    return (
        <View className="py-6 border-b border-border flex-row">
            <View className="px-global items-center">
                <Icon name="Heart" size={24} color="#FF2056" fill="#FF2056" className="w-10 h-10" />
            </View>
            <View className="flex-1 pr-global">
                <View className="flex-row items-center gap-1">
                    <Avatar src={require('@/assets/img/user-1.jpg')} size="xs" />
                    <Avatar src={require('@/assets/img/user-2.jpg')} size="xs" />
                    <Avatar src={require('@/assets/img/user-3.jpg')} size="xs" />
                    <ThemedText className="text-text text-xs opacity-60 ml-auto text-center">10min</ThemedText>
                </View>
                <ThemedText className="text-text text-lg my-2"><Text className="font-bold">John Doe</Text> and 5 others liked your post</ThemedText>
                <ThemedText className="text-text text-base opacity-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</ThemedText>
            </View>

        </View>
    );
}

const ReplyPost = () => {
    return (
        <View className="py-6 border-b border-border flex-row">
            <View className="px-global items-center">
                <Avatar src={require('@/assets/img/user-1.jpg')} size="sm" />
            </View>
            <View className="flex-1 pr-global">
                <View className="flex-row items-center justify-between">
                    <ThemedText className="text-text text-lg mb-2"><Text className="font-bold">Jessie Doe</Text> commented on</ThemedText>
                    <ThemedText className="text-text text-xs opacity-60 ml-auto text-center">10min</ThemedText>
                </View>
                <ThemedText className="text-text text-base opacity-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</ThemedText>
            </View>

        </View>
    );
}

const PinnedPost = () => {
    return (
        <View className="py-6 border-b border-border flex-row">
            <View className="px-global items-center">
                <Icon name="Pin" size={24} color="#00CAE6" fill="#00CAE6" className="w-10 h-10" />
            </View>
            <View className="flex-1 pr-global">
                <View className="flex-row items-center justify-between">
                    <ThemedText className="text-text text-lg mb-2">New pinned post in <Text className="font-bold">React Native</Text></ThemedText>
                    <ThemedText className="text-text text-xs opacity-60 ml-auto text-center">10min</ThemedText>
                </View>
                <ThemedText className="text-text text-base opacity-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</ThemedText>
            </View>

        </View>
    );
}


const NewFollower = () => {
    const [following, setFollowing] = useState(false);

    const toggleFollow = () => {
        setFollowing(!following);
    }

    return (
        <View className="py-6 border-b border-border flex-row">
            <View className="px-global items-center">
                <Icon name="UserCheck" size={24} color="#00CAE6" fill="#00CAE6" className="w-10 h-10" />
            </View>
            <View className="flex-1 pr-global">
                <View className="flex-row items-center justify-between">
                    <ThemedText className="text-text text-lg mb-2"><Text className="font-bold">Jessie Doe</Text> started following you</ThemedText>
                    <ThemedText className="text-text text-xs opacity-60 ml-auto text-center">10min</ThemedText>
                </View>
                <View className="p-4 bg-secondary rounded-2xl">
                    <View className="flex-row items-center justify-between">
                        <Avatar src={require('@/assets/img/user-1.jpg')} size="sm" />
                        <Pressable onPress={toggleFollow} className={`items-center my-auto rounded-lg px-4 py-2 ml-auto ${following ? 'bg-transparent border border-border' : 'bg-text'}`}>
                            <Text className={`${following ? 'text-text' : 'text-background'} text-sm font-semibold`}>
                                {following ? 'Following' : 'Follow back'}</Text>
                        </Pressable>
                    </View>
                    <View className="mt-3">
                        <ThemedText className="text-lg font-bold">Jessie Doe</ThemedText>
                        <View className="flex-row justify-between">
                            <ThemedText className="text-text text-base">Fullstack developer</ThemedText>
                            <ThemedText className="text-text text-base opacity-60">jessie_doe</ThemedText>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
}