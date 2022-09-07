import { useEffect, useMemo, useState } from 'react';
import { Button, Card, PageHeader } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { declensionOfWords } from 'common/utils';
import { UserDto } from 'common/dto';

import { createUserAction, editUserAction, fetchUsersAction, removeUsersAction, useUsersStore } from './state';
import { UsersTable } from './components/UsersTable';
import { UserFormData, UserModal } from './components/UserModal';

export const UsersPage = () => {
    const { selectedIds } = useUsersStore();
    const [currentUser, setCurrentUser] = useState<UserDto>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchUsersAction();
    }, []);

    // TODO: Убрать в отдельный компонент
    const removeButtonText = useMemo(() => <>
        Удалить {selectedIds.length} {declensionOfWords(selectedIds.length, ['запись', 'записи', 'записей'])}
    </>, [selectedIds]);

    const removeUsers = () => removeUsersAction(selectedIds);

    const openEditableModal = (user: UserDto) => {
        setCurrentUser(user);
        setIsModalVisible(true);
    };

    const openCreatableModal = () => setIsModalVisible(true);

    const closeModal = () => {
        setCurrentUser(undefined);
        setIsModalVisible(false);
    };

    const editOrCreateUser = (data: UserFormData) => {
        if (currentUser) {
            editUserAction({...currentUser, ...data});
        } else {
            createUserAction(data);
        }
    };

    return (
        <>
            <PageHeader
                title={selectedIds.length > 0 && (
                    <Button icon={<DeleteOutlined />} onClick={removeUsers}>{removeButtonText}</Button>
                )}
                extra={<Button type="primary" onClick={openCreatableModal}>Добавить пользователя</Button>}
            />

            <Card>
                <UsersTable onUserEdit={openEditableModal} />
            </Card>

            <UserModal
                user={currentUser}
                open={isModalVisible}
                onClose={closeModal}
                onSave={editOrCreateUser}
            />
        </>
    );
}