import { ReactNode } from 'react';
import { Modal } from 'antd';

export function confirm(content: string | ReactNode, okText: string = 'Ок'): Promise<boolean> {
    return new Promise((resolve, reject) => {
        Modal.confirm({
            title: 'Подтверждение',
            content,
            okText,
            cancelText: 'Отменить',
            onOk: () => resolve(true),
            onCancel: () => reject(false)
        });
    });
}