import { Button, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../auth/useAuth";
import "./ContentListPage.css";
import { useQuery } from "@tanstack/react-query";
import { getContentList } from "../api/contentApi";
import type { Content } from "../types/ContentType";

const ContentPage = () => {
  /*
    canReadContent
    - 목록 페이지 접근 권한
    - 현재 정책상 비로그인도 READ로 처리 → true
  */
  const navigate = useNavigate();
  const { canReadContent, canCreateContent } = useAuth();

  const { data } = useQuery({
    queryKey: ["contents"],
    queryFn: getContentList,
  });

  /*
    나중에 권한 정책 강화 시 대비
  */
  if (!canReadContent) {
    return <div>접근 권한이 없습니다.</div>;
  }

  const onRow = (record: Content) => ({
    onClick: () => {
      navigate(`/product-content/content/${record.prodContsId}`);
    },
  });

  return (
    <div className="content-page">
      <div className="content-page__header">
        <h1 className="content-page__title">Content</h1>
      </div>

      {/* toolbar를 좌/우 영역으로 분리 */}
      <div className="content-page__toolbar">
        {/* 왼쪽: 검색 */}
        <div className="content-page__toolbar-left">
          <Input.Search
            placeholder="Search by ID or Display Name"
            className="content-page__search"
          />
        </div>

        {/* 오른쪽: 버튼 영역 */}
        <div className="content-page__toolbar-right">
          {/* CREATE 이상 권한일 때만 신규 등록 버튼 표시 */}
          {canCreateContent && (
            <Button
              type="primary"
              onClick={() => navigate("/product-content/content/new")}
            >
              New Content
            </Button>
          )}
        </div>
      </div>

      <div className="content-page__table-wrap">
        <Table
          rowKey="prodContsId"
          dataSource={data}
          onRow={onRow}
          columns={[
            {
              title: "Content ID",
              dataIndex: "prodContsId",
              key: "prodContsId",
            },
            {
              title: "Display Name",
              dataIndex: "admnDispNm",
              key: "admnDispNm",
            },
            {
              title: "Modified By",
              dataIndex: "mdfrId",
              key: "mdfrId",
            },
            {
              title: "Last Updated",
              dataIndex: "mdfDt",
              key: "mdfDt",
            },
          ]}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ContentPage;
