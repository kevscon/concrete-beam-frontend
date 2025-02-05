import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/api';

const useAnalyzeBeam = (loadInput, sectionInput, rebarInput, materialInput, factorInput, setLoading) => {
  const [weight, setWeight] = useState('');
  const [M_cr, setM_cr] = useState('');
  const [areaSteel, setAreaSteel] = useState('');
  const [areaSteelPerFt, setAreaSteelPerFt] = useState('');
  const [cracked, setCracked] = useState('');
  const [fConc, setFConc] = useState('');
  const [fSteel, setFSteel] = useState('');
  const [phiMn, setPhiMn] = useState('');
  const [epsilon_st, setEpsilon_st] = useState('');
  const [phiVn, setPhiVn] = useState('');
  const [Ats, setAts] = useState('');
  const [gamma_er, setGammaEr] = useState('');
  const [moment_capacity, setMomentCapacity] = useState(false);
  const [shear_capacity, setShearCapacity] = useState(false);
  const [min_reinf, setMinReinf] = useState(false);
  const [crack_control, setCrackControl] = useState(false);
  const [ductility, setDuctility] = useState(false);
  const [dist_reinf, setDistReinf] = useState(false);

  useEffect(() => {
    let delayTimer;
    const analyzeBeam = async () => {
      delayTimer = setTimeout(() => setLoading(true), 500);
      try {
        const response = await axios.post(`${API_URL}/beam-analysis`, {
          M_u: loadInput.M_u,
          V_u: loadInput.V_u,
          M_s: loadInput.M_s,
          crackClass: loadInput.crackClass,
          width: sectionInput.width,
          height: sectionInput.height,
          cover: sectionInput.cover,
          size: rebarInput.size,
          spacing: rebarInput.spacing,
          steelGrade: materialInput.steelGrade,
          f_c: materialInput.f_c,
          concDensity: materialInput.concDensity,
          phi_m: factorInput.phi_m,
          phi_v: factorInput.phi_v,
        });
        setWeight(response.data.weight);
        setM_cr(response.data.M_cr);
        setAreaSteel(response.data.steel_area);
        setAreaSteelPerFt(response.data.steel_area_per_ft);
        setCracked(response.data.cracked);
        setFConc(response.data.fConc);
        setFSteel(response.data.fSteel);
        setPhiMn(response.data.phiMn);
        setEpsilon_st(response.data.epsilon_st);
        setPhiVn(response.data.phiVn);
        setAts(response.data.A_ts);
        setGammaEr(response.data.gamma_er);
        setMomentCapacity(response.data.moment_capacity);
        setShearCapacity(response.data.shear_capacity);
        setMinReinf(response.data.min_reinf);
        setCrackControl(response.data.crack_control);
        setDuctility(response.data.ductility);
        setDistReinf(response.data.dist_reinf);
      } catch (error) {
        console.error('Error analyzing beam:', error);
      } finally {
        clearTimeout(delayTimer);
        setLoading(false);
      }
    };

    analyzeBeam();
  }, [loadInput, sectionInput, rebarInput, materialInput, factorInput]);

  return { 
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
  };
};

export default useAnalyzeBeam;