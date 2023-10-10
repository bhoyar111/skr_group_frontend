import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, setValues, errors, countries, states, cities } = props; //countries, states, cities

    const [displayUrl, setDisplayUrl] = useState('');
    const [address, setAddress] = useState('');

    const [allStates, setAllStates] = useState([]);
    const [allCities, setAllCities] = useState([]);

    const handleImgChange = (event) => {
        const { files, name } = event.target;
        let newUrl = ''
        let newSelectedFile = '';
        if (files && files.length) {
            const selectedFile = files[0];
            newUrl = URL.createObjectURL(selectedFile);
            newSelectedFile = selectedFile;
        }
        setDisplayUrl(newUrl);
        setValues({
            ...values,
            [name]: newSelectedFile
        });
    }

    const handleAutoChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };


    useEffect(() => {
        let countryId = parseInt(values.country_id);
        if (countryId !== 0) {
            let counState = states.filter(state => state.country_id == countryId);
            setAllStates(counState);
        } else {
            setValues({
                ...values,
                state_id: 0,
                city_id: 0
            });
        }
    }, [values.country_id]);

    useEffect(() => {
        let stateId = parseInt(values.state_id);
        if (values.stateId !== 0) {
            let stateCity = cities.filter(city => city.state_id == stateId);
            setAllCities(stateCity);
        }
    }, [values.state_id]);

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="DealerName"
                            label="Dealer Name"
                            variant="outlined"
                            size="small"
                            name="dealer_name"
                            value={values.dealer_name}
                            onChange={handleChange}
                        />
                        {errors.dealer_name && <small className="text-danger">{errors.dealer_name}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Mobile"
                            label="Mobile No."
                            variant="outlined"
                            size="small"
                            name="mobile_no"
                            value={values.mobile_no}
                            onChange={handleChange}
                        />
                        {errors.mobile_no && <small className="text-danger">{errors.mobile_no}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Email"
                            label="Email"
                            variant="outlined"
                            size="small"
                            name="email_id"
                            value={values.email_id}
                            onChange={handleChange}
                        />
                        {errors.email_id && <small className="text-danger">{errors.email_id}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Password"
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="DealerAddress"
                            label="Dealer Address"
                            variant="outlined"
                            size="small"
                            name="dealer_address"
                            value={values.dealer_address}
                            onChange={handleChange}
                        />
                        {errors.dealer_address && <small className="text-danger">{errors.dealer_address}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Dealer Country</InputLabel>
                            <Select
                                labelId="Country"
                                id="Country"
                                label="Dealer Country"
                                name="country_id"
                                value={values.country_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {countries && countries.map((country, i) =>
                                    <MenuItem key={i} value={country.id}>{country.country_name}</MenuItem>
                                )}
                            </Select>
                            {errors.country_id && <small className="text-danger">{errors.country_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Dealer State</InputLabel>
                            <Select
                                labelId="Dealer"
                                id="Dealer"
                                label="Dealer State"
                                name="state_id"
                                value={values.state_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {allStates && allStates.map((state, i) =>
                                    <MenuItem key={i} value={state.id}>{state.state_name}</MenuItem>
                                )}
                            </Select>
                            {errors.state_id && <small className="text-danger">{errors.state_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Dealer City</InputLabel>
                            <Select
                                labelId="DealerCity"
                                id="DealerCity"
                                label="Dealer District"
                                name="district_id"
                                value={values.district_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {allCities && allCities.map((city, i) =>
                                    <MenuItem key={i} value={city.id}>{city.city_name}</MenuItem>
                                )}
                            </Select>
                            {errors.district_id && <small className="text-danger">{errors.district_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Taluka"
                            label="Taluka "
                            variant="outlined"
                            size="small"
                            name="taluka"
                            value={values.taluka}
                            onChange={handleChange}
                        />
                        {errors.taluka && <small className="text-danger">{errors.taluka}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="PinCode"
                            label="Pin Code "
                            variant="outlined"
                            size="small"
                            name="pin_code"
                            value={values.pin_code}
                            onChange={handleChange}
                        />
                        {errors.pin_code && <small className="text-danger">{errors.pin_code}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <div className="custom-file upload">
                            <input
                                type="file"
                                className="custom-file-input shadow-none"
                                id="inputGroupFile02"
                                name="doc_url"
                                onChange={handleImgChange}
                            />
                            <label
                                className="custom-file-label mb-0 shadow-none"
                                htmlFor="inputGroupFile02"
                                aria-describedby="inputGroupFileAddon02"
                            >
                                Dealer Image
                            </label>
                        </div>
                        <div className="custom-file upload text-right">
                            {displayUrl &&
                                <a href={displayUrl} target="_blank">View</a>
                            }
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="GooglePlace"
                            label="Google Place"
                            variant="outlined"
                            size="small"
                            name="google_place"
                            value={values.google_place}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Latitude"
                            label="Latitude"
                            variant="outlined"
                            size="small"
                            name="latitude"
                            value={values.latitude}
                            onChange={handleChange}
                        />
                        {errors.latitude && <small className="text-danger">{errors.latitude}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Longitude"
                            label="Longitude"
                            variant="outlined"
                            size="small"
                            name="longitude"
                            value={values.longitude}
                            onChange={handleChange}
                        />
                        {errors.longitude && <small className="text-danger">{errors.longitude}</small>}
                    </Form.Group>
                    <Col xs={12} className="mt-3">
                        <Button type="submit" variant="contained" size="small" color="primary" className="black-btn-mui text-white py-2 px-4 mb-4">
                            Save
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <PlacesAutocomplete
                        value={address}
                        onChange={handleAutoChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Row>
            </Form>
        </>
    )
}
