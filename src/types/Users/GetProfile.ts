export interface GetProfile {
  message: string;
  data: Data;
}

export interface Data {
  email: string;
  username: string;
  interests: any[];
  name: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: 171;
  weight: 85;
}
