import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { Button, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { UserDto } from 'common/dto';
import { useUsersStore, selectUserRowsAction, removeUsersAction } from '../state';

interface UsersTableProps {
    onUserEdit(user: UserDto): void;
}

export const UsersTable = ({ onUserEdit }: UsersTableProps) => {
    const { pageData, isPending, totalRecords, selectedIds } = useUsersStore();
    const remove = (userId: number) => removeUsersAction([userId]);

    const columns: ColumnsType<UserDto> = useMemo(() => {
        return [
            {
                title: 'Пользователь',
                key: 'user',
                render: (user: UserDto) => `${user.lastName} ${user.firstName} ${user.middleName}`,
            },
            {
                title: 'Организация',
                key: 'organization',
                dataIndex: 'organizationId',
                width: '30%'
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
                width: '30%'
            },
            {
                key: 'actions',
                align: 'right',
                width: 100,
                render: (user: UserDto) => (
                    <>
                        <Tooltip title="Редактировать">
                            <Button type="text" shape="circle" icon={<EditOutlined />} onClick={() => onUserEdit(user)} />
                        </Tooltip>

                        <Tooltip title="Удалить">
                            <Button type="text" shape="circle" icon={<DeleteOutlined />} onClick={() => remove(user.id)} />
                        </Tooltip>
                    </>
                )
            }
        ];
    }, []);

    return (
        <Table
            columns={columns}
            dataSource={pageData}
            loading={isPending}
            size="middle"
            rowKey="id"
            rowSelection={{
                selectedRowKeys: selectedIds,
                onChange: selectUserRowsAction
            }}
            pagination={{
                pageSize: 10,
                total: totalRecords,
                showTotal: () => <>Всего: {totalRecords}</>,
                // hideOnSinglePage: true
            }} />
    )
}