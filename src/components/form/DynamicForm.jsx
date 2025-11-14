import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Button,
  Row,
  Col,
} from "antd";

const { TextArea } = Input;

/**
 * 運作邏輯：
 * 1. 根據 config 中的 fields 生成表單欄位
 * 2. 每個欄位根據其 type 生成不同的表單元件（如 Input、Select、DatePicker 等）
 * 3. 如果欄位有 dependencies，則在表單值更新時重新渲染該欄位
 * 4. 如果欄位有 shouldRender 函數，則根據該函數的返回值決定是否渲染該欄位
 * 5. 表單提交時，調用 onFinish 函數
 */

const FormItemMap = {
  input: Input,
  number: InputNumber,
  select: Select,
  date: DatePicker,
  checkbox: Checkbox,
  radio: Radio.Group,
  textarea: TextArea,
};

const DynamicForm = ({ config, onFinish, initialValues }) => {
  const [form] = Form.useForm();

  const renderFormItem = (field) => {
    const Component = FormItemMap[field.type];
    if (!Component) return null;

    switch (field.type) {
      case "select":
      case "radio":
        return (
          <Component {...field.props}>
            {field.options?.map((option) => (
              <Component.Option key={option.value} value={option.value}>
                {option.label}
              </Component.Option>
            ))}
          </Component>
        );
      case "checkbox":
        return <Component {...field.props}>{field.label}</Component>;
      default:
        return <Component {...field.props} />;
    }
  };

  return (
    <Form
      form={form}
      name={config.name}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="vertical"
    >
      <Row gutter={16}>
        {config.fields.map((field) => (
          <Form.Item
            noStyle
            key={field.name}
            shouldUpdate={(prevValues, currentValues) => {
              if (field.dependencies) {
                return field.dependencies.some(
                  (dep) => prevValues[dep] !== currentValues[dep]
                );
              }
              return false;
            }}
          >
            {({ getFieldsValue }) => {
              const formValues = getFieldsValue();
              const shouldRender = field.shouldRender
                ? field.shouldRender(formValues)
                : true;

              return shouldRender ? (
                <Col span={field.span || 24}>
                  <Form.Item
                    name={field.name}
                    label={field.type !== "checkbox" ? field.label : ""}
                    valuePropName={
                      field.type === "checkbox" ? "checked" : "value"
                    }
                    rules={field.rules}
                  >
                    {renderFormItem(field)}
                  </Form.Item>
                </Col>
              ) : null;
            }}
          </Form.Item>
        ))}
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {config.submitText || "提交"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
