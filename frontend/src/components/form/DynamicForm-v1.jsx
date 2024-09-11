import React from "react";
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
import dayjs from "dayjs"; // 引入 dayjs

const { TextArea } = Input;

const FormItemMap = {
  input: Input,
  number: InputNumber,
  select: Select,
  date: DatePicker,
  checkbox: Checkbox,
  radio: Radio.Group,
  textarea: TextArea,
};
function DynamicForm({ children, onFinish, initialValues, ...props }) {
  const [form] = Form.useForm();

  // 將初始值中的日期字符串轉換為 dayjs 對象
  const formattedInitialValues = React.useMemo(() => {
    if (!initialValues) return initialValues;
    const formatted = { ...initialValues };
    Object.keys(formatted).forEach((key) => {
      if (
        formatted[key] &&
        props.fields.find((f) => f.name === key && f.type === "date")
      ) {
        formatted[key] = dayjs(formatted[key]);
      }
    });
    return formatted;
  }, [initialValues, props.fields]);

  const handleFinish = (values) => {
    // 將 dayjs 對象轉換回字符串
    const formattedValues = { ...values };
    Object.keys(formattedValues).forEach((key) => {
      if (formattedValues[key] && dayjs.isDayjs(formattedValues[key])) {
        formattedValues[key] = formattedValues[key].format("YYYY-MM-DD");
      }
    });
    onFinish(formattedValues);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={formattedInitialValues}
      layout="vertical"
      {...props}
    >
      <Row gutter={16}>{children({ form, FormItem: Form.Item })}</Row>
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          {props.submitText || "提交"}
        </Button>
      </Form.Item> */}
    </Form>
  );
}

DynamicForm.Field = ({ field, children }) => {
  const Component = FormItemMap[field.type];
  if (!Component) return null;

  const renderFormItem = () => {
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
      case "date":
        return <Component {...field.props} format="YYYY-MM-DD" />;
      default:
        return <Component {...field.props} />;
    }
  };

  return (
    <Form.Item
      noStyle
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
              valuePropName={field.type === "checkbox" ? "checked" : "value"}
              rules={field.rules}
            >
              {children ? children(renderFormItem()) : renderFormItem()}
            </Form.Item>
          </Col>
        ) : null;
      }}
    </Form.Item>
  );
};

DynamicForm.Field.displayName = "DynamicForm.Field";

export default DynamicForm;
