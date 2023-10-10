import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../useForm';
import validate from '../../../validate/validateDealer';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const getDs = async () => {
        try {
            const listResponse = await AuthApi.get("/admin/dealers-ds");
            const { status, data } = listResponse;
            if( status === 200 ){
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
            const saveResponse = await AuthApi.post("/admin/dealer-add", formData);
            const { status, data } = saveResponse;
            if( status === 201 && data.dealer !== undefined ){
                toast.success(`Dealer added successfully`);
                props.history.push('/dealers');
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
    )

    useEffect(() => {
        getDs();
    }, [])

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Add"
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
