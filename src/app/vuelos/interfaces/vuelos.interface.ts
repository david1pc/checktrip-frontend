export interface Busqueda {
  meta: Meta;
  data: Datum[];
}

export interface Datum {
  type: string;
  subType: string;
  name: string;
  iataCode?: string;
  address: Address;
  geoCode: GeoCode;
}

export interface Address {
  countryCode: string;
  stateCode: string;
}

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface Meta {
  count: number;
  links?: Links;
}

export interface Links {
  self: string;
}

export interface Viajes {
  meta: Meta;
  data: Viaje[];
  dictionaries: Dictionaries;
}

export interface Dictionaries {
  locations: Locations;
  aircraft: DictionariesAircraft;
  currencies: Currencies;
  carriers: Carriers;
}

export interface DictionariesAircraft {
  '320': string;
}

export interface Carriers {
  IB: string;
}

export interface Currencies {
  USD: string;
}

export interface Locations {
  MAD: Bcn;
  BCN: Bcn;
}

export interface Bcn {
  cityCode: string;
  countryCode: string;
}

export interface Viaje {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: Date;
  lastTicketingDateTime: Date;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: ViajePrice;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
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
  code: string;
}

export interface Arrival {
  iataCode: string;
  terminal: string;
  at: Date;
}

export interface Operating {
  carrierCode: string;
}

export interface ViajePrice {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: TravelerPricingPrice;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  class: string;
  includedCheckedBags: IncludedCheckedBags;
}

export interface IncludedCheckedBags {
  quantity: number;
}

export interface TravelerPricingPrice {
  currency: string;
  total: string;
  base: string;
}

export interface ViajeInfo {
  id?: number;
  numberOfBookableSeats: number;
  price: ViajePrice;
  itineraries: Itinerary[];
}

export interface OfertaViaje {
  viaje: ViajeInfo;
}
