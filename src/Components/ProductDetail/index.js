import { Dimensions } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

import CustomComponent from '...'
//import data from '...'
const data=[{id:'23e42',name:'Nilone Shoes for every one yep yep yep',featured_image:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png',price:'220',in_stock:10},{id:'288e42',name:'Nilone Shoes',featured_image:'https://www.freeiconspng.com/thumbs/men-suit-png/men-suit-png-19.png',price:'600',in_stock:1}]

export default class SweetCarousel extends Component {
  state = {
    currentIndex: 0,
  };

  render = () => {
    // center items on screen
    const { width } = Dimensions.get('window');
    const contentOffset = (width - CustomComponent.WIDTH) / 2;

    return (
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={CustomComponent.WIDTH}
        style={{ width }}
        data={data}
        contentOffset={contentOffset}
        onIndexChange={index =>
          this.setState(() => ({ currentIndex: index }))
        }
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
         <CustomComponent
            {...item}
            index={itemIndex}
            currentIndex={currentIndex}
            animatedValue={animatedValue}
          />
        )}
      />
    );
  };
}