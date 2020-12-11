import React from 'react';
import Navigator from './src/navigator';
import { } from 'react-native';

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
console.disableYellowBox = true;


import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from "react-native-global-props";


const customTextProps = {
  style: {
    fontFamily: "Poppins-Regular"
  }
};



export default class App extends React.Component {

  // performTimeConsumingTask = async () => {
  // return new Promise((resolve) =>
  //   setInterval(() => {
  //     resolve("result");
  //   }, 2500)
  // );
  // };

  async componentDidMount() {
    setCustomText(customTextProps);

    // const data = await this.performTimeConsumingTask();
    // if (data !== null) {
    //   this.setState({ loading: false });
    // }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
