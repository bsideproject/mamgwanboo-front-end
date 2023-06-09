import { DateProto } from "../common/DateProto";
import { ItemProto } from "../common/ItemProto";
import { RelationshipResponseProto } from "../common/RelationshipProto";
import { RelationshipTypeProto } from "../common/type/RelationshipTypeProto";

export interface RelationshipCountResponseProto {
  total? : number;
  given? : number;
  taken : number;
}

export interface RelationshipGetResponseProto {
  relationships?: RelationshipPutResponseProto[];
}

export interface RelationshipGetDetailResponseProto {
  sequence?: string;
  friendSequence?: string;
  type?: RelationshipTypeProto;
  event?: string;
  date?: DateProto;
  createDate?: DateProto;
  modifyDate?: DateProto;
  item?: ItemProto;
  memo?: string;
}

export interface RelationshipPostResponseProto {
  relationships?: RelationshipResponseProto[];
}

export interface RelationshipPutResponseProto {
  sequence?: string;
  type?: RelationshipTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}