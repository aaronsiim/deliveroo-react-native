import { View, Text, SafeAreaView, Image, Button, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SearchBar, Input } from "@rneui/themed";
import Categories from '../components/Categories';
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
} from 'react-native-heroicons/outline';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';



const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
            * [_type == "featured"] {
                ...,
                restaurants[]->{
                ...,
                dishes[]->
                },
            }
        `).then((data) => {
            setFeaturedCategories(data);
        })
    }, [])

    console.log(featuredCategories);

  return (
    <SafeAreaView className='bg-white pt-5'>

        {/* Header */}
        <View className='flex-row pd-3 items-center mx-4 space-x-2 px-4'>
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                />

                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                    <Text className='font-bold text-xl'>
                        Current Location
                        <Button title="🔽" />
                    </Text>
                </View>

                <View>
                <Button title="🧙‍♀️" />
                </View>
        </View>


        {/* Search */}
        <View className='flex-row items-center space-x-2 pb-3 mx-4 px-4'>
            <View className=' flex-row flex-1 space-x-2 bg-gray-200  '>
                
                <Input 
                    placeholder='Search food and restro' 
                    keyboardType='default'
                />
            </View>

            <View>
            <Button title=" 🎛️ " />
            </View>
        </View>


        {/* Body */}
        <ScrollView
            className ='bg-gray-100'
            contentContainerStyle={{
                paddingBottom: 100,
            }}
        >
            {/* Categories */}
            <Categories />

            {/* Featured Rows */}
            {featuredCategories?.map((category) => (
                    <FeaturedRow 
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;