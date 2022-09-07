import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useEffect } from 'react';

import { fetchOrganizationsActions, useOrganizationsStore } from 'store/organizations';
import { CreateUserDto, UserDto } from 'common/dto';

export type UserFormData = CreateUserDto;

interface UserModalProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    user?: UserDto;
    onSave(date: UserFormData): void;
    onClose(): void;
}

export const UserModal = ({ user, onClose, onSave, ...rest }: UserModalProps) => {
    const [form] = Form.useForm();
    const { organizationsList } = useOrganizationsStore();

    useEffect(() => {
        if (rest.open) {
            fetchOrganizationsActions();
        }
    }, [rest.open, organizationsList]);

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

    const title = `${Boolean(user) ? 'Редактирование' : 'Добавление'} пользователя`;
    const okText = Boolean(user) ? 'Сохранить' : 'Добавить';

    return (
      <Modal {...rest} title={title} onOk={form.submit} okText={okText} onCancel={onClose} afterClose={reset}>
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
                <Input />
            </Form.Item>

            <Form.Item
                label="Имя"
                name="firstName"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Отчество"
                name="middleName"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Организация"
                name="organizationId"
            >
                <Select
                    placeholder="Выберите из списка"
                    options={organizationsList}
                    fieldNames={{ label: 'fullName', value: 'id' }}
                />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
        </Form>
      </Modal>
    );
}