import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Dates from "src/view/shared/utils/Dates";
import recordActions from "src/modules/record/form/recordFormActions";
import recordListAction from "src/modules/record/list/recordListActions";
import recordSelector from "src/modules/record/list/recordListSelectors";
import GrapModal from "./GrapModal";
import productListActions from "src/modules/product/list/productListActions";
import PrizeModal from "./PrizeModal";
import { i18n } from "../../../i18n";
import Message from "src/view/shared/message";
import authActions from "src/modules/auth/authActions";

// Hero media playlist: plays in order, then loops back to the start.
// Add more entries here (type: "image" for gifs/photos, "video" for mp4s) to extend the rotation.
const heroMedia = [
    { type: "video", src: "/images/grap/video2.mp4" },
  { type: "video", src: "/images/grap/video.mp4" },
  { type: "video", src: "/images/grap/video3.mp4" },
  { type: "video", src: "https://v1.pinimg.com/videos/mc/720p/d8/b7/54/d8b754a71dbc6161e3dd86536ffbb9ce.mp4" },
];

const Grappage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const items = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const Modal = useSelector(selector.showModal);
  const [number] = useState(Dates.Number());
  const totalperday = useSelector(recordSelector.selectTotalPerday);
  const [heroMediaIndex, setHeroMediaIndex] = useState(0);

  const goToNextHeroMedia = () => {
    setHeroMediaIndex((prev) => (prev + 1) % heroMedia.length);
  };

  useEffect(() => {
    const current = heroMedia[heroMediaIndex];
    if (current.type === "image") {
      const timer = setTimeout(goToNextHeroMedia, current.duration || 6000);
      return () => clearTimeout(timer);
    }
  }, [heroMediaIndex]);

  useEffect(() => {
    dispatch(recordListAction.doCount());
    dispatch(recordListAction.doCountDay());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.balance <= 0) {
      Message.error(i18n('pages.grab.errors.insufficientBalance'));
    }
    if (currentUser.tasksDone >= currentUser.vip.dailyorder) {
      Message.success(i18n('pages.grab.messages.completedTasks'));
    }
  }, [currentUser.balance, currentUser.tasksDone, currentUser.vip?.dailyorder]);

  const rollAll = async () => {
    if (currentUser.balance <= 0) {
      Message.error(i18n('pages.grab.errors.insufficientBalance'));
      return;
    }
    if (currentUser.tasksDone >= currentUser.vip.dailyorder) {
      Message.success(i18n('pages.grab.messages.completedTasks'));
      return;
    }
    await dispatch(actions.doFetch());
  };

  const hideModal = () => {
    dispatch(productListActions.doCloseModal());
    dispatch(authActions.doRefreshCurrentUser());
  };

  const submit = async () => {
    const values = {
      number: number,
      product: items?.id,
      price: items.amount,
      commission: items?.commission,
      status: items?.type === "combo" ? "pending" : "completed",
      user: currentUser.id,
    };
    await dispatch(recordActions.doCreate(values));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    rollAll();
  };

  const goToRecords = () => {
    history.push("/order");
  };

  return (
    <>
      <div className="luxury-grab">
        {/* Hero Section with GIF */}
        <div className="hero-section">
          <div className="logo-badge">
            <img src="/logo.png" alt="Logo" className="hero-logo" />
          </div>
          <div className="hero-gif">
            {heroMedia[heroMediaIndex].type === "video" ? (
              <video
                key={heroMediaIndex}
                className="hero-media-video"
                src={heroMedia[heroMediaIndex].src}
                autoPlay
                muted
                playsInline
                onEnded={goToNextHeroMedia}
                onError={goToNextHeroMedia}
              />
            ) : (
              <div
                key={heroMediaIndex}
                className="hero-media-image"
                style={{ backgroundImage: `url(${heroMedia[heroMediaIndex].src})` }}
              />
            )}
          </div>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Find Your Dream Car</h1>
              <p className="hero-subtitle">Experience the thrill of luxury driving</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-container">
          {/* Stats Dashboard */}
          <div className="stats-dashboard">
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <i className="fas fa-coins"></i>
              </div>
              <div className="stat-info">
                <span className="stat-label">Balance</span>
                <span className="stat-value">${currentUser.balance?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="stat-info">
                <span className="stat-label">Today's Earnings</span>
                <span className="stat-value">${totalperday || "0"}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <i className="fas fa-tasks"></i>
              </div>
              <div className="stat-info">
                <span className="stat-label">Tasks Completed</span>
                <span className="stat-value">{currentUser.tasksDone || 0}/{currentUser.vip?.dailyorder || 0}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-info">
                <span className="stat-label">On Hold</span>
                <span className="stat-value">${currentUser.freezeblance?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button className="search-main-button" onClick={handleSearch}>
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fas fa-search"></i>
                <span>Search Available Cars</span>
                <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>

          {/* Rating & Reviews */}
          <div className="rating-section">
            <div className="rating-stars">
              <div className="stars-group">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="rating-number">4.9</span>
            </div>
            <div className="review-info">
              <span className="review-count">2,847 verified reviews</span>
              <button className="view-reviews" onClick={goToRecords}>
                View all <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Featured Benefits */}
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="benefit-text">
                <h4>Full Insurance</h4>
                <p>Comprehensive coverage included</p>
              </div>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-headset"></i>
              </div>
              <div className="benefit-text">
                <h4>24/7 Support</h4>
                <p>Premium assistance anytime</p>
              </div>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <div className="benefit-text">
                <h4>Free Cancellation</h4>
                <p>Up to 24 hours before</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {loading && <LoadingModal />}
      {Modal && !loading && items?.type === "prizes" && (
        <PrizeModal items={items} number={number} hideModal={hideModal} submit={submit} />
      )}
      {Modal && !loading && items?.type !== "prizes" && (
        <GrapModal items={items} number={number} hideModal={hideModal} submit={submit} />
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #0a0a0a;
        }

        .luxury-grab {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #0f130a 50%, #0a0a0a 100%);
          font-family: 'Poppins', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }

        /* Hero Section with GIF */
        .hero-section {
          position: relative;
          height: 400px;
          overflow: hidden;
          isolation: isolate;
        }

        .logo-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.92);
          padding: 8px 16px;
          border-radius: 30px;
          z-index: 3;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .hero-logo {
          height: 20px;
          width: auto;
          display: block;
        }

        .hero-gif {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .hero-media-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .hero-media-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .hero-section:hover .hero-media-image,
        .hero-section:hover .hero-media-video {
          transform: scale(1.08);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%);
          z-index: 1;
        }

        .hero-content {
          position: absolute;
          bottom: 50px;
          left: 28px;
          right: 28px;
          color: white;
          z-index: 2;
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: 40px;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #a3d633 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .hero-subtitle {
          font-size: 17px;
          opacity: 0.95;
          font-weight: 400;
          letter-spacing: 0.3px;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Main Container */
        .main-container {
          padding: 28px 20px 48px 20px;
          margin-top: -50px;
          position: relative;
          z-index: 3;
          background: linear-gradient(to bottom, transparent 0%, #0a0a0a 30px);
        }

        /* Stats Dashboard */
        .stats-dashboard {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .stat-item {
          background: rgba(15, 15, 15, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(136, 189, 31, 0.25);
          border-radius: 24px;
          padding: 18px 14px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .stat-item:hover {
          border-color: #88bd1f;
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(136, 189, 31, 0.2);
          background: rgba(20, 20, 20, 0.92);
        }

        .stat-icon-wrapper {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, rgba(136, 189, 31, 0.22), rgba(136, 189, 31, 0.06));
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .stat-item:hover .stat-icon-wrapper {
          background: linear-gradient(135deg, rgba(136, 189, 31, 0.32), rgba(136, 189, 31, 0.12));
          transform: scale(1.05);
        }

        .stat-icon-wrapper i {
          font-size: 26px;
          color: #9ed13a;
          transition: transform 0.2s;
        }

        .stat-item:hover .stat-icon-wrapper i {
          transform: scale(1.1);
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 6px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .stat-value {
          display: block;
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        /* Main Search Button */
        .search-main-button {
          background: linear-gradient(135deg, #a3d633 0%, #6a9c1c 100%);
          border: none;
          border-radius: 28px;
          padding: 18px 28px;
          width: 100%;
          color: #0a0a0a;
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 28px;
          box-shadow: 0 12px 28px rgba(136, 189, 31, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .search-main-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .search-main-button:hover::before {
          left: 100%;
        }

        .search-main-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(136, 189, 31, 0.55);
          background: linear-gradient(135deg, #b8e14a 0%, #7bb01f 100%);
        }

        .search-main-button:active {
          transform: translateY(1px);
        }

        .search-main-button i {
          font-size: 20px;
          transition: transform 0.2s;
        }

        .search-main-button:hover i {
          transform: translateX(4px);
        }

        .search-main-button i:first-child {
          font-size: 22px;
        }

        .search-main-button:hover i:first-child {
          transform: translateX(-2px);
        }

        /* Rating Section */
        .rating-section {
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(136, 189, 31, 0.2);
          border-radius: 24px;
          padding: 20px 24px;
          margin-bottom: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
        }

        .rating-section:hover {
          border-color: rgba(136, 189, 31, 0.4);
          background: rgba(20, 20, 20, 0.8);
        }

        .rating-stars {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .stars-group {
          display: flex;
          gap: 5px;
          color: #9ed13a;
          font-size: 15px;
        }

        .rating-number {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .review-info {
          text-align: right;
        }

        .review-count {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 6px;
          font-weight: 500;
        }

        .view-reviews {
          background: transparent;
          border: none;
          color: #88bd1f;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .view-reviews:hover {
          color: #a3d633;
          gap: 8px;
        }

        .view-reviews i {
          font-size: 11px;
          transition: transform 0.2s;
        }

        .view-reviews:hover i {
          transform: translateX(3px);
        }

        /* Benefits Grid */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .benefit-card {
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(136, 189, 31, 0.2);
          border-radius: 20px;
          padding: 18px 12px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
        }

        .benefit-card:hover {
          border-color: #88bd1f;
          transform: translateY(-3px);
          background: rgba(20, 20, 20, 0.85);
          box-shadow: 0 8px 20px rgba(136, 189, 31, 0.2);
        }

        .benefit-icon {
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, rgba(136, 189, 31, 0.22), rgba(136, 189, 31, 0.06));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px auto;
          transition: all 0.3s ease;
        }

        .benefit-card:hover .benefit-icon {
          background: linear-gradient(135deg, rgba(136, 189, 31, 0.32), rgba(136, 189, 31, 0.12));
          transform: scale(1.1);
        }

        .benefit-icon i {
          font-size: 24px;
          color: #9ed13a;
          transition: transform 0.2s;
        }

        .benefit-card:hover .benefit-icon i {
          transform: scale(1.1);
        }

        .benefit-text h4 {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
          letter-spacing: -0.2px;
        }

        .benefit-text p {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.4;
        }

        /* Loading Animation */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .fa-spin {
          animation: spin 1s linear infinite;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .hero-section {
            height: 340px;
          }
          
          .hero-title {
            font-size: 32px;
          }
          
          .hero-subtitle {
            font-size: 15px;
          }
          
          .hero-content {
            bottom: 35px;
            left: 20px;
            right: 20px;
          }
          
          .main-container {
            padding: 24px 16px 40px 16px;
            margin-top: -40px;
          }
          
          .stats-dashboard {
            gap: 10px;
            margin-bottom: 20px;
          }
          
          .stat-item {
            padding: 14px 12px;
            gap: 10px;
          }
          
          .stat-value {
            font-size: 18px;
          }
          
          .stat-icon-wrapper {
            width: 44px;
            height: 44px;
          }
          
          .stat-icon-wrapper i {
            font-size: 20px;
          }
          
          .search-main-button {
            padding: 14px 20px;
            font-size: 16px;
            margin-bottom: 20px;
          }
          
          .search-main-button i {
            font-size: 18px;
          }
          
          .rating-section {
            padding: 16px 18px;
            margin-bottom: 20px;
          }
          
          .rating-number {
            font-size: 24px;
          }
          
          .stars-group {
            font-size: 12px;
          }
          
          .benefits-grid {
            gap: 10px;
          }
          
          .benefit-card {
            padding: 14px 8px;
          }
          
          .benefit-icon {
            width: 46px;
            height: 46px;
            margin-bottom: 10px;
          }
          
          .benefit-icon i {
            font-size: 20px;
          }
          
          .benefit-text h4 {
            font-size: 13px;
          }
          
          .benefit-text p {
            font-size: 10px;
          }
        }

        /* Tablet Optimization */
        @media (min-width: 481px) and (max-width: 768px) {
          .hero-section {
            height: 420px;
          }
          
          .hero-title {
            font-size: 40px;
          }
          
          .main-container {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .stats-dashboard {
            gap: 16px;
          }
          
          .benefits-grid {
            gap: 16px;
          }
        }

        /* Smooth Scroll */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #88bd1f;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a3d633;
        }
      `}</style>
    </>
  );
};

export default Grappage;