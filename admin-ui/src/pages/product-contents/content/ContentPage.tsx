import { Button, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import "./ContentPage.css";

interface ContentItem {
  key: number;
  thumbnail: string;
  prodContsId: number;
  AdmnDispNm: string;
  mdfrId: string;
  mdfDt: string;
}

const { Search } = Input;

const ContentPage = () => {
  const [searchText, setSearchText] = useState("");

  const columns: ColumnsType<ContentItem> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (value: string) => (
        <div className="content-thumbnail">{value}</div>
      ),
    },
    {
      title: "Content ID",
      dataIndex: "prodContsId",
      key: "prodContsId",
    },
    {
      title: "Display Name",
      dataIndex: "AdmnDispNm",
      key: "AdmnDispNm",
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
  ];

  const data: ContentItem[] = Array.from({ length: 23 }).map((_, index) => ({
    key: index,
    thumbnail: "IMG",
    prodContsId: 1000 + index,
    AdmnDispNm: `Sample Content ${index + 1}`,
    mdfrId: "admin",
    mdfDt: "2026-03-04",
  }));

  const filteredData = data.filter(
    (item) =>
      item.AdmnDispNm.toLowerCase().includes(searchText.toLowerCase()) ||
      item.prodContsId.toString().includes(searchText),
  );

  return (
    <div className="content-page">
      <h2 className="content-page__title">Content</h2>

      <div className="content-page__actions">
        <Search
          placeholder="Search by ID or Display Name"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />

        <Button type="primary">New Content</Button>
      </div>

      <div className="content-page__table">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ContentPage;
