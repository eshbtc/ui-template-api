import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, Pressable, Animated } from 'react-native';
import ThemedScroller from 'components/ThemeScroller';
import Header, { HeaderIcon } from 'components/Header';
import ThemedText from '@/components/ThemedText';
import { CardScroller } from '@/components/CardScroller';
import AnimatedView from '@/components/AnimatedView';
import DrawerButton from '@/components/DrawerButton';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import SocialPost from '@/components/SocialPost';

// Mock data for social posts
const mockPosts = [
  {
    id: 1,
    src: require('@/assets/img/user-1.jpg'),
    name: 'Amy Smith',
    time: '2h ago',
    //content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking',
    images: [
      'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]
  },
  {
    id: 2,
    src: require('@/assets/img/user-2.jpg'),
    name: 'Jane Stone',
    time: '4h ago',
    content: 'Working on some new designs today. Really excited about this project! What do you think about minimalist approaches in modern UI?',
  },
  {
    id: 3,
    src: require('@/assets/img/user-3.jpg'),
    name: 'Andy Doe',
    time: '6h ago',
    content: 'Coffee shop vibes ☕ Perfect place to get some work done!',
    images: [
      'https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    src: require('@/assets/img/user-1.jpg'),
    name: 'Amy Smith',
    time: '12h ago',
    content: 'Sunset photography session was incredible today!',
    images: [
      'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]
  },
  {
    id: 6,
    src: require('@/assets/img/user-2.jpg'),
    name: 'Jane Stone',
    time: '1d ago',
    content: 'Grateful for all the support from this amazing community! You all inspire me every day to keep creating and pushing boundaries. Thank you!',
  },
];

export default function HomeScreen() {
  
   
  return (
    <>
      <Header
        className='bg-background'
        leftComponent={<DrawerButton />}
        middleComponent={<ThemedText className="text-2xl font-bold">Feedy<Text className='text-highlight'>.</Text></ThemedText>}
        rightComponents={[<HeaderIcon icon="Mail" hasBadge href="/screens/chat/list" />]}
      />
      <AnimatedView
        animation="scaleIn"
        className='flex-1 bg-background'
        duration={300}
      >
        <ThemedScroller 
        className="flex-1 bg-background !px-0">
          <CardScroller className='px-global mt-4'>
            <FollowCard src={require('@/assets/img/user-1.jpg')} name='Amy Smith' />
            <FollowCard src={require('@/assets/img/user-2.jpg')} name='Jane Stone' />
            <FollowCard src={require('@/assets/img/user-3.jpg')} name='Andy Doe' />
            <FollowCard src={require('@/assets/img/thomino.jpg')} name='Thomino' />
          </CardScroller>
          
          {mockPosts.map((post) => (
            <SocialPost
              key={post.id}
              src={post.src}
              name={post.name}
              time={post.time}
              content={post.content}
              images={post.images}
            />
          ))}
        </ThemedScroller>
      </AnimatedView>
    </>
  );
}

const FollowCard = (props: any) => {
  const [following, setFollowing] = useState(false);

    const toggleFollow = () => {
        setFollowing(!following);
    }
  return (
    <View className='bg-secondary rounded-xl mb-5 w-40 items-center p-4 py-4'>
      <Avatar className='mt-2' size='lg' src={props.src} link="/screens/user-profile" />
      <ThemedText className='text-base my-3 font-semibold'>{props.name}</ThemedText>
      <Pressable onPress={toggleFollow} className={`${following ? 'bg-transparent border-border' : 'bg-text border-transparent'} items-center border w-full rounded-lg px-4 py-2`}>
        <Text className={`${following ? 'text-text' : 'text-background'} text-xs font-semibold`}>{following ? 'Following' : 'Follow'}</Text>
      </Pressable>
    </View>
  );
}

