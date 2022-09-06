import { Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

export const UserModal = () => {
    const [form] = useForm();

    return (
      <Modal title="Пользователь" onOk={form.submit}>
        <Form
            form={form}
            labelCol={{ span: 6 }}
        >
            <Form.Item
                label="Фамилия"
                name="lastName"
                rules={[{ required: true }]}
            >
                <Input placeholder="Иванов" />
            </Form.Item>

            <Form.Item
                label="Имя"
                name="firstName"
                rules={[{ required: true }]}
            >
                <Input placeholder="Иван" />
            </Form.Item>

            <Form.Item
                label="Отчество"
                name="middleName"
            >
                <Input placeholder="Иванович" />
            </Form.Item>

            <Form.Item
                label="Организация"
                name="firstName"
            >
                <Select placeholder="Выберите из списка">
                    <Select.Option>111</Select.Option>
                    <Select.Option>222</Select.Option>
                    <Select.Option>333</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
            >
                <Input placeholder="ivanov@mail.ru" />
            </Form.Item>
        </Form>
      </Modal>
    );
}