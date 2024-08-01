import { Form, Input, Button, Space, Drawer } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

// Order items array
const items = [
  {
    item_code: "dnh75n",
  },
  {
    item_code: "456def",
  },
];

// Purchase Order Form Component
function ProductGroupForm({ items, form }) {
  return (
    <>
      <h3>Order Items</h3>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "item_code"]}
                  rules={[{ required: true, message: "Item code is required" }]}
                >
                  <Input placeholder="Item Code" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default ProductGroupForm;
