export type Trait = "Signature" | "Inspiration" | "Perspective";
export type DegreeTrait = "Issued to" | "Issue Date" | "Course Type";

export type NftAttribute = {
  trait_type: Trait;
  value: string;
}

export type degreeAttribute = {
  degree_trait_type : DegreeTrait;
  value: string;
}

export type NftMeta = {
  name: string;
  description: string;
  image: string;
  attributes: NftAttribute[];
}

export type NftDegreeMeta = {
  name: string;
  description: string;
  image: string;
  attributes: degreeAttribute[];
}

export type NftCore = {
  tokenId: number;
  price: number;
  creator: string;
  isListed: boolean
}

export type Nft = {
  meta: NftMeta
} & NftCore

export type FileReq = {
  bytes: Uint8Array;
  contentType: string;
  fileName: string;
}

export type PinataRes = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
}