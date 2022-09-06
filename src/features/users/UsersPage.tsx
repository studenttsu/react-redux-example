import { useEffect } from 'react';
import { Button, Card, PageHeader } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'store';

import { fetchUsers, useUsersStore } from 'features/users/state';
import { UsersTable } from './components/UsersTable';
import { declensionOfWords } from 'common/utils/declensionOfWords';

export const UsersPage = () => {
    const dispatch = useAppDispatch();
    const { selectedIds } = useUsersStore();

    useEffect(() => {
        dispatch(fetchUsers({ pageSize: 10, pageIndex: 0 }));
    }, []);

    return (
        <>
            <PageHeader
                title={selectedIds.length > 0 && (
                    <Button icon={<DeleteOutlined />}>
                        Удалить {selectedIds.length} {declensionOfWords(selectedIds.length, ['запись', 'записи', 'записей'])}
                    </Button>
                )}
                extra={<Button type="primary">Добавить пользователя</Button>}
            />

            <Card bordered={false}>
                <UsersTable />
            </Card>
        </>
    );
}