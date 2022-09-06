import { Key, useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { Button, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { UserDto } from 'common/dto';
import { useAppDispatch } from 'store';
import { toggleSelectedIds, useUsersStore } from 'features/users/state';
import { confirm } from 'common/utils';

export const UsersTable = () => {
    const dispatch = useAppDispatch();
    const { pageData, isPending, totalRecords, selectedIds } = useUsersStore();

    const selectUserRows = (selectedKeys: Key[]) => dispatch(toggleSelectedIds(selectedKeys));

    const edit = () => {
        console.log('Редактировать пользователя');
    };

    const remove = () => {
        confirm('Удалить пользователя?', 'Удалить')
            .then(() => console.log('Удалить'));
    };

    const columns: ColumnsType<UserDto> = useMemo(() => {
        return [
            {
                title: 'Пользователь',
                render: (row: UserDto) => `${row.lastName} ${row.firstName} ${row.patronymic}`,
            },
            {
                title: 'Организация',
                dataIndex: 'organization'
            },
            {
                title: 'E-mail',
                dataIndex: 'email'
            },
            {
                title: '',
                align: 'right',
                width: 100,
                render: () => (
                    <>
                        <Tooltip title="Редактировать">
                            <Button type="text" shape="circle" icon={<EditOutlined />} onClick={edit} />
                        </Tooltip>

                        <Tooltip title="Удалить">
                            <Button type="text" shape="circle" icon={<DeleteOutlined />} onClick={remove} />
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
            rowSelection={{
                selectedRowKeys: selectedIds,
                onChange: selectUserRows
            }}
            pagination={{
                total: totalRecords,
                pageSize: 10
            }} />
    )
}