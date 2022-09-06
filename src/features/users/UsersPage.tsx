import { useEffect, useMemo } from 'react';
import { Button, Card, PageHeader } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { declensionOfWords } from 'common/utils';
import { fetchUsersAction, useUsersStore } from './state';
import { UsersTable } from './components/UsersTable';

export const UsersPage = () => {
    const { selectedIds } = useUsersStore();

    useEffect(() => {
        fetchUsersAction();
    }, []);

    const removeButtonText = useMemo(() => <>
        Удалить {selectedIds.length} {declensionOfWords(selectedIds.length, ['запись', 'записи', 'записей'])}
    </>, [selectedIds]);

    return (
        <>
            <PageHeader
                title={selectedIds.length > 0 && (
                    <Button icon={<DeleteOutlined />}>{removeButtonText}</Button>
                )}
                extra={<Button type="primary">Добавить пользователя</Button>}
            />

            <Card bordered={false}>
                <UsersTable />
            </Card>
        </>
    );
}