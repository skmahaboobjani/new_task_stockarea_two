

import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import './App.css';

const Data = [
  {
    "name" : "Warehouse-165",
    "code" : "W-00001",
    "id" : 1,
    "city": "Delhi",
    "space_available": 1234,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-32",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-276",
    "code" : "W-00002",
    "id" : 2,
    "city": "Chennai",
    "space_available": 124,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-3039",
    "code" : "W-00003",
    "id" : 3,
    "city": "Indore",
    "space_available": 134,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-324",
    "code" : "W-00004",
    "id" : 4,
    "city": "Chennai",
    "space_available": 12,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-5454",
    "code" : "W-00005",
    "id" : 5,
    "city": "Chennai",
    "space_available": 1243434,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-4345",
    "code" : "W-00006",
    "id" : 6,
    "city": "Chennai",
    "space_available": 1,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-3455",
    "code" : "W-00007",
    "id" : 7,
    "city": "Mumbai",
    "space_available": 4,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-2",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-23455",
    "code" : "W-00008",
    "id" : 8,
    "city": "Bangalore",
    "space_available": 3456,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : true
  },
  {
    "name" : "Warehouse-6457",
    "code" : "W-00009",
    "id" : 9,
    "city": "Bangalore",
    "space_available": 1234545,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-32456",
    "code" : "W-000010",
    "id" : 10,
    "city": "Guwahati",
    "space_available": 121234,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : true
  },
  {
    "name" : "Warehouse-3245678",
    "code" : "W-000011",
    "id" : 11,
    "city": "Delhi",
    "space_available": 98,
    "type" : "Leasable Space",
    "cluster" : "cluster-v-2",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-4567",
    "code" : "W-000012",
    "id" : 12,
    "city": "Indore",
    "space_available": 97,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : true
  },
  {
    "name" : "Warehouse-458",
    "code" : "W-000013",
    "id" : 13,
    "city": "Delhi",
    "space_available": 654,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  }
]
const initialState = {
  warehouses: [...Data],
  filters: {
    name: "",
    city: "",
    cluster: "",
    spaceAvailable: "",
  },
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FILTERS":
      return { ...state, filters: action.payload };
    case "UPDATE_WAREHOUSES":
      return { ...state, warehouses: action.payload };
    default:
      return state;
  }
};

const store = createStore(warehouseReducer);

const WarehouseList = () => {
  const warehouses = useSelector((state) => state.warehouses);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses); 

  const applyFilters = () => {
    const filteredWarehouses = warehouses.filter((warehouse) => {
      const nameMatch =
        !filters.name || warehouse.name.toLowerCase().includes(filters.name.toLowerCase());
      const cityMatch = !filters.city || warehouse.city.toLowerCase() === filters.city.toLowerCase();
      const clusterMatch =
        !filters.cluster || warehouse.cluster.toLowerCase() === filters.cluster.toLowerCase();
      const spaceMatch =
        filters.spaceAvailable === "" || warehouse.space_available >= parseInt(filters.spaceAvailable);

      return nameMatch && cityMatch && clusterMatch && spaceMatch;
    });

    setFilteredWarehouses(filteredWarehouses);
    
  };

  const handleNameChange = (e) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { ...filters, name: e.target.value } });
  };

  const handleCityChange = (e) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { ...filters, city: e.target.value } });
  };

  const handleClusterChange = (e) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { ...filters, cluster: e.target.value } });
  };

  const handleSpaceAvailableChange = (e) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { ...filters, spaceAvailable: e.target.value } });
  };

  return (
    <div>
      <h1>Warehouse Live Status</h1>
      <input
        type="text"
        placeholder="Search by warehouse name"
        value={filters.name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Filter by city"
        value={filters.city}
        onChange={handleCityChange}
      />
      <input
        type="text"
        placeholder="Filter by cluster"
        value={filters.cluster}
        onChange={handleClusterChange}
      />
      <input
        type="number"
        placeholder="Filter by space available"
        value={filters.spaceAvailable}
        onChange={handleSpaceAvailableChange}
      />
      <button onClick={applyFilters}>Apply Filters</button>

      <ul>
        {filteredWarehouses.map((warehouse) => (
          <li key={warehouse.id}>
            <Link to={`/warehouse/${warehouse.id}`}>{warehouse.name} - {warehouse.city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const WarehouseDetails = () => {
  const { id } = useParams();
  const warehouseId = parseInt(id);

  const warehouses = useSelector((state) => state.warehouses);

  const warehouse = warehouses.find((w) => w.id === warehouseId);
  const [editing, setEditing] = useState(false);
  const [editedWarehouse, setEditedWarehouse] = useState({ ...warehouse });
  const [isLiveEditing, setIsLiveEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedWarehouses = warehouses.map((w) =>
      w.id === warehouseId ? editedWarehouse : w
    );

    dispatch({ type: "UPDATE_WAREHOUSES", payload: updatedWarehouses });
    setEditing(false);
    setIsLiveEditing(false);
  };

  const handleCancelClick = () => {
    setEditedWarehouse({ ...warehouse });
    setEditing(false);
    setIsLiveEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedWarehouse({ ...editedWarehouse, [name]: value });
  };

  const handleLiveStatusEdit = () => {
    setIsLiveEditing(true);
  };

  const handleBackToWarehouseList = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Warehouse Details</h1>
      {warehouse && (
        <div>
          <h2>
            {editing ? (
              <input
                type="text"
                name="name"
                value={editedWarehouse.name}
                onChange={handleInputChange}
              />
            ) : (
              warehouse.name
            )}
          </h2>
          <p>
            City:{" "}
            {editing ? (
              <input
                type="text"
                name="city"
                value={editedWarehouse.city}
                onChange={handleInputChange}
              />
            ) : (
              warehouse.city
            )}
          </p>
          <p>
            Cluster:{" "}
            {editing ? (
              <input
                type="text"
                name="cluster"
                value={editedWarehouse.cluster}
                onChange={handleInputChange}
              />
            ) : (
              warehouse.cluster
            )}
          </p>
          <p>
            Space Available:{" "}
            {editing ? (
              <input
                type="number"
                name="space_available"
                value={editedWarehouse.space_available}
                onChange={handleInputChange}
              />
            ) : (
              warehouse.space_available
            )}
          </p>
          <p>
            Live Status:{" "}
            {editing && isLiveEditing ? (
              <input
                type="text"
                name="is_live"
                value={editedWarehouse.is_live ? "Live" : "Not Live"}
                onChange={handleInputChange}
              />
            ) : (
              editedWarehouse.is_live ? "Live" : "Not Live"
            )}
            {editing && !isLiveEditing && (
              <button onClick={handleLiveStatusEdit}>Edit Live Status</button>
            )}
          </p>
          {editing ? (
            <div>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleBackToWarehouseList}>Back to Warehouse List</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WarehouseList />} />
        <Route path="/warehouse/:id" element={<WarehouseDetails />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;

