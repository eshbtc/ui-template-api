import Header, { HeaderIcon } from "@/components/Header";
import Section from "@/components/layout/Section";
import ListLink from "@/components/ListLink";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import { AnimatedBarChart } from "@/components/AnimatedBarChart";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { Animated, Image, Pressable, View } from "react-native";
import { Button } from "@/components/Button";
import ActionSheetThemed from "@/components/ActionSheetThemed";
import { ActionSheetRef } from "react-native-actions-sheet";
import ThemedFooter from "@/components/ThemeFooter";
import { SmallChartCard } from "@/components/SmallChartCard";
import DrawerButton from "@/components/DrawerButton";
import { shadowPresets } from "@/utils/useShadow";
import { SmallCircleCard } from "@/components/SmallCircleCard";
import { BalanceChart } from "@/components/BalanceChart";
import Icon from "@/components/Icon";

export default function AnalyticsScreen() {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const userActionsSheetRef = useRef<ActionSheetRef>(null);
    const engagementData = [
        { month: 'Mon', value: 12 },
        { month: 'Tue', value: 18 },
        { month: 'Wed', value: 24 },
        { month: 'Thu', value: 32, isHighlighted: true },
        { month: 'Fri', value: 28 },
        { month: 'Sat', value: 22 },
        { month: 'Sun', value: 26 },
    ];

    useFocusEffect(
        useCallback(() => {
            // Trigger animation when screen comes into focus
            setShouldAnimate(true);

            return () => {
                // Reset animation state when screen loses focus
                setShouldAnimate(false);
            };
        }, [])
    );

    return (
        <>
            <Header
                showBackButton
                rightComponents={[<HeaderIcon icon="CalendarDays" onPress={() => userActionsSheetRef.current?.show()} />]}
            />
            <ThemedScroller className=" !px-0">
                <Section style={{ ...shadowPresets.medium }} title="Analytics" titleSize="4xl" className="py-10 mb-4 px-global" />
                <View className="mb-8">
                    <BalanceChart />
                </View>
                
                <ChartCard />

            </ThemedScroller>
            <UserActionsSheet ref={userActionsSheetRef} />
        </>
    );
}


const UserActionsSheet = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global'>
              
                <View className="rounded-2xl bg-background mb-4">
                    <SheetItem icon="ChevronRight" name='Last 7 days' />
                    <SheetItem icon="ChevronRight" name='Last 30 days' />
                    <SheetItem icon="ChevronRight" name='Last 90 days' />
                    <SheetItem icon="ChevronRight" name='Last 180 days' />
                </View>
            
            </View>
        </ActionSheetThemed>
    );
});

const SheetItem = (props: any) => {
    return (
        <Pressable className='flex-row justify-between items-center  rounded-2xl p-4 border-b border-border'>
            <ThemedText className='font-semibold text-base'>{props.name}</ThemedText>
            <Icon name={props.icon} size={20} />
        </Pressable>
    );
}


const ChartCard = () => {
    return (
        <View className="items-center justify-between w-full gap-4 px-4 bg-background">
            <View className="flex-row items-center justify-between w-full gap-4">
                <View className="flex-1">
                    <SmallChartCard title="2.4K" subtitle="Likes" data={[1200, 1350, 1500, 1800, 2100, 2300, 2400]} lineColor="#FF2056" />
                </View>
                <View className="flex-1">
                    <SmallChartCard title="856" subtitle="Comments" data={[450, 520, 680, 720, 780, 820, 856]} lineColor="#00CAE6" />
                </View>
            </View>
            <View className="flex-row items-center justify-between w-full gap-4">
                <View className="flex-1">
                    <SmallCircleCard
                        title="Post Types"
                        subtitle="This week"
                        percentage={0} // Not used in comparison mode
                        comparison={{
                            category1: {
                                name: "Photos",
                                value: 12,
                                color: "#4ecdc4"
                            },
                            category2: {
                                name: "Videos",
                                value: 8,
                                color: "#ff6b6b"
                            }
                        }}
                    />
                </View>
                <View className="flex-1">
                    <SmallCircleCard
                        title="Engagement"
                        subtitle="This week"
                        percentage={0} // Not used in comparison mode
                        comparison={{
                            category1: {
                                name: "Likes",
                                value: 245,
                                color: "#4ecdc4"
                            },
                            category2: {
                                name: "Shares",
                                value: 89,
                                color: "#ff6b6b"
                            }
                        }}
                    />
                </View>
               
            </View>
            
            <View className="flex-row items-center justify-between w-full gap-4">
                <View className="flex-1">
                    <SmallChartCard title="3.2K" subtitle="Profile views" data={[2100, 2400, 2600, 2800, 3000, 3100, 3200]} lineColor="#10b981" />
                </View>
                <View className="flex-1">
                    <SmallChartCard title="1.8K" subtitle="Story views" data={[1200, 1300, 1450, 1500, 1600, 1700, 1800]} lineColor="#8b5cf6" />
                </View>
            </View>
            
        </View>
    )
}