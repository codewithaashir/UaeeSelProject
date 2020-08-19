import Contex from './Context';
import Color from './Colors';
import { NavigationService } from './NavigationService';
import Lang from './Languages';
import {useConst} from './useConstHook';
import { PixelRatio } from 'react-native';
import currencyFormatter from "currency-formatter";
import {Images} from '../Assets';
export const AuthContext = Contex;
export const Colors = Color;
export const  useConsts=useConst;
export const Languages =Lang;
export const NavService=NavigationService;

 // format currency
 export const getCurrecyFormatted = (price) => {
    let formatedPrice = "";
    if (price && price !== "") {
      formatedPrice = currencyFormatter.format(price, {
        code:'PKR',
        symbol:'Rs '

      });
    }

    return formatedPrice;
  };
  /**
   * Calculate price included tax amount
   */
  export const getPriceIncluedTaxAmount = (product, variation, noFormat) => {
    if (!product) return null;

    const productPrice =
      variation && variation.price !== ""
        ? variation.price
        : product.price !== ""
          ? product.price
          : product.regular_price;

    if (
      product.tax_status === "taxable" &&
      product.tax_class &&
      product.tax_class !== ""
    ) {
      const taxAmount = Number(product.tax_class);
      const includedPrice = productPrice * ((100 + taxAmount) / 100);
      warn(includedPrice);
      return noFormat
        ? includedPrice
        : getCurrecyFormatted(includedPrice);
    }

    // warn(productPrice);
    return noFormat ? productPrice : getCurrecyFormatted(productPrice);
  };
export const getProductImage = (uri, containerWidth) => {
    return uri
    // Enhance number if you want to fetch a better quality image (may affect performance
    const DPI_NUMBER = 0.5; // change this to 1 for high quality image
  
    // if (!Config.ProductSize.enable) {
    //   return uri;
    // }
  
    if (typeof uri !== "string") {
      return Images.PlaceHolderURL;
    }
  
    // parse uri into parts
    const index = uri.lastIndexOf(".");
    let editedURI = uri.slice(0, index);
    const defaultType = uri.slice(index);
  
    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(containerWidth);
  
    switch (true) {
      case pixelWidth * DPI_NUMBER < 300:
        editedURI = `${editedURI}-small${defaultType}`;
        break;
      case pixelWidth * DPI_NUMBER < 600:
        editedURI = `${editedURI}-medium${defaultType}`;
        break;
      case pixelWidth * DPI_NUMBER < 1400:
        editedURI = `${editedURI}-large${defaultType}`;
        break;
      default:
        editedURI += defaultType;
    }
    return editedURI;
  };