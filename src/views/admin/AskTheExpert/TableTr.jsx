import React from 'react';
import { Button } from '@material-ui/core';
import moment from 'moment';

import useConfirm from '../../../utils/useConfirm';
import { getEncryptId } from '../../../utils/secure';

export default function TableTr(props) {

    const { id, subject, farmer, description, ask_date } = props.askExpert;

    const { sr, deleteData, currentPage, perPage } = props;

    const AskDate = moment(new Date(ask_date)).format("DD-MM-YYYY");

    const encId = getEncryptId(id);

    const { full_name } = farmer || '';

    const editLink = `asktheexpert-edit/${encId}`

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'asktheexpert');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
          <tr>
              <td className="text-center">{newSr}</td>
              <td>{subject}</td>
              <td>{full_name}</td>
              <td>{AskDate}</td>
              <td>{description}</td>
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

