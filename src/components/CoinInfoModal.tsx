import { Divider, Flex, Tag, Typography } from "antd";
import { ICoin } from "../types.ts";
import React from "react";

const CoinInfoModal: React.FC<ICoin> = ({ coin }) => {
  return (
    <>
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
        <Typography.Title style={{ margin: 0, marginRight: 10 }} level={2}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour:</Typography.Text>
        <Tag
          color={coin.priceChange1h > 0 ? "green" : "red"}
          style={{ marginLeft: 10 }}
        >
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day:</Typography.Text>
        <Tag
          color={coin.priceChange1d > 0 ? "green" : "red"}
          style={{ marginLeft: 10 }}
        >
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 week:</Typography.Text>
        <Tag
          color={coin.priceChange1w > 0 ? "green" : "red"}
          style={{ marginLeft: 10 }}
        >
          {coin.priceChange1h}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price:</Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC:</Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap:</Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address:</Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default CoinInfoModal;
