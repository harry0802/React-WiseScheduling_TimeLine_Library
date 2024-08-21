import { Form, Input, Button, Space } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

// Purchase Order Form Component
function ProductGroupForm() {
  return (
    <div className="groupForm">
      <div className="groupForm-item">
        <Form.List name={"items"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="groupForm__content">
                  <Form.Item
                    {...restField}
                    name={[name, "moldno"]}
                    label={`模具編號${name + 1}`} // Custom label for each item
                    className="groupForm__input"
                  >
                    <Input placeholder="XXX-00XX-XXXD" />
                  </Form.Item>

                  <CloseIcon
                    className="groupForm__button--remove"
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}

              <Form.Item
                className="groupForm__addition"
                style={{ marginTop: 8 }}
              >
                <Button
                  type="circle"
                  onClick={() => add()}
                  icon={
                    <AddIcon
                      className="c-btn-primars"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  }
                >
                  新增模具
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
}

export default ProductGroupForm;
