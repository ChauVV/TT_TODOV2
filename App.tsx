import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from 'store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import TodoScreen from 'src/TodoScreen';

console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
