import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CreateUserDto, UserDto } from 'common/dto';
import { useEffect } from 'react';

export type UserFormData = CreateUserDto;

interface UserModalProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    user?: UserDto;
    onSave(date: UserFormData): void;
    onClose(): void;
}

export const UserModal = ({ user, onClose, onSave, ...rest }: UserModalProps) => {
    const [form] = useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user]);

    const onSubmit = (formData: UserFormData) => {
        onSave(formData);
        onClose();
    };

    const reset = () => form.resetFields();

    return (
      <Modal {...rest} title="Пользователь" onOk={form.submit} onCancel={onClose} afterClose={reset}>
        <Form
            form={form}
            onFinish={onSubmit}
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
                name="organizationId"
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