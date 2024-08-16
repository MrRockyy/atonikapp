import { Text,  View } from "react-native";
import { router,Link ,useNavigation } from "expo-router";
export default function Index() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >      
     <Link href="/home">View user</Link>
    </View>
  );
}
