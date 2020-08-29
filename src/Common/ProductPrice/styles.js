/** @format */

import { StyleSheet } from "react-native";
import { Colors } from "../../Utils";

export default StyleSheet.create({
  text_list: {
    color: Colors.darkBlue,
    fontSize: 14,
  },
  empty:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text_grid: {
    color: Colors.darkBlue,
    fontSize: 12,
  },
  "": {
    alignItems: "center",
    color: Colors.darkBlue,
    fontSize: 10,
  },
  price_wrapper: {
    alignItems: "center",
  },
  sale_price: {
    textDecorationLine: "line-through",
    color: Colors.lightGreen,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 10,
  },
  price: {
    color: Colors.appBlue,
    fontSize: 12,
  },
  saleWrap: {
    borderRadius: 5,
    backgroundColor: Colors.cyan,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  },
  sale_off: {
    color: Colors.lightGreen,
    fontSize: 12,
  },
});
