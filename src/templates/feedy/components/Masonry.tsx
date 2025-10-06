import { View, Pressable, Image } from "react-native";
import { Link } from "expo-router";

export const MasonryGrid = ({ images }: { images: any[] }) => {
    // Split images into three columns
    const leftColumn = images.filter((_, index) => index % 3 === 0);
    const middleColumn = images.filter((_, index) => index % 3 === 1);
    const rightColumn = images.filter((_, index) => index % 3 === 2);

    return (
        <View className="flex-row">
            {/* Left Column */}
            <View className="flex-1 pr-0">
                {leftColumn.map((image) => (
                    <MasonryItem key={image.id} image={image} />
                ))}
            </View>
            
            {/* Middle Column */}
            <View className="flex-1 px-2">
                {middleColumn.map((image) => (
                    <MasonryItem key={image.id} image={image} />
                ))}
            </View>
            
            {/* Right Column */}
            <View className="flex-1 pl-0">
                {rightColumn.map((image) => (
                    <MasonryItem key={image.id} image={image} />
                ))}
            </View>
        </View>
    );
};

export const MasonryItem = ({ image }: { image: any }) => {
    return (
        <Link href="/screens/post-detail" asChild>
            <Pressable className="mb-2 rounded-xl overflow-hidden">
                <Image
                    source={{ uri: image.uri }}
                    style={{ 
                        width: '100%', 
                        height: image.height,
                        //borderRadius: 12
                    }}
                    resizeMode="cover"
                />
            </Pressable>
        </Link>
    );
};