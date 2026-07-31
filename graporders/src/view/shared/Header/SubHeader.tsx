import { useHistory } from 'react-router-dom';

function SubHeader(props) {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="subheader-container">
      <div className="subheader-content">
        <div className="back-button" onClick={goBack}>
          <i className="fa-solid fa-arrow-left back-icon"></i>
        </div>
        <div className="subheader-title">{props?.title}</div>
        {/* Optional right slot can be added here */}
      </div>

      <style>{`
        .subheader-container {
          background: #0a0a0a;
          padding: 12px 16px;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          border-bottom: 1px solid rgba(136, 189, 31, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .subheader-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 430px;
          margin: 0 auto;
        }

        .back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(136, 189, 31, 0.1);
          border: 1px solid rgba(136, 189, 31, 0.3);
          transition: background 0.2s, border-color 0.2s;
        }

        .back-button:hover {
          background: rgba(136, 189, 31, 0.2);
          border-color: #88bd1f;
        }

        .back-icon {
          color: #9ed13a;
          font-size: 18px;
        }

        .subheader-title {
          color: #ffffff !important;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          text-align: center;
          flex: 1;
          letter-spacing: 0.3px;
        }

        /* Responsive Design */
        @media (max-width: 400px) {
          .subheader-container {
            padding: 10px 12px;
          }
          
          .subheader-title {
            font-size: 16px;
          }
          
          .back-button {
            width: 32px;
            height: 32px;
          }
          
          .back-icon {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default SubHeader;