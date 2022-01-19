const DiseaseState = Object.freeze({
  UNAFFECTED: { name: 'Незасегнат', color: '#858796' },
  INFECTED: { name: 'Заразен', color: '#f6c23e' },
  CURED: { name: 'Излекуван', color: '#1cc88a' },
  FATAL: { name: 'Жертва', color: '#e74a3b' },
});

export default DiseaseState;
