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
}
