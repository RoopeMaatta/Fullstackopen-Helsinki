
const DataItem = ({ label, value }) => {
    if (!value) return null;
    return <p><strong>{label}:</strong> {value}</p>;
  };
  

export default DataItem