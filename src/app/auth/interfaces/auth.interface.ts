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
  person: person;
}

export interface person {
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  username: string;
  password: string;
  correo: string;
}
