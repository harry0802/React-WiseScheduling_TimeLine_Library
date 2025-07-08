import { Form, Input, Button, Space } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {
  GroupFormContainer,
  GroupFormItem,
  GroupFormContent,
  GroupFormInput,
  GroupFormRemoveButton,
  GroupFormAddition,
} from "./ProductGroupForm.styled";

// Purchase Order Form Component
function ProductGroupForm() {
  return (
    <GroupFormContainer>
      <GroupFormItem>
        <Form.List name={"items"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", width: "100%" }}>
                  <GroupFormContent>
                    <GroupFormInput>
                      <Form.Item
                        {...restField}
                        name={[name, "moldno"]}
                        label={`模具編號${name + 1}`} // Custom label for each item
                      >
                        <Input placeholder="XXX-00XX-XXXD" />
                      </Form.Item>
                    </GroupFormInput>

                    <GroupFormRemoveButton onClick={() => remove(name)}>
                      <CloseIcon />
                    </GroupFormRemoveButton>
                  </GroupFormContent>
                </Space>
              ))}

              <GroupFormAddition>
                <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
                  <Button
                    type="circle"
                    onClick={() => add()}
                    icon={
                      <AddIcon
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
              </GroupFormAddition>
            </>
          )}
        </Form.List>
      </GroupFormItem>
    </GroupFormContainer>
  );
}

export default ProductGroupForm;
