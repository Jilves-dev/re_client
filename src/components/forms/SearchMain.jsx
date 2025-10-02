import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchMain.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handlePriceSelect = (name, array) => {
    setSearch({
      ...search,
      price: name,
      priceRange: array,
    });
    setDropdownOpen(false);
  };

  const handleSearch = async () => {
    setSearch({ ...search, loading: true });
    try {
      const { results, page, price, lat, lng, ...rest } = search;
      
      // Rakenna query - käytä search state:sta action ja type
      const queryParams = {
        action: search.action || 'Buy',
        type: search.type || 'House',
        ...rest
      };
      
      // Lisää koordinaatit vain jos ne on asetettu
      if (lat && lng) {
        queryParams.lat = lat;
        queryParams.lng = lng;
      }
      
      // Lisää osoite vain jos se on asetettu
      if (search.address) {
        queryParams.address = search.address;
      }
      
      const query = queryString.stringify(queryParams);
      console.log("Search query:", query);
      console.log("Current search state:", search);

      const { data } = await axios.get(`/search?${query}`);
      console.log("Search results:", data);

      setSearch((prev) => ({
        ...prev,
        results: data,
        page: '/search',
        loading: false,
      }));
      navigate('/search');
    } catch (err) {
      console.error("Search error:", err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
    <div className="container search-form-container">
      <div className="search-input-container google-places-input">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
          selectProps={{
            defaultInputValue: search?.address,
            placeholder: 'Search address or city...',
            filterOption: null,
            isSearchable: true,
            isClearable: true,
            loadingMessage: () => 'Searching...',
            noOptionsMessage: ({ inputValue }) => 
              inputValue.length < 3 ? 'write at least 3 characters' : 'No results found',
            
            onChange: async (place) => {
              if (!place) {
                setSearch({
                  ...search,
                  address: '',
                  lat: null,
                  lng: null
                });
                return;
              }

              const placeId = place.value.place_id;
              const address = place.value.description;

              try {
                const res = await axios.get(`/geocode`, {
                  params: { place_id: placeId }
                });

                const location = res.data.results[0]?.geometry?.location;

                if (location) {
                  setSearch({
                    ...search,
                    address,
                    lat: location.lat,
                    lng: location.lng
                  });
                }
              } catch (err) {
                console.error("Geocoding error:", err.response?.data || err);
              }
            },
            styles: {
              container: (provided) => ({
                ...provided,
                flexGrow: 1,
                zIndex: 1001,
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 99999,
                position: 'absolute',
                maxHeight: '200px',
                overflowY: 'auto',
              }),
              menuList: (provided) => ({
                ...provided,
                zIndex: 99999,
                maxHeight: '180px',
              }),
              control: (provided, state) => ({
                ...provided,
                width: '100%',
                boxShadow: state.isFocused ? '0 0 0 2px #90AEAD' : 'none',
                borderRadius: '4px',
                borderColor: state.isFocused ? '#90AEAD' : '#e5e7eb',
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: '0 10px',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#FBE9D0' : 'white',
                color: '#244855',
                fontSize: '14px',
                padding: '10px 12px',
                cursor: 'pointer',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#244855',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#9ca3af',
              }),
            },
            menuPortalTarget: document.body,
            components: {
              IndicatorsContainer: () => null,
              Option: ({ children, ...props }) => {
                return (
                  <div {...props.innerProps} className="google-places-option">
                    <div className="option-main">{children}</div>
                  </div>
                );
              },
            },
          }}
          autocompletionRequest={{
            types: ['geocode'],
            language: 'en',
          }}
          debounce={300}
        />
        <button
          className="settings-icon-button"
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
        >
          <VscSettings />
        </button>
      </div>

      <div className="button-group w-full px-2 d-none d-lg-flex justify-center">
        <Button
          onClick={() => setSearch({ ...search, action: 'Buy' })}
          className={`btn ${search.action === 'Buy' && 'active'}`}
        >
          {search.action === 'Buy' ? <span style={{ color: '#E64833'}}> ✓</span> : ''} Buy
        </Button>
        <Button
          onClick={() => setSearch({ ...search, action: 'Rent' })}
          className={`btn ${search.action === 'Rent' && 'active'}`}
        >
          {search.action === 'Rent' ? <span style={{ color: '#E64833'}}> ✓</span> : ''} Rent
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: 'House' })}
          className={`btn ${search.type === 'House' && 'active'}`}
        >
          {search.type === 'House' ? <span style={{ color: '#244855'}}> ✓</span> : ''} House
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: 'Land' })}
          className={`btn ${search.type === 'Land' && 'active'}`}
        >
          {search.type === 'Land' ? <span style={{ color: '#244855'}}> ✓</span> : ''} Land
        </Button>
        <Dropdown as={ButtonGroup} className="price-button">
          <Button onClick={toggleDropdown}>
            {search?.price ? search.price : 'Price'}
          </Button>
          <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1500 }}>
            {(search.action === 'Buy' ? sellPrices : rentPrices).map((item) => (
              <Dropdown.Item
                key={item._id}
                onClick={() => handlePriceSelect(item.name, item.array)}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={handleSearch} className="search-button" disabled={search.loading}>
          {search.loading ? 'Searching ...' : 'Search'}
        </Button>
      </div>

      <Modal show={show} 
      onHide={handleClose} 
      style={{ zIndex: 10000, paddingTop: '80px' }} 
      className="search-modal">
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTransactionType">
              <Form.Label className="fw-bold mb-3">Actions</Form.Label>
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                checked={search.action === 'Buy'}
                onChange={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
               <br />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                checked={search.action === 'Rent'}
                onChange={() => setSearch({ ...search, action: 'Rent', price: '' })}
              />
               <br />
            </Form.Group>
            <Form.Group controlId="formBasicPropertyType">
              <Form.Label className="fw-bold mb-3"> </Form.Label>
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                checked={search.type === 'House'}
                onChange={() => setSearch({ ...search, type: 'House', price: '' })}
              />
               <br />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                checked={search.type === 'Land'}
                onChange={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
               <br />
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="fw-bold mb-3">Price range</Form.Label>
              <br />
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {search.price ? search.price : 'Select Price Range'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {(search.action === 'Buy' ? sellPrices : rentPrices).map((item) => (
                    <Dropdown.Item
                      key={item._id}
                      onClick={() => handlePriceSelect(item.name, item.array)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <br />
            <Button
              variant="primary"
              onClick={() => {
                handleSearch();
                handleClose();
              }}
              disabled={search.loading}
            >
              {search.loading ? 'Searching...' : 'Search'}
            </Button>
            <br />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}