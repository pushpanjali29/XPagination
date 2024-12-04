import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rowsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handlers for pagination buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('Failed to fetch data');
    return <p>Unable to display data.</p>;
  }

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table border="1" style={{ width: '80%', margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: '20px', textAlign: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
