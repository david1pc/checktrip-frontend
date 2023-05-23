export interface ClienteIdaVueltaViajes {
  id?: number;
  username: string;
  viaje_ida: Viaje;
  viaje_vuelta: Viaje;
  fechaCreacion?: Date;
}

export interface ClienteIdaViajes {
  id?: number;
  username: string;
  viaje: Viaje;
  fechaCreacion?: Date;
}

export interface Viaje {
  id?: number;
  numberOfBookableSeats: number;
  price: Price;
  itineraries: Itinerary[];
  dictionaries: Dictionaries;
}

export interface Itinerary {
  id?: number;
  id_viaje?: number;
  duration: string;
  segments: Segment[];
}

export interface Segment {
  codigo?: number;
  id_itinerario?: number;
  departure: Arrival;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: SegmentAircraft;
  operating: Operating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface SegmentAircraft {
  id?: number;
  code: string;
}

export interface Operating {
  id?: number;
  carrierCode: string;
}

export interface Arrival {
  iataCode: string;
  terminal: string;
  at: Date;
}

export interface Price {
  id?: number;
  currency: string;
  total: string;
  base: string;
  grandTotal: string;
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
