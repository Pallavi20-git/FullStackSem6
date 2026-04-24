import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const cardData = [
    {
      title: "Card One",
      description: "This is the first card using Bootstrap."
    },
    {
      title: "Card Two",
      description: "This is the second card using Bootstrap."
    },
    {
      title: "Card Three",
      description: "This is the third card using Bootstrap."
    },
    {
      title: "Card Four",
      description: "This is the fourth card using Bootstrap."
    }
  ];

  return (
    <>
      <style>{`
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8f9fa;
          margin: 0;
        }

        .custom-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .custom-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .text-center {
          text-align: center;
        }
      `}</style>


      <div className="container">
        <h2 className="text-center">
          Card-Based Layout Using Bootstrap
        </h2>

        <div className="row">
          {cardData.map((card, index) => (
            <div className="col-md-3 col-sm-6 mb-4" key={index}>
              <div className="card custom-card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                  <button className="btn btn-primary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
