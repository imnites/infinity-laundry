import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isNullOrUndefined = (val: any) =>
  val === null || val === undefined;
