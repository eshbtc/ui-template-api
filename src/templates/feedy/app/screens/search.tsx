
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeColors from "../contexts/ThemeColors";
import { View, TextInput, Pressable, Text } from "react-native";
import Icon from "@/components/Icon";
import { Link, router } from "expo-router";
import ThemedText from "@/components/ThemedText";
import Avatar from "@/components/Avatar";
import { useState } from "react";

export default function SearchScreen() {
    const mockUsers = [
        {
            id: 1,
            src: require('@/assets/img/user-1.jpg'),
            username: 'amy_smith',
            name: 'Amy Smith',
            followers: '1.2K',
            verified: true
        },
        {
            id: 2,
            src: require('@/assets/img/user-2.jpg'),
            username: 'jane_stone',
            name: 'Jane Stone',
            followers: '856',
            verified: true
        },
        {
            id: 3,
            src: require('@/assets/img/user-3.jpg'),
            username: 'andy_doe',
            name: 'Andy Doe',
            followers: '2.1K',
            verified: true
        },
        {
            id: 4,
            src: require('@/assets/img/user-4.jpg'),
            username: 'sarah_wilson',
            name: 'Sarah Wilson',
            followers: '543',
            verified: true
        },
        {
            id: 5,
            src: require('@/assets/img/thomino.jpg'),
            username: 'thomino',
            name: 'Thomino',
            followers: '5.3K',
        },
        {
            id: 6,
            src: require('@/assets/img/user-1.jpg'),
            username: 'emma_davis',
            name: 'Emma Davis',
            followers: '789',
            verified: false
        },
        {
            id: 7,
            src: require('@/assets/img/user-2.jpg'),
            username: 'mike_johnson',
            name: 'Mike Johnson',
            followers: '1.5K',
        },
        {
            id: 8,
            src: require('@/assets/img/user-3.jpg'),
            username: 'lisa_brown',
            name: 'Lisa Brown',
            followers: '432',
            verified: false
        },
        {
            id: 9,
            src: require('@/assets/img/user-4.jpg'),
            username: 'david_miller',
            name: 'David Miller',
            followers: '3.2K',
        },
        {
            id: 10,
            src: require('@/assets/img/user-1.jpg'),
            username: 'jessica_garcia',
            name: 'Jessica Garcia',
            followers: '967',
            verified: false
        },
        {
            id: 11,
            src: require('@/assets/img/user-2.jpg'),
            username: 'chris_martinez',
            name: 'Chris Martinez',
            followers: '1.8K',
        },
        {
            id: 12,
            src: require('@/assets/img/user-3.jpg'),
            username: 'amanda_taylor',
            name: 'Amanda Taylor',
            followers: '654',
        }
    ];
    return (
        <>
            <SearchInput />
            <ThemedScroller className="pt-0">

                {mockUsers.map((user) => (
                    <UserList key={user.id} name={user.name} src={user.src} username={user.username} followers={user.followers} verified={user.verified} />
                ))}
            </ThemedScroller>
        </>
    )
}


const SearchInput = () => {
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();
    return (
        <View style={{ paddingTop: insets.top }} className='flex-row px-4 pb-4 items-center  bg-background justify-between'>

            <View className="bg-secondary rounded-full py-4 flex-row items-center">
                <Icon name='ArrowLeft' onPress={() => router.back()} size={20} className='pl-2' />
                <TextInput className='flex-1 text-text rounded-xl px-4' placeholder='Search users' placeholderTextColor={colors.placeholder} />
                <Icon name="X" size={20} className="opacity-40 mr-4" />
            </View>
        </View>
    )
}


const UserList = (props: any) => {
    const colors = useThemeColors();
    const [following, setFollowing] = useState(false);

    const toggleFollow = () => {
        setFollowing(!following);
    }

    return (
        <Link href="/screens/user-profile" asChild>
            <Pressable className="flex-row items-start py-3">
                <Avatar src={props.src} size="md" className="mr-4" />
                <View className="flex-row flex-1 justify-between">
                    <View>
                        <View className="flex-row items-center">
                            <ThemedText className="text-text text-base font-bold">{props.username}</ThemedText>
                            {props.verified && <Icon name="Verified" size={16} className="ml-1" color={colors.highlight} />}
                        </View>
                        <ThemedText className="text-text text-base opacity-40">{props.name}</ThemedText>
                        <ThemedText className="text-text text-base ">{props.followers} followers</ThemedText>
                    </View>
                    <Pressable onPress={toggleFollow} className={`items-center my-auto rounded-lg px-4 py-2 ml-auto ${following ? 'bg-transparent border border-border' : 'bg-text'}`}>
                        <Text className={`${following ? 'text-text' : 'text-background'} text-sm font-semibold`}>
                            {following ? 'Following' : 'Follow'}</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Link>
    )
}

