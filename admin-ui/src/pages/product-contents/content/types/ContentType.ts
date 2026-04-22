export interface Content {
  prodContsId: number;
  admnDispNm: string;
  regrId: string;
  regDt: string;
  mdfrId?: string;
  mdfDt?: string;
  languageList: ContentLanguage[];
}

export interface ContentLanguage {
  prodContsId: number;
  langCd: string;
  prodContsTitl: string;
  prodContsDesc?: string;
  dfltLangYn: string;
  regrId: string;
  regDt: string;
  mdfrId?: string;
  mdfDt?: string;
  saveFlag?: SaveFlag;
}

type SaveFlag = "N" | "I" | "U" | "D";

export interface LanguageRow {
  dfltLangYn?: boolean;
  langCd?: string;
  prodContsTitl?: string;
  prodContsDesc?: string;
  saveFlag: SaveFlag;
  previousSaveFlag?: SaveFlag;
}
