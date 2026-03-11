import { Button, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getContentList } from "./api/contentApi";
import type { Content } from "./types/ContentType";

import "./ContentPage.css";

const { Search } = Input;

const ContentPage = () => {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: getContentList,
  });

  const columns: ColumnsType<Content> = [
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
  ];

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
          dataSource={data}
          rowKey="prodContsId"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ContentPage;
