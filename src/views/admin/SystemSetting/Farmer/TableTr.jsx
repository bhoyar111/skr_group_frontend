import React from 'react';
// import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';

import useConfirm from '../../../../utils/useConfirm';
import { getEncryptId } from '../../../../utils/secure';

export default function TableTr(props) {

    const { id, full_name, mobile_no, city } = props.farmer;

    const { sr, deleteData, currentPage, perPage } = props;

    const { city_name } = city || '';

    const encId = getEncryptId(id);

    const editLink = `farmer-edit/${encId}`;

    // const cropGrownLink = `crop-grown/${encId}`;

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'farmer');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
            <tr>
                <td className="text-center">{newSr}</td>
                <td>{full_name}</td>
                <td>{mobile_no}</td>
                <td>{city_name}</td>
                {/* <td>
                    <Link
                        href={`/#/${cropGrownLink}`}
                        variant="contained"
                        color="blue"
                        >
                        Crop Grown
                    </Link>
                </td> */}
                <td>
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

