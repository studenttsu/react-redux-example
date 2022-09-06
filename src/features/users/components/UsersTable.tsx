import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { Button, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { UserDto } from 'common/dto';
import { confirm } from 'common/utils';
import { useUsersStore, selectUserRowsAction } from '../state';

export const UsersTable = () => {
    const { pageData, isPending, totalRecords, selectedIds } = useUsersStore();

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
            size="small"
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