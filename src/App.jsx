import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import myImage from "./assets/input_slab.png";

const App = () => {
  // Inputs
  const [loadInput, setLoadInput] = useState({
    M_u: 0, M_s: 0, V_u: 0
  });
  const [sectionInput, setSectionInput] = useState({
    width: 12, height: 8, cover: 1
  });
  const [rebarInput, setRebarInput] = useState({
    size: '#5', spacing: 12
  });
  const [materialInput, setMaterialInput] = useState({
    f_y: 60, f_c: 4, E_s: 29000, concDensity: 150
  });
  const [factorInput, setFactorInput] = useState({
    phi_m: 0.9, phi_v: 0.9
  });

  // Outputs
  const [weight, setWeight] = useState('');
  const [areaSteel, setAreaSteel] = useState('');
  const [areaSteelPerFt, setAreaSteelPerFt] = useState('');

  const [cracked, setCracked] =  useState('');
  const [fConc, setfConc] =  useState('');
  const [fSteel, setfSteel] =  useState('');

  const [phiMn, setPhiMn] = useState('');
  const [epsilon_st, setEpsilon_st] = useState('');
  const [phiVn, setPhiVn] = useState('');

  // Function to handle input changes and send to backend for weight calculation
  useEffect(() => {
    const calculateWeight = async () => {
      try {
        const response = await axios.post(`${API_URL}/weight`, {
          width: sectionInput.width,
          height: sectionInput.height,
          concDensity: materialInput.concDensity,
        });
        setWeight(response.data.weight);
      } catch (error) {
        console.error('Error calculating weight:', error);
      }
    };
    calculateWeight();
  }, [sectionInput.width, sectionInput.height, materialInput.concDensity]);

  // Function to handle input changes and send to backend for steel area calculation
  useEffect(() => {
    const calculateAreaSteel = async () => {
      try {
        const response = await axios.post(`${API_URL}/steelArea`, {
          width: sectionInput.width,
          size: rebarInput.size,
          spacing: rebarInput.spacing,
          cover: sectionInput.cover
        });
        setAreaSteel(response.data.steel_area);
        setAreaSteelPerFt(response.data.steel_area_per_ft);
      } catch (error) {
        console.error('Error calculating steel area:', error);
      }
    };
    calculateAreaSteel();
  }, [sectionInput.width, rebarInput.size, rebarInput.spacing, sectionInput.cover]);

    // Function to calculate slab stress
    useEffect(() => {
      const calculateStress = async () => {
        try {
          const response = await axios.post(`${API_URL}/slabStress`, {
            M_s: loadInput.M_s,
            width: sectionInput.width,
            height: sectionInput.height,
            cover: sectionInput.cover,
            size: rebarInput.size,
            spacing: rebarInput.spacing,
            f_c: materialInput.f_c,
            E_s: materialInput.E_s,
            concDensity: materialInput.concDensity
          });
          setCracked(response.data.cracked);
          setfConc(response.data.fConc)
          setfSteel(response.data.fSteel);
        } catch (error) {
          console.error('Error calculating stress:', error);
        }
      };
      calculateStress();
    }, [
      loadInput.M_s,
      sectionInput.width, 
      sectionInput.height, 
      sectionInput.cover, 
      rebarInput.size, 
      rebarInput.spacing, 
      materialInput.f_c, 
      materialInput.E_s,
      materialInput.concDensity
    ]);

    // Function to calculate slab capacity
    useEffect(() => {
      const calculateCapacity = async () => {
        try {
          const response = await axios.post(`${API_URL}/slabCapacity`, {
            width: sectionInput.width,
            height: sectionInput.height,
            cover: sectionInput.cover,
            size: rebarInput.size,
            spacing: rebarInput.spacing,
            f_y: materialInput.f_y,
            f_c: materialInput.f_c,
            concDensity: materialInput.concDensity,
            phi_m: factorInput.phi_m,
            phi_v: factorInput.phi_v
          });
          setPhiMn(response.data.phiMn);
          setEpsilon_st(response.data.epsilon_st)
          setPhiVn(response.data.phiVn);
        } catch (error) {
          console.error('Error calculating capacity:', error);
        }
      };
      calculateCapacity();
    }, [
      sectionInput.width, 
      sectionInput.height, 
      sectionInput.cover, 
      rebarInput.size, 
      rebarInput.spacing, 
      materialInput.f_y, 
      materialInput.f_c, 
      materialInput.concDensity,
      factorInput.phi_m,
      factorInput.phi_v
    ]);

  // Handlers for updating input states
  const handleLoadInputChange = (key, value) => {
    setLoadInput((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleSectionInputChange = (key, value) => {
    setSectionInput((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleRebarInputChange = (key, value) => {
    setRebarInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleMaterialInputChange = (key, value) => {
    setMaterialInput((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleFactorInputChange = (key, value) => {
    setFactorInput((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <div className="container mt-5 d-flex">
      <div style={{ flex: 1 }}>
        <h1 className="mb-4">Concrete Slab Analyzer</h1>
        <h2 className="mb-4">Input</h2>

        {/* Load Input */}
        <div className="row mb-3 align-items-end">
          <div className="col-md-3 mb-3">
            <label htmlFor="M_u">M_u (k-ft)</label>
            <input
              type="number"
              id="M_u"
              className="form-control"
              value={loadInput.M_u}
              onChange={(e) => handleLoadInputChange('M_u', e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="M_s">M_s (k-ft)</label>
            <input
              type="number"
              id="M_s"
              className="form-control"
              value={loadInput.M_s}
              onChange={(e) => handleLoadInputChange('M_s', e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="V_u">V_u (kips)</label>
            <input
              type="number"
              id="V_u"
              className="form-control"
              value={loadInput.V_u}
              onChange={(e) => handleLoadInputChange('V_u', e.target.value)}
            />
          </div>
        </div>

        {/* Section Input Group with Weight Output */}
        <div className="row mb-3 align-items-end">
          {['width', 'height', 'cover'].map((key) => (
            <div className="col-md-3 mb-3" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="number"
                id={key}
                className="form-control"
                value={sectionInput[key] || 0}
                onChange={(e) => handleSectionInputChange(key, e.target.value)}
              />
            </div>
          ))}
          <div className="col-md-3 mb-3">
            <label htmlFor="weight">Weight (k/ft)</label>
            <input
              type="text"
              id="weight"
              className="form-control"
              value={weight}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
        </div>

        {/* Rebar Input Group with Steel Area Output */}
        <div className="row mb-3 align-items-end">
          <div className="col-md-3 mb-3">
            <label htmlFor="size">Rebar Size</label>
            <select
              id="size"
              className="form-control"
              value={rebarInput.size}
              onChange={(e) => handleRebarInputChange('size', e.target.value)}
            >
              <option value="#3">#3</option>
              <option value="#4">#4</option>
              <option value="#5">#5</option>
              <option value="#6">#6</option>
              <option value="#7">#7</option>
              <option value="#8">#8</option>
              <option value="#9">#9</option>
              <option value="#10">#10</option>
              <option value="#11">#11</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="spacing">Spacing (in)</label>
            <input
              type="number"
              id="spacing"
              className="form-control"
              value={rebarInput.spacing}
              onChange={(e) => handleRebarInputChange('spacing', e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="areaSteel">Steel Area (in^2)</label>
            <input
              type="text"
              id="areaSteel"
              className="form-control"
              value={areaSteel}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="areaSteelPerFt">Steel Area (in^2/ft)</label>
            <input
              type="text"
              id="areaSteelPerFt"
              className="form-control"
              value={areaSteelPerFt}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
        </div>

        {/* Material Input */}
        <div className="row mb-3 align-items-end">
          <div className="col-md-3 mb-3">
            <label htmlFor="f_y">f_y (ksi)</label>
            <select
              id="f_y"
              className="form-control"
              value={materialInput.f_y}
              onChange={(e) => handleMaterialInputChange('f_y', e.target.value)}
            >
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="75">75</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="f_c">f'_c (ksi)</label>
            <input
              type="number"
              id="f_c"
              className="form-control"
              value={materialInput.f_c}
              onChange={(e) => handleMaterialInputChange('f_c', e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="E_s">E_s (ksi)</label>
            <input
              type="number"
              id="E_s"
              className="form-control"
              value={materialInput.E_s}
              onChange={(e) => handleMaterialInputChange('E_s', e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="concDensity">Conc Density (pcf)</label>
            <input
              type="number"
              id="concDensity"
              className="form-control"
              value={materialInput.concDensity}
              onChange={(e) => handleMaterialInputChange('concDensity', e.target.value)}
            />
          </div>
        </div>

        {/* Factor Input */}
        <div className="row mb-3 align-items-end">
          <div className="col-md-3 mb-3">
            <label htmlFor="phi_m">phi_m</label>
            <input
              type="number"
              id="phi_m"
              className="form-control"
              value={factorInput.phi_m}
              onChange={(e) => handleFactorInputChange('phi_m', e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="phi_v">phi_v</label>
            <input
              type="number"
              id="phi_v"
              className="form-control"
              value={factorInput.phi_v}
              onChange={(e) => handleFactorInputChange('phi_v', e.target.value)}
            />
          </div>
        </div>

        <h2 className="mb-4">Output</h2>

        {/* Stress Output */}
        <div className="row mb-3 align-items-end">
          <div className="col-md-3 mb-3">
            <label htmlFor="cracked">Cracked?</label>
            <input
              type="text"
              id="cracked"
              className="form-control"
              value={cracked}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="fConc">Conc. Stress (ksi)</label>
            <input
              type="text"
              id="fConc"
              className="form-control"
              value={fConc}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="fSteel">Steel Stress (ksi)</label>
            <input
              type="text"
              id="fSteel"
              className="form-control"
              value={fSteel}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
        </div>

        {/* Design Output */}
        <div className="row mb-3 align-items-end">
          <div className="col-md-3 mb-3">
            <label htmlFor="phiMn">phiMn (k-ft)</label>
            <input
              type="text"
              id="phiMn"
              className="form-control"
              value={phiMn}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="epsilon_st">Steel Strain</label>
            <input
              type="text"
              id="epsilon_st"
              className="form-control"
              value={epsilon_st}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="phiVn">phiMn (k-ft)</label>
            <input
              type="text"
              id="phiVn"
              className="form-control"
              value={phiVn}
              style={{
                backgroundColor: '#f0f0f0'
              }}
              readOnly
            />
          </div>
        </div>

      </div>

      {/* Section image on the right side */}
      <div style={{ flexShrink: 0, marginLeft: '20px' }}>
        <img
          src={myImage}
          alt="Placeholder"
          className="img-fluid rounded border"
          style={{ width: '400px', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default App;
