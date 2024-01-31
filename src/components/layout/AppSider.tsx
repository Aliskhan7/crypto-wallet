import React, { useEffect, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from "antd";
import { fakeFetchCrypto, fetchAssets } from "../../api";
import { percentDifference, capitalize } from "../../until";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

function AppSider() {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setAssets(
        assets.map((asset: any) => {
          const coin = result.find((c: any) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset: any) => (
        <Card style={{ marginBottom: "1rem" }}>
          {loading ? (
            <Spin />
          ) : (
            <div>
              <Statistic
                title={capitalize(asset.id)}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                prefix={
                  asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
              />

              <List
                size="small"
                dataSource={[
                  {
                    title: "Total profit",
                    value: asset.totalProfit,
                    withTag: true,
                  },
                  { title: "Asset Amount", value: asset.amount, isPlain: true },
                  // { title: "Total Difference", value: asset.growPercent },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <span>{item.title}</span>
                    <span>
                      {item.withTag && (
                        <Tag color={asset.grow ? "green" : "red"}>
                          {asset.growPercent}%
                        </Tag>
                      )}
                      {item.isPlain && item.value}
                      {!item.isPlain && (
                        <Typography.Text
                          type={asset.grow ? "success" : "danger"}
                        >
                          {item.value.toFixed(2)}$
                        </Typography.Text>
                      )}
                    </span>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;
