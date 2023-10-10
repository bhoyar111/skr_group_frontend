import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';

import useForm from '../../../useForm';
import validate from '../../../validate/validateAskTheExpert';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const [farmers, setFarmers] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/asktheexpert-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.asktheexpert !== undefined ){
                const { asktheexpert } = data;

                const dateInputKey = ['ask_date'];

                for (let [key] of Object.entries(formInputObj)) {
                  if( dateInputKey.includes(key) ){
                    formInputObj[key] = moment(new Date(asktheexpert[key])).format("YYYY-MM-DD");
                }else{
                    formInputObj[key] = asktheexpert[key];
                }
              }

                setValues({ ...formInputObj });

                if(data.farmers !== undefined) setFarmers(data.farmers);

            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {

            const formData = new FormData();
              for ( let [key] of Object.entries(values) ) {
                  formData.append(key, values[key]);
              }

            const editResponse = await AuthApi.put(`/admin/asktheexpert-update/${id}`, formData);
            const { status, data } = editResponse;
            if( status === 201 && data.asktheexpert !== undefined ){
                toast.success(`Ask The Expert edit successfully`);
                props.history.push("/asktheexperts");
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            // setErrors
            const { response } = e;
            if(response !== undefined && Object.keys(response.data).length && response.data.error !== undefined ){
                setErrors(response.data.error); // if error from server side
            }
        }
    }

    const formInputObj = {
      subject     : "",
      farmer_id   : "",
      description : "",
      ask_date    : moment(new Date()).format("YYYY-MM-DD"),
      doc_url     : ""
  };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        submit,
        validate,
        formInputObj
    );

    useEffect(() => {
        getEditData();
    }, []);

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Edit"
                            backlink="asktheexperts"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            farmers={farmers}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
