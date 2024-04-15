import { Flex, Typography } from "antd";
import { ICoin } from "../types.ts";
import React from "react";

const CoinInfo: React.FC<ICoin> = ({ coin, withSymbol }) => {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
      <Typography.Title style={{ margin: 0, marginRight: 10 }} level={2}>
        {withSymbol && coin.symbol} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
