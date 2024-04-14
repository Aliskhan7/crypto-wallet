import { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
} from "antd";
import { useCrypto } from "../context/crypto-context.tsx";
type FieldType = {
  amount?: number;
  price?: number;
  total?: number;
};

function AddAssetForm() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  if (!coin) {
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img width="20px" src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const validateMessages = {
    required: `${label} is required!'`,
    types: {
      number: `${label} in not valid number`,
    },
    number: `${label} must be between ${min} and ${max}`,
  };

  function onFinish(values) {
    console.log("finish", values);
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
        <Typography.Title style={{ margin: 0, marginRight: 10 }} level={2}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />

      <Form.Item<FieldType>
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber />
      </Form.Item>
      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAssetForm;
