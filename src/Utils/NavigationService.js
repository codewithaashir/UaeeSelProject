export const NavigationService = {
 goTo:(screenName,navigation)=>{
    navigation.navigate(screenName);
 },
 goBack:(navigation)=>{
    navigation.goBack();
 }
};