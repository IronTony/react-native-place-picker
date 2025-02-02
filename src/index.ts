import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-place-picker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PlacePicker = NativeModules.PlacePicker
  ? NativeModules.PlacePicker
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export enum PlacePickerPresentationStyle {
  modal = 'modal',
  fullscreen = 'fullscreen',
}
export interface PlacePickerAddress {
  name: string;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface PlacePickerCoordinate {
  latitude: number;
  longitude: number;
}
export interface PlacePickerOptions {
  /**
   * @description Presentation style of the place picker window on iOS.
   * @type PlacePickerPresentationStyle | string
   * @platform iOS only
   * @default PlacePickerPresentationStyle.fullscreen | 'fullscreen'
   */
  presentationStyle?: PlacePickerPresentationStyle | 'modal' | 'fullscreen';
  /**
   * @description The title of the place picker window.
   * @type string
   * @default 'Choose Place'
   */
  title?: string;
  /**
   * @description If enableSearch is true, the place picker window will have a search bar and you can set the placeholder of the text box.
   * @type string
   * @default 'Search...'
   */
  searchPlaceholder?: string;
  /**
   * @description Primary color of the theme such as map pin, shadow, etc.
   * @type string
   * @platform ios, android
   * @default '#FF0000'
   */
  color?: string;
  /**
   * @description The contrast color of the primary color.
   * @type string
   * @default '#FFFFFF'
   */
  contrastColor?: string;
  /**
   * @description The locale of returned address.
   * @type string
   * @platform ios, android
   * @default 'en-US'
   */
  locale?: string;
  /**
   * @description Initial map position.
   * @type PlacePickerCoordinate
   * @default `{latitude: 25.2048, longitude: 55.2708 }`
   */
  initialCoordinates?: PlacePickerCoordinate;
  /**
   * @description Enable to geocode the address of the selected place.
   * @type boolean
   * @default true
   */
  enableGeocoding?: boolean;
  /**
   * @description Enable to the search bar to let user search for certain position.
   * @type boolean
   * @default true
   */
  enableSearch?: boolean;
  /**
   * @description Enable current user position button.
   * @WARN You have to setup location privacy note into Info.plist for iOS and AndroidManifest.xml for Android.
   * @type boolean
   * @default true
   */
  enableUserLocation?: boolean;
  /**
   * @description Enable large navigation bar title of the UIViewController.
   * @type boolean
   * @platform iOS only
   * @default true
   */
  enableLargeTitle?: boolean;
  /**
   * @description Reject and return nothing if user dismiss the window.
   * @type boolean
   * @default true
   */
  rejectOnCancel?: boolean;
}

export interface PlacePickerResults {
  /**
   * @description Selected coordinate.
   */
  coordinate: PlacePickerCoordinate;
  /**
   * @description Geocoded address for selected location.
   * @if `enableGeocoding: true`
   */
  address?: PlacePickerAddress;
  /**
   * @description Did cancel the place picker window without selecting.
   */
  didCancel: boolean;
}

export function pickPlace(
  options: PlacePickerOptions | undefined = undefined
): Promise<PlacePickerResults> {
  if (options !== undefined) {
    return PlacePicker.pickPlaceWithOptions(options);
  } else {
    return PlacePicker.pickPlace();
  }
}
