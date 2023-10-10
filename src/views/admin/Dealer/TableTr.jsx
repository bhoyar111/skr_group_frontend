import React from 'react';
import { Button } from '@material-ui/core';

import useConfirm from '../../../utils/useConfirm';
import { getEncryptId } from '../../../utils/secure';

export default function TableTr(props) {

    const { id, dealer_name, mobile_no, state, city, taluka, pin_code } = props.dealer;

    const { sr, deleteData, currentPage, perPage } = props;

    const encId = getEncryptId(id);

    const { state_name } = state || '';

    const { city_name } = city || '';

    const editLink = `dealer-edit/${encId}`

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'dealer');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
            <tr>
                <td className="text-center">{newSr}</td>
                <td>{dealer_name}</td>
                <td>{mobile_no}</td>
                <td>{state_name}</td>
                <td>{city_name}</td>
                <td>{taluka}</td>
                <td>{pin_code}</td>
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

