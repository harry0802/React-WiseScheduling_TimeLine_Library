import React, { useMemo, useCallback, useEffect } from "react";
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
import {
  formatInitialValues,
  formatSubmitValues,
} from "../../utility/formUtils";

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

function DynamicForm({
  children,
  onFinish,
  initialValues,
  submitText = "提交",
  fields = [],
  form: propForm,
  submitButton = false,
  ...props
}) {
  const [defaultForm] = Form.useForm();
  const form = propForm || defaultForm;

  const formattedInitialValues = useMemo(() => {
    return formatInitialValues(initialValues, fields);
  }, [initialValues, fields]);

  const handleFinish = useCallback(
    (values) => {
      const formattedValues = formatSubmitValues(values);
      onFinish(formattedValues);
    },
    [onFinish]
  );

  // * 沒有初始值 就是新的表單
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(formattedInitialValues);
    } else {
      form.resetFields();
    }
  }, [form, formattedInitialValues, initialValues]);

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={formattedInitialValues}
      layout="vertical"
      {...props}
    >
      <Row gutter={16}>{children({ form, FormItem: Form.Item })}</Row>
      {submitButton && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

DynamicForm.Field = React.memo(({ field, children }) => {
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
});

DynamicForm.Field.displayName = "DynamicForm.Field";

export default DynamicForm;
