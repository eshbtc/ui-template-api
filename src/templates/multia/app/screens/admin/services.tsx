import React, { useState } from 'react';
import { View, Image, FlatList, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import Icon from '@/components/Icon';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import AnimatedView from '@/components/AnimatedView';
import { Chip } from '@/components/Chip';
import Section from '@/components/layout/Section';
import FloatingButton from '@/components/FloatingButton';

// Sample service data using existing images
const serviceData = [
  {
    id: '1',
    title: 'Logo Design Package',
    price: '$85',
    image: require('@/assets/img/service-1.jpg'),
    category: 'design'
  },
  {
    id: '2',
    title: 'Website Development',
    price: '$250',
    image: require('@/assets/img/service-2.jpg'),
    category: 'development'
  },
  {
    id: '3',
    title: 'Social Media Management',
    price: '$120',
    image: require('@/assets/img/service-3.jpg'),
    category: 'marketing'
  },
  {
    id: '4',
    title: 'Content Writing',
    price: '$75',
    image: require('@/assets/img/service-4.jpg'),
    category: 'content'
  },
  {
    id: '5',
    title: 'SEO Optimization',
    price: '$150',
    image: require('@/assets/img/service-1.jpg'),
    category: 'marketing'
  },
  {
    id: '6',
    title: 'UI/UX Design',
    price: '$200',
    image: require('@/assets/img/service-2.jpg'),
    category: 'design'
  },
  {
    id: '7',
    title: 'Mobile App Development',
    price: '$350',
    image: require('@/assets/img/service-3.jpg'),
    category: 'development'
  },
  {
    id: '8',
    title: 'Video Editing',
    price: '$95',
    image: require('@/assets/img/service-4.jpg'),
    category: 'content'
  }
];

// Categories for filtering
const categories = [
  { id: 'all', label: 'All' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'content', label: 'Content' }
];

export default function AdminServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simple filtering logic
  const filteredServices = serviceData.filter(service => {
    // Filter by search query
    const matchesQuery = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === 'all' || 
      service.category === selectedCategory;
    
    return matchesQuery && matchesCategory;
  });

  const handleServicePress = (serviceId: string) => {
    router.push(`/screens/admin/add-service-flow`);
  };

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header 
        title="Your services" 
        showBackButton 
        rightComponents={[
          <TouchableOpacity 
            key="add" 
            className="ml-2" 
            onPress={() => router.push('/screens/admin/add-service-flow')}
          >
            <Icon name="Plus" size={24} />
          </TouchableOpacity>
        ]}
      />
      

        {/* Search bar */}
        <View className="px-global py-3">
          <View className="relative">
            <TextInput
              className="bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text py-3 px-10 rounded-lg"
              placeholder="Search services..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Icon name="Search" size={20} className="absolute top-3.5 left-3" />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                className="absolute top-3 right-3" 
                onPress={() => setSearchQuery('')}
              >
                <Icon name="X" size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Category filters */}
        <View className="px-global py-2">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Chip
                label={item.label}
                selectable
                isSelected={selectedCategory === item.id}
                onPress={() => setSelectedCategory(item.id)}
                className="mr-2"
              />
            )}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>
        
        {/* Services list */}
        {filteredServices.length > 0 ? (
          <FlatList
            data={filteredServices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleServicePress(item.id)}
                className="flex-row items-center px-global py-3 border-b border-light-secondary dark:border-dark-secondary"
              >
                <Image
                  source={item.image}
                  className="w-32 h-20 rounded-md"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-3">
                  <ThemedText className="font-semibold">{item.title}</ThemedText>
                  <View className="flex-row items-center mt-1">
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                      {item.price}
                    </ThemedText>
                  </View>
                </View>
                <Icon name="ChevronRight" size={20} className="opacity-30" />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <Icon name="Briefcase" size={64} className="text-light-secondary dark:text-dark-secondary mb-4" />
            <ThemedText className="text-xl font-bold mb-2">No services found</ThemedText>
            <ThemedText className="text-center text-light-subtext dark:text-dark-subtext">
              Try changing your search or filter criteria
            </ThemedText>
          </View>
        )}
      
    </View>
  );
}
