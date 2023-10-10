import React from 'react';
import { Button } from '@material-ui/core';
import moment from 'moment';

import useConfirm from '../../../utils/useConfirm';
import { getEncryptId } from '../../../utils/secure';

export default function TableTr(props) {

    const { id, title, subcrop, link, v_date } = props.video;

    const { sr, deleteData, currentPage, perPage } = props;

    const vDate = moment(new Date(v_date)).format("DD-MM-YYYY");

    const encId = getEncryptId(id);

    const { sub_crop_name } = subcrop || '';

    const editLink = `video-edit/${encId}`

    const deleteSubmit = (closeDialog) => {
        deleteData(encId)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'Video');

    const newSr = ((currentPage - 1) * perPage) + sr;

    return (
          <tr>
              <td className="text-center">{newSr}</td>
              <td>{title}</td>
              <td>{sub_crop_name}</td>
              <td>{link}</td>
              <td>{vDate}</td>
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

