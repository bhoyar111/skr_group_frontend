import React from 'react';
import { Button, Link } from '@material-ui/core';

import useConfirm from '../../../../utils/useConfirm';
import { getEncryptId } from '../../../../utils/secure';

export default function TableTr(props) {

    const { id, crop, sub_crop_name } = props.subCrop;

    const { crop_name } = crop || '';

    const { sr, deleteData, currentPage, perPage } = props;

    const encId = getEncryptId(id);

    const editLink = `sub_crop-edit/${encId}`

    const stageLink = `stages/${encId}`;

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'sub_crop');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
        <tr>
            <td className="text-center">{newSr}</td>
            <td>
                <Link
                    href={`/#/${stageLink}`}
                    variant="contained"
                    color="blue"
                    title="stage add/edit"
                    >
                      { sub_crop_name }
                </Link>
            </td>
            <td>{ crop_name }</td>
            <td className="text-center">
                <Button
                    href={`/#/${editLink}`}
                    size="small"
                    variant="contained"
                    className="grey-btn-mui mr-3"
                    >
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className="black-btn-mui mr-3"
                    onClick={showDialog}
                    >
                    Delete
                </Button>
            </td>
        </tr>
    )
}

