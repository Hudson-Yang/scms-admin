export { default as ContentListPage } from "./list/ContentListPage";
export { default as NewContentPage } from "./new/NewContentPage";

/*
  re-export 설명

  - 이 파일은 content 폴더의 "진입 파일(entry file)" 역할
  - 외부에서는 content 폴더만 import하면 내부 페이지를 사용할 수 있음

  기존:
    import ContentListPage from "./content/ContentListPage";

  변경:
    import { ContentListPage } from "./content";
*/
