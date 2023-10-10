import React, { useState, useEffect, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { Col, Row, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';

import PageHeader from '../../../containers/PageHeader';
import { AuthApi } from '../../../utils/api';

import myExcel from '../../../assets/sample_excel/dealer_listing.xlsx';

import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";

import TableTr from './TableTr';
import Filter from './Filter';

export default function List() {

    const fileRef = useRef();

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [dealers, setDealers ] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [searchParams, setSearchParams] = useState({});

    const [excelFileName, setExcelFileName ] = useState('No file');
    const [excelDealers, setExcelDealers ] = useState([]);

    const getListing = async (pgNO) => {
        try {
            const listResponse = await AuthApi.get(`/admin/dealers?pageNo=${pgNO}`);
            const { status, data } = listResponse;
            if( status === 200 && data.dealers !== undefined ){
              setDealers(data.dealers);
                const { pageData:{per_page, total_record} } = data || {};
                setPerPage(per_page);
                setTotalRecords(total_record);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const deleteData = async (id) => {
        try {
            const deleteResponse = await AuthApi.delete(`/admin/dealer-delete/${id}`);
            const { status, data } = deleteResponse;
            if( status === 200 && data.dealer !== undefined ){
                toast.success(` Dealer deleted successfully`);
                getListing(currentPage);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    // For Filter Functionality
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

  const getFilterData = async (searchParams, pgNO) => {
      try {
          const listResponse = await AuthApi.get(`/admin/dealers?pageNo=${pgNO}`, {
              params: searchParams
          });
          setSearchParams(searchParams);
          const { status, data } = listResponse;
          if (status === 200) {
              const { pageData:{per_page, total_record} } = data || {};
              setPerPage(per_page);
              setTotalRecords(total_record);
              if (data.dealers !== undefined) setDealers(data.dealers);
          }
      } catch (e) {
          console.log(`😱 Axios request failed: ${e}`);
      }
  }

  // For Excel Import
  const handleFileChange = (event) => {
    const { files } = event.target;
    setExcelFileName('No file');
    setExcelDealers([]);
    if (files && files.length) {
        const f = files[0];
        const ext = f.name.split('.').pop();
        if( ext !== 'xlsx' ) {
            toast.warning(`Only excel files with extension '.xlsx' allowed`);
            return;
        }
        setExcelFileName(f.name);
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary'});
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
            const dataParse = XLSX.utils.sheet_to_json(ws);
            setExcelDealers(dataParse);
        };
        reader.readAsBinaryString(f)
    }
}

  const saveExcelDealers = async () => {
    const dealerFormObj = {
      email_id: '', mobile_no: '', dealer_address: '', district_id: '', state_id: 1
    };

    await Promise.all(excelDealers.map((dealer) => {
        dealer.status = true;
        for ( let [key] of Object.entries(dealerFormObj) ) {
            dealer[key] = (dealer[key] !== undefined) ? dealer[key] : dealerFormObj[key];
        }
    }));

    try {
        const sdata = {
          excel_dealer  : excelDealers
        }
        console.log(excelDealers, 'excelDealers');
        const saveResponse = await AuthApi.post("/admin/dealer-excel-upload", sdata);
        const { status, data } = saveResponse;
        if( status === 201 && data.dealer !== undefined ){
            toast.success(`Dealer added successfully`);
            fileRef.current.value = '';
            setExcelDealers([]);
            setExcelFileName('No file');
            getListing(currentPage);

        }
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
        const { response } = e;
        if(response !== undefined && Object.keys(response.data).length && response.data.message !== undefined ){
            toast.warning(response.data.message);
        }
    }
}

    const getClickedPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
        Object.keys(searchParams).length !== 0 ? getFilterData(searchParams, pageNumber) : getListing(pageNumber);
    }

    useEffect(() => {
        getListing(currentPage);
        getDs();
    }, []);

    return (
        <>
            <CRow>
              <CCol xl={12}>
                <CCardHeader>
                    <Filter
                        getFilterData={getFilterData}
                        countries={countries}
                        states={states}
                        cities={cities}
                    />
                    {/* For Excel Uploded Form Start*/}
                    <Form>
                      <Row>
                        <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                            <a
                                href={myExcel}
                                className="btn btn-outline-info btn-sm"
                                download="dealer_sample.xlsx"
                            >
                                Sample Excel
                            </a>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                          <input
                              ref={fileRef}
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              onChange={handleFileChange}
                          />
                          <label className="custom-file-label" htmlFor="customFile">{excelFileName}</label>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                          { excelDealers && excelDealers.length > 0 &&
                              <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={saveExcelDealers}
                              >
                                  Upload
                              </button>
                          }
                        </Form.Group>
                      </Row>
                    </Form>
                    {/* For Excel Uploded Form End*/}
                </CCardHeader>
              </CCol>
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <PageHeader
                                title="Listing"
                                addlink="dealer-add"
                            />
                        </CCardHeader>
                        <CCardBody>
                            <table className="table bg-white white-table library-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">Sr. No</th>
                                        <th scope="col">Dealer Name</th>
                                        <th scope="col">Dealer Mobile</th>
                                        <th scope="col">State</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Taluka</th>
                                        <th scope="col">Pin No.</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    dealers && dealers.map((dealer, i) => (
                                        <TableTr
                                            sr={i+1}
                                            key={i}
                                            dealer={dealer}
                                            deleteData={deleteData}
                                            currentPage={currentPage}
                                            perPage={perPage}
                                        />
                                    ))
                                }
                                </tbody>
                            </table>
                            <div className="d-flex flex-row py-4 justify-content-center">
                                <Pagination
                                    activePage={currentPage}
                                    prevPageText='prev'
                                    nextPageText='next'
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    pageRangeDisplayed={5}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={totalRecords}
                                    onChange={getClickedPageNo}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
