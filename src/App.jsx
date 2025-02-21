import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import myImage from "./assets/input_slab.png";
import TextField from './components/TextField';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import StatusBox from './components/StatusBox';
import ResultField from './components/ResultField';
import useAnalyzeBeam from './hooks/useAnalyzeBeam';
import { Spinner } from 'react-bootstrap';

const App = () => {
  const [loadInput, setLoadInput] = useState({ M_u: 0, V_u: 0, M_s: 0, crackClass: "Class 2" });
  const [sectionInput, setSectionInput] = useState({ width: 12, height: 8, cover: 1 });
  const [rebarInput, setRebarInput] = useState({ size: "#5", spacing: 12 });
  const [materialInput, setMaterialInput] = useState({ steelGrade: "A615, Grade 60", f_c: 4, concDensity: 150 });
  const [factorInput, setFactorInput] = useState({ phi_m: 0.9, phi_v: 0.9 });
  const [loading, setLoading] = useState(false);

  const {
    weight, 
    M_cr, 
    areaSteel, 
    areaSteelPerFt, 
    cracked, 
    fConc, 
    fSteel, 
    phiMn, 
    epsilon_st, 
    phiVn, 
    Ats, 
    gamma_er,
    moment_capacity,
    shear_capacity,
    min_reinf,
    crack_control,
    ductility,
    dist_reinf
  } = useAnalyzeBeam(loadInput, sectionInput, rebarInput, materialInput, factorInput, setLoading);

  const handleInputChange = (setter) => (key, value) => setter((prev) => ({ ...prev, [key]: parseFloat(value) }));
  const handleSelectChange = (setter) => (key, value) => setter((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="container mt-5 d-flex">
      <div style={{ flex: 1 }}>
        <h2 className="mb-4">Input</h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>


        {/* Load Input */}
        <div className="row mb-3 align-items-end">
          <InputField label="M<sub>u</sub> (k-ft)" value={loadInput.M_u} onChange={handleInputChange(setLoadInput)} id="M_u" min="0"/>
          <InputField label="V<sub>u</sub> (kips)" value={loadInput.V_u} onChange={handleInputChange(setLoadInput)} id="V_u" min="0"/>
          <InputField label="M<sub>s</sub> (k-ft)" value={loadInput.M_s} onChange={handleInputChange(setLoadInput)} id="M_s" min="0"/>
          <SelectField label="Crack Class" value={loadInput.crackClass} onChange={handleSelectChange(setLoadInput)} id="crackClass" options={['Class 1', 'Class 2']}/>
        </div>

        {/* Section Input */}
        <div className="row mb-3 align-items-end">
          <InputField label="Width, b (in)" value={sectionInput.width} onChange={handleInputChange(setSectionInput)} id="width" min="0"/>
          <InputField label="Height, h (in)" value={sectionInput.height} onChange={handleInputChange(setSectionInput)} id="height" min="0"/>
          <InputField label="Cover (in)" value={sectionInput.cover} onChange={handleInputChange(setSectionInput)} id="cover" step="0.25" min="0"/>
          <TextField label="Self-Weight (k/ft)" value={weight} readOnly id="weight" style={{ backgroundColor: '#f0f0f0' }}/>
        </div>

        {/* Rebar Input */}
        <div className="row mb-3 align-items-end">
          <SelectField label="Rebar Size" value={rebarInput.size} onChange={handleSelectChange(setRebarInput)} id="size" options={['#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10', '#11']}/>
          <InputField label="Spacing (in)" value={rebarInput.spacing} onChange={handleInputChange(setRebarInput)} id="spacing" step="0.5" min="0"/>
          <TextField label="Steel Area (in<sup>2</sup>)" value={areaSteel} readOnly id="areaSteel" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="Steel Area (in<sup>2</sup>/ft)" value={areaSteelPerFt} readOnly id="areaSteelPerFt" style={{ backgroundColor: '#f0f0f0' }}/>
        </div>

        {/* Material Input */}
        <div className="row mb-3 align-items-end">
          <SelectField label="Steel Grade" value={materialInput.steelGrade} onChange={handleSelectChange(setMaterialInput)} id="steelGrade" options={["Grade 40", "A615, Grade 60", "A615, Grade 75", "A615, Grade 80", "A607, Grade 60", "A607, Grade 80", "A1035, Grade 100"]}/>
          <InputField label="f'<sub>c</sub> (ksi)" value={materialInput.f_c} onChange={handleInputChange(setMaterialInput)} id="f_c" step="0.5" min="2.5" max="10"/>
          <InputField label="Conc. Density (pcf)" value={materialInput.concDensity} onChange={handleInputChange(setMaterialInput)} id="concDensity" min="0"/>
          <TextField label="M<sub>cr</sub> (k-ft)" value={M_cr} readOnly id="M_cr" style={{ backgroundColor: '#f0f0f0' }}/>

        </div>

        {/* Factor Input */}
        <div className="row mb-3 align-items-end">
          <InputField label="&phi;<sub>m</sub>" value={factorInput.phi_m} onChange={handleInputChange(setFactorInput)} id="phi_m" step="0.01" min="0" max="1"/>
          <InputField label="&phi;<sub>v</sub>" value={factorInput.phi_v} onChange={handleInputChange(setFactorInput)} id="phi_v" step="0.01" min="0" max="1"/>
        </div>

        {/* Outputs */}
        <h4>Design Output:</h4>
        <div className="row mb-3 align-items-end">
          <TextField label="&phi;M<sub>n</sub> (k-ft)" value={phiMn} readOnly id="phiMn" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="Steel Strain" value={epsilon_st} readOnly id="epsilon_st" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="&phi;V<sub>n</sub> (k-ft)" value={phiVn} readOnly id="phiVn" style={{ backgroundColor: '#f0f0f0' }}/>
        </div>
        <h4>Service Stress:</h4>
        <div className="row mb-3 align-items-end">
          <ResultField label="Cracked?" value={cracked} readOnly id="cracked" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="Conc. Stress (ksi)" value={fConc} readOnly id="fConc" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="Steel Stress (ksi)" value={fSteel} readOnly id="fSteel" style={{ backgroundColor: '#f0f0f0' }}/>
        </div>
        <h4>Reinf. Output:</h4>
        <div className="row mb-3 align-items-end">
          <TextField label="A<sub>ts</sub> (in<sup>2</sup>/ft)" value={Ats} readOnly id="Ats" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="&lambda;<sub>er</sub>" value={gamma_er} readOnly id="gamma_er" style={{ backgroundColor: '#f0f0f0' }}/>
        </div>

          </>
        )}

      </div>

      {/* Section image on the right side */}
      <div style={{ flexShrink: 0, marginLeft: '20px' }}>
        <h2>Section View</h2>
        <img
          src={myImage}
          alt="Placeholder"
          className="img-fluid rounded border"
          style={{ width: '400px', height: 'auto' }}
        />
        <br></br><br></br>
        <h2>Design Checks</h2>
        <StatusBox label="Moment Capacity" value={moment_capacity} readOnly id="moment_capacity" />
        <br></br>
        <StatusBox label="Shear Capacity" value={shear_capacity} readOnly id="shear_capacity" />
        <br></br>
        <StatusBox label="Min. Reinf." value={min_reinf} readOnly id="min_reinf" />
        <br></br>
        <StatusBox label="Crack Control" value={crack_control} readOnly id="crack_control" />
        <br></br>
        <StatusBox label="Ductility" value={ductility} readOnly id="ductility" />
        <br></br>
        <StatusBox label="Distribution Reinf." value={dist_reinf} readOnly id="dist_reinf" />
      </div>

    </div>
  );
};

export default App;