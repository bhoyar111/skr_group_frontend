import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../useForm';
import validate from '../../../validate/validateDealer';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/dealer-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.dealer !== undefined ){
                const { dealer } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = dealer[key];
                }
                setValues({ ...formInputObj });

                if(data.countries !== undefined ) setCountries(data.countries);
                if(data.states !== undefined) setStates(data.states);
                if(data.cities !== undefined) setCities(data.cities);
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
            const editResponse = await AuthApi.put(`/admin/dealer-update/${id}`, formData);
            const { status, data } = editResponse;
            if( status === 201 && data.dealer !== undefined ){
                toast.success(`Dealer edit successfully`);
                props.history.push("/dealers");
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
      dealer_name    : "",
      mobile_no      : "",
      email_id       : "",
      password       : "",
      dealer_address : "",
      country_id     : "",
      state_id       : "",
      district_id    : "",
      taluka         : "",
      pin_code       : "",
      doc_url        : "",
      google_place   : "",
      latitude       : "",
      longitude      : ""
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
                            backlink="dealers"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            countries={countries}
                            states={states}
                            cities={cities}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
