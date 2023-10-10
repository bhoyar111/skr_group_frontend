import React from 'react';
import { useParams } from "react-router-dom";
import { Button, Link } from '@material-ui/core';

import useConfirm from '../../../../utils/useConfirm';
import { getEncryptId } from '../../../../utils/secure';

export default function TableTr(props) {

    const { sub_crop_id } = useParams();

    const { id, stage_name } = props.stage;

    const { sr, deleteData, currentPage, perPage } = props;

    const encId = getEncryptId(id);

    const editLink = `stage-edit/${encId}/${sub_crop_id}`

    const stageInfoLink = `stageInfos/${sub_crop_id}/${encId}`

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'stage');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
            <tr>
                <td className="text-center">{newSr}</td>
                <td>
                    <Link
                        href={`/#/${stageInfoLink}`}
                        variant="contained"
                        color="blue"
                        title="stage add/edit"
                        >
                          {stage_name}
                    </Link>
                </td>
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

