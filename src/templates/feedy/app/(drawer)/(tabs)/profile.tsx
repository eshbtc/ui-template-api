import Header, { HeaderIcon } from "@/components/Header";
import React from "react";
import AnimatedView from "@/components/AnimatedView";
import ThemeTabs, { ThemeTab } from "@/components/ThemeTabs";
import { View } from "react-native";
import { MasonryGrid } from "@/components/Masonry";
import * as Sharing from 'expo-sharing';
import ThemedText from "@/components/ThemedText";
import Avatar from "@/components/Avatar";
import SocialPost from "@/components/SocialPost";
import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";

export default function ProfileScreen() {


    return (
        <>
            <Header
                leftComponent={<HeaderIcon icon="ChartNoAxesColumn" href="/screens/analytics" />}
                rightComponents={[<HeaderIcon icon="Instagram" href="/" />, <HeaderIcon icon="Settings" href="/screens/settings" />]}
            />
            <AnimatedView
                animation="scaleIn"
                className='flex-1 bg-background'
                duration={300}
            >
                <ThemeTabs
                    headerComponent={<ProfileHeader />}
                >
                    <ThemeTab name="Posts">

                        {mockPosts.map((post) => (
                            <SocialPost key={post.id} {...post} />
                        ))}

                    </ThemeTab>
                    <ThemeTab name="Media">
                        <View className="p-2 bg-background">
                            <MasonryGrid images={masonryImages} />
                        </View>

                    </ThemeTab>
                    <ThemeTab name="Replies">

                        <Placeholder icon="Lightbulb" title="Replies" subtitle="You didn't reply to any post" className="mt-32" />

                    </ThemeTab>
                </ThemeTabs>
            </AnimatedView>
        </>
    );
}

const ProfileHeader = () => {
    return (
        <View className="p-global">
            <View className="flex-row items-center justify-between">
                <View>
                    <ThemedText className="text-3xl font-bold">Thomino</ThemedText>
                    <ThemedText className="text-base">thomino6711</ThemedText>
                </View>
                <Avatar src={require('@/assets/img/thomino.jpg')} size="lg" />
            </View>
            <View className="flex-row items-center mt-4">
                <Avatar src={require('@/assets/img/user-3.jpg')} size="xxs" className=" border-2 border-background" />
                <Avatar src={require('@/assets/img/user-2.jpg')} size="xxs" className="-ml-2 border-2 border-background" />
                <ThemedText className="text-sm opacity-50 ml-2">184 followers</ThemedText>
                <View className="w-1 h-1 rounded-full bg-text opacity-20 mx-2" />
                <ThemedText className="text-sm opacity-50">native-templates.com</ThemedText>
            </View>
            <View className="flex-row items-center mt-6 gap-2">
                <Button href="/screens/edit-profile" variant="outline" title="Edit profile" className="flex-1" size="small" />
                <Button variant="outline" title="Share profile" className="flex-1" size="small" onPress={() => {
                    Sharing.shareAsync(
                        'https://native-templates.com',
                    );
                }} />
            </View>
        </View>
    );
}





const mockPosts = [
    {
        id: 1,
        src: require('@/assets/img/thomino.jpg'),
        name: 'Thomino',
        time: '6h ago',
        content: 'Coffee shop vibes ☕ Perfect place to get some work done!',
        images: [
            'https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]
    },

    {
        id: 2,
        src: require('@/assets/img/thomino.jpg'),
        name: 'Thomino',
        time: '4h ago',
        content: 'Working on some new designs today. Really excited about this project! What do you think about minimalist approaches in modern UI?',
    },
    {
        id: 3,
        src: require('@/assets/img/thomino.jpg'),
        name: 'Thomino',
        time: '2h ago',
        //content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking',
        images: [
            'https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]
    },

    {
        id: 4,
        src: require('@/assets/img/thomino.jpg'),
        name: 'Thomino',
        time: '8h ago',
        content: 'Sometimes the best ideas come when you least expect them. Just had a breakthrough moment while walking!',
    },
    {
        id: 5,
        src: require('@/assets/img/thomino.jpg'),
        name: 'Thomino',
        time: '12h ago',
        content: 'Sunset photography session was incredible today!',
        images: [
            'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]
    },
    {
        id: 6,
        src: require('@/assets/img/thomino.jpg'),
        name: 'Thomino',
        time: '1d ago',
        content: 'Grateful for all the support from this amazing community! You all inspire me every day to keep creating and pushing boundaries. Thank you!',
    },
];

const masonryImages = [
    {
        id: 1,
        uri: 'https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 2,
        uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 240 // double height
    },
    {
        id: 3,
        uri: 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 4,
        uri: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 5,
        uri: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 6,
        uri: 'https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 240 // double height
    },
    {
        id: 7,
        uri: 'https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 8,
        uri: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 9,
        uri: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 240 // double height
    },
    {
        id: 10,
        uri: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 11,
        uri: 'https://images.unsplash.com/photo-1604342427523-189b17048839?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 12,
        uri: 'https://images.unsplash.com/photo-1635776063043-ab23b4c226f6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D    ',
        height: 120 // square
    },

    {
        id: 13,
        uri: 'https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 14,
        uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 240 // double height
    },
    {
        id: 15,
        uri: 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 16,
        uri: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 17,
        uri: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 18,
        uri: 'https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 240 // double height
    },
    {
        id: 19,
        uri: 'https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 20,
        uri: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 21,
        uri: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 240 // double height
    },
    {
        id: 22,
        uri: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 23,
        uri: 'https://images.unsplash.com/photo-1604342427523-189b17048839?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        height: 120 // square
    },
    {
        id: 24,
        uri: 'https://images.unsplash.com/photo-1635776063043-ab23b4c226f6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D    ',
        height: 120 // square
    },
];