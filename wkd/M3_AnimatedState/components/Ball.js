import React, { Component } from 'react';
import {
   View,
   Animated,
   Dimensions,
   TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ballWidth = 60;

class Ball extends Component {
   constructor(props) {
      super(props);
      const position = new Animated.ValueXY();
      position.setValue({ x:0, y:0 });
      this.state = { touched: false, position };
   }

   startAnimation() {
      if (!this.state.touched) {
         this.setState({ touched: true });
         Animated.spring(this.state.position, {
            toValue: { x: width - ballWidth, y: height - ballWidth }
         }).start();

      } else {
         this.setState({ touched: false });
         Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
         }).start();
      }
   }

   render() {
      return (
         <Animated.View style={this.state.position.getLayout()}>
            <TouchableWithoutFeedback
               onPress={() => this.startAnimation()}
            >
               <View
                  style={styles.ball}
               />
            </TouchableWithoutFeedback>
         </Animated.View>
      );
   }
}

const styles = {
   ball: {
      height: ballWidth,
      width: ballWidth,
      borderRadius: ballWidth / 2,
      backgroundColor: 'red'
   }
};

export default Ball;
