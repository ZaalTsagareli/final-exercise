export interface JwtPayloadInterface {
  email: string;
  id: number;
  user: 'doctor' | 'patient';
}
