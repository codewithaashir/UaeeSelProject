/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import {getCurrecyFormatted,getPriceIncluedTaxAmount} from '../../Utils'
import styles from "./styles";
import Colors from "../../Utils/Colors";

class ProductPrice extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    hideDisCount: PropTypes.bool,
    style: PropTypes.any,
  };

  render() {
    const {
      product,
      hideDisCount,
      style,
      fontStyle,
    } = this.props;
    return (
      <View style={[styles.price_wrapper, style && style]}>
        <Text
          style={[
            styles.text_list,
            styles.price,
            {
              color: Colors.appBlue+'41',
            },
            { color:  Colors.darkBlue+'90', },
            fontStyle && fontStyle,
          ]}>
          {`${getPriceIncluedTaxAmount(product)} `}
        </Text>
        
        {product.on_sale && <Text style={[styles.text_list, styles.sale_price, { color: text}, fontStyle && fontStyle,]}>
          {product.on_sale
            ? getCurrecyFormatted(product.price)
            : ""}
        </Text>}

        {hideDisCount ? (
          <View />
        ) : !product.on_sale ? (
          <View />
        ) : (
          <View style={styles.saleWrap}>
            <Text style={[styles.text_list, styles.sale_off, { color: text }, fontStyle && fontStyle,]}>
              {`-${(
                (1 - Number(product.price) / Number(product.regular_price)) *
                100
              ).toFixed(0)}%`}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default ProductPrice;
