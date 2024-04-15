import { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useCrypto } from "../context/crypto-context.tsx";
import { ICoin } from "../types.ts";
import CoinInfo from "./CoinInfo.tsx";
type FieldType = {
  amount?: number;
  price?: number;
  total?: number;
};

const validateMessages = {
  required: "'${label}' is required!",
  types: {
    number: "'${label}' in not valid number",
  },
  number: {
    range: "'${label} must be between '${min}' and '${max}'",
  },
};

function AddAssetForm() {
  const [form] = Form.useForm();
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState<ICoin[] | null>(null);
  const [submited, setSubmited] = useState(false);

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Go Console
          </Button>,
        ]}
      />
    );
  }
  console.log(coin, "coin");
  if (!coin) {
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin: ICoin) => ({
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

  function onFinish(values) {
    console.log("finish", values);
    setSubmited(true);
  }

  function handlerAmountChange(value: number) {
    const price = form.getFieldValue("price");
    form.setFieldValue(
      {
        total: +(value * price).toFixed(2),
      },
      0,
    );
  }

  function handlerPriceChange(value: number) {
    const amount = form.getFieldValue("amount");
    form.setFieldValue(
      {
        total: +(amount * value).toFixed(2),
      },
      0,
    );
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
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
        <InputNumber
          onChange={handlerAmountChange}
          placeholder="Enter to amount"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber onChange={handlerPriceChange} style={{ width: "100%" }} />
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
