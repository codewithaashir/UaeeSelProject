const URL = "https://uaesell.ae/admin_panel/api";
export const ImgURl = "https://uaesell.ae/admin_panel/";
export const Apis = {
    Signup: URL + "/register",
    Login: URL + "/login",
    SociaLogin:URL+'/socialLogin',
    getBanners:URL+'/getBanner',
    Categories: URL + "/getAll",
    ALLproduct: URL + "/getProductBySubCate/",
    contact_us: URL + "/query/store",
    getPage:URL+'/getPage',
    UserInfo: URL + "/user/userInfo",
    Payment: URL + "/payment/paymentStore",
    featuredProducts: URL + "/featuredProducts",
    storeAddress: URL + "/user/storeAddress",
    WishList: URL + "/wishList",
    Profile: URL + "/user/EditProfile",
    History: URL + "/payment/previousOrders",
    ChangePass: URL + "/user/changePassword",
    SearchProductByName: URL + "/searchProduct",
    SearchProductByPrice:URL+'/searchPrice',
    getOnboarding:URL+'/getOnboarding'
};
export const HeaderSend = {
    SetHeaders: (token) => {

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        };
        return headers;
    }
}
