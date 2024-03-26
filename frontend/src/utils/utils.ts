import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const isNullOrUndefined = (val: any) =>
  val === null || val === undefined;
