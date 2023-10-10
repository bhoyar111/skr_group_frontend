import React from 'react';
import { Button } from '@material-ui/core';

import useConfirm from '../../../utils/useConfirm';
import { SERVER_BASE_URL } from '../../../utils/api';
import { getEncryptId } from '../../../utils/secure';

export default function TableTr(props) {


    const { id, banner_img } = props.banner;

    const { sr, deleteData, currentPage, perPage } = props;

    const encId = getEncryptId(id);

    const editLink = `banner-edit/${encId}`

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'banner');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
          <tr>
              <td className="text-center">{newSr}</td>
              <td>
                { banner_img &&
                    <a href={`${SERVER_BASE_URL}${banner_img}`} target="_blank">
                      Banner View
                    </a>
                }
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

