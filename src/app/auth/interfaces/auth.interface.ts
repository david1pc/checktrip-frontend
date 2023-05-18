export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  codigo: number;
  nombres: string;
  apellidos: string;
}

export interface ClientRequest {
  person: Person;
}

export interface Person {
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  username: string;
  password: string;
  correo: string;
}

export interface AccountRecoveryRequest {
  correo: string;
}

export interface ClientPasswdRequest {
  username: string;
  password: string;
  newPassword: string;
}
