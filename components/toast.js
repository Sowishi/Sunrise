import Toast from 'react-native-toast-message';

const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

export {showToast}