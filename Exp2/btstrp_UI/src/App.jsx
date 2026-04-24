import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const styles = {
    appContainer: {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      paddingBottom: '50px'
    },
    customCard: {
      borderRadius: '15px',
      border: 'none',
      transition: '0.3s'
    },
    formBox: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    headerGradient: {
      background: 'linear-gradient(45deg, #1e3c72 0%, #2a5298 100%)',
      padding: '15px 0',
      marginBottom: '40px'
    }
  };

  return (
    <div style={styles.appContainer}>
      <nav className="navbar navbar-dark shadow-sm" style={styles.headerGradient}>
        <div className="container">
          <span className="navbar-brand mb-0 h1 fw-bold">UI Design using bootstrap</span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6">
            <div style={styles.formBox}>
              <h4 className="mb-4 fw-bold">Contact Form</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">EMAIL</label>
                  <input 
                    type="email" 
                    className="form-control bg-light border-0" 
                    placeholder="Enter your CU email" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">OBSERVATION</label>
                  <textarea 
                    className="form-control bg-light border-0" 
                    rows="3"
                    placeholder="Describe the component behavior..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100 fw-bold">
                  Submit to Lab
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;