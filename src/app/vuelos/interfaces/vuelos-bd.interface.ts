export interface ClienteViajes {
  viajesIda: ClienteIdaViajes[];
  viajesVuelta: ClienteIdaVueltaViajes[];
}

export interface ClienteIdaVueltaViajes {
  username: string;
  viajeIda: Viaje;
  viajeVuelta: Viaje;
  fechaCreacion?: Date;
}

export interface ClienteIdaViajes {
  username: string;
  viaje: Viaje;
  fechaCreacion?: Date;
}

export interface Viaje {
  numberOfBookableSeats: number;
  price: Price;
  travelClass: string;
  itineraryDTO: ItineraryDTO;
  dictionaries: Dictionaries;
}

export interface ItineraryDTO {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: Arrival;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: SegmentAircraft;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface SegmentAircraft {
  code: string;
}

export interface Operating {
  carrierCode: string;
}

export interface Arrival {
  iataCode: string;
  terminal: string;
  at: Date;
}

export interface Price {
  currency: string;
  total: number;
  base: number;
  grandTotal: number;
}

export interface Dictionaries {
  aircraft: Aircraft[];
  carriers: Carriers[];
}

export interface Aircraft {
  id: string;
  name: string;
}

export interface Carriers {
  id: string;
  name: string;
}
