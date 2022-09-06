import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { Button, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { UserDto } from 'common/dto';
import { useUsersStore, selectUserRowsAction, removeUsersAction } from '../state';

export const UsersTable = () => {
    const { pageData, isPending, totalRecords, selectedIds } = useUsersStore();

    const edit = () => {
        console.log('Редактировать пользователя');
    };

    const remove = (userId: number) => removeUsersAction([userId]);

    const columns: ColumnsType<UserDto> = useMemo(() => {
        return [
            {
                title: 'Пользователь',
                key: 'user',
                render: (row: UserDto) => `${row.lastName} ${row.firstName} ${row.middleName}`,
            },
            {
                title: 'Организация',
                key: 'organization',
                dataIndex: 'organizationId',
                width: '30%'
            },
            {
                title: 'E-mail',
                key: 'email',
                dataIndex: 'email',
                width: '30%'
            },
            {
                key: 'actions',
                align: 'right',
                width: 100,
                render: (row: UserDto) => (
                    <>
                        <Tooltip title="Редактировать">
                            <Button type="text" shape="circle" icon={<EditOutlined />} onClick={edit} />
                        </Tooltip>

                        <Tooltip title="Удалить">
                            <Button type="text" shape="circle" icon={<DeleteOutlined />} onClick={() => remove(row.id)} />
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
                total: totalRecords,
                pageSize: 10,
                hideOnSinglePage: true
            }} />
    )
}