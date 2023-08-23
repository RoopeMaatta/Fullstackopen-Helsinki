
const ListItems = ({ label, values }) => {
    if (!values || Object.keys(values).length === 0) return null;
    return (
      <>
        <p><strong>{label}:</strong></p>
        <ul>
          {Object.values(values).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </>
    );
  };

  export default ListItems