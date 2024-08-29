import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa6";
import axios from 'axios';
import './App.css';

function App() {

  function Card({ image, title }) {
    return (
      <div className="card">
        <img src={image} alt={title} className="card-image" />
        <div className="card-title">{title}</div>
      </div>
    );
  }

  const [slideIndex, setSlideIndex] = useState(1);

  const slides = [
    {
      images: [
        "https://jotwani.com/wp-content/uploads/2021/06/DelhiPolice.jpg",
        "https://jotwani.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-20-at-4.39.26-PM.jpeg",
        "https://jotwani.com/wp-content/uploads/2023/08/harpeet-maam.jpg",
      ],
    },
    {
      images: [
        "https://jotwani.com/wp-content/uploads/2021/06/SCBA.jpg",
        "https://jotwani.com/wp-content/uploads/2023/08/aditimam.jpg",
        "https://jotwani.com/wp-content/uploads/2021/06/Supreme-Court-Lawyer-1.jpg",
      ],
    },
    {
      images: [
        "https://jotwani.com/wp-content/uploads/2023/08/prernamam.jpg",
        "https://jotwani.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-20-at-4.48.21-PM.jpeg",
        "https://media.istockphoto.com/id/1499401564/photo/two-lawyers-are-discussing-about-contract-paper-law-matters-determination-pointing-law-and.webp?b=1&s=612x612&w=0&k=20&c=q78BkUJ-2v0OQEwklJWKAES1pYSV9NteTKoKgITHYJw=",
      ],
    },
  ];

  const [isTelugu, setIsTelugu] = useState(false);

  

  const cards = [
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/Patent.png',
      title: isTelugu ? 'పేటెంట్లు మరియు ఆవిష్కరణలు' : 'Patents and Innovations',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/Patent-2.png',
      title: isTelugu ? 'గ్లోబల్ ట్రేడ్‌మార్కులు' : 'Global Trademarks',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2024/07/Untitled-design-61.png',
      title: 'Litigation',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/7-1.png',
      title: 'Family Law',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/3-2.png',
      title: 'Litigation',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/4-1.png',
      title: 'Family Law',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/6-1.png',
      title: 'Litigation',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/contract.png',
      title: 'Family Law',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/full1.jpg',
      title: 'Litigation',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/LPO.jpg',
      title: 'Family Law',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/what-is-cyber-law.jpg',
      title: 'Litigation',
    },
    {
      image: 'https://jotwani.com/wp-content/uploads/2021/06/Employment-Law.jpg',
      title: 'Family Law',
    },
  ];

  const teluguTitles = [
    'పేటెంట్లు మరియు ఆవిష్కరణలు',
    'గ్లోబల్ ట్రేడ్‌మార్కులు',
    'వ్యవహారాలు',
    'కుటుంబ చట్టం',
    'వ్యవహారాలు',
    'కుటుంబ చట్టం',
    'వ్యవహారాలు',
    'కుటుంబ చట్టం',
    'వ్యవహారాలు',
    'కుటుంబ చట్టం',
    'సైబర్ చట్టం',
    'ఉద్యోగ చట్టం',
  ];

  const getTranslatedTitle = (title, language) => {
    const translations = {
      'Patents and Innovations': {
        'Telugu': 'పేటెంట్లు మరియు ఆవిష్కరణలు',
        'Hindi': 'पेटेंट्स और नवाचार',
      },
      'Global Trademarks': {
        'Telugu': 'గ్లోబల్ ట్రేడ్‌మార్కులు',
        'Hindi': 'वैश्विक ट्रेडमार्क',
      },
      // Add more translations here
    };

    return translations[title]?.[language] || title;
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      plusSlides(1);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  const plusSlides = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex > slides.length) {
      newIndex = 1;
    } else if (newIndex < 1) {
      newIndex = slides.length;
    }
    setSlideIndex(newIndex);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [a, seta] = useState(true);

  const handleSearch = async () => {
    seta(false);
    const API_KEY = 'AIzaSyANGRBXkrIB27I0tJlfz_ns2l5Pbxl5ToU'; // Replace with your actual API key
    const CSE_ID = '170174b4b386f4f68'; // Replace with your actual Custom Search Engine ID
    const encodedQuery = encodeURIComponent(query); // Encode the query
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodedQuery}`;
    console.log('Request URL:', url); // Log the full request URL
    try {
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      setResults(response.data.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };



  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleLanguageDropdown = () => {
 

    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageChange = (language) => {
   

    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };
  useEffect(() => {
    console.log('Updated isTelugu state:', isTelugu);
  }, [isTelugu]);

  console.log('isTelugu:', isTelugu);
  

  return (
    <div className="legal-research">
      <div className="sidebar">
        <h1>sidebar</h1>
      </div>
      <div className="a">
        <div>
          <h3 id="p">{selectedLanguage === 'English' ? 'Legal Research and Knowledge Base' : 'న్యాయ పరిశోధన మరియు నాలెడ్జ్ బేస్'}</h3>

          <div id="contact-header-textbox12">
            <input
              type="text"
              name="search"
              placeholder={selectedLanguage === 'English' ? 'SEARCH' : 'శోధించు'}
              className="contact-header-textfeild"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>{selectedLanguage === 'English' ? 'Search' : 'శోధించు'}</button>
          </div>

          <div id="contact-header-textbox13" onClick={toggleLanguageDropdown}>
            <p>
              {selectedLanguage} <FaArrowDown />
            </p>
            {showLanguageDropdown && (
              <ul className="language-dropdown">
                <li onClick={() => handleLanguageChange('English')}>English</li>
                <li onClick={() => handleLanguageChange('Telugu')}>Telugu</li>
                <li onClick={() => handleLanguageChange('Hindi')}>Hindi</li>
                {/* Add more languages as needed */}
              </ul>
            )}
          </div>
        </div>

        <div className="container">
          {a ? (
            <div className="slideshow-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`mySlides fade ${slideIndex === index + 1 ? "" : ""}`}
                  style={{ display: slideIndex === index + 1 ? "block" : "none" }}
                >
                  <div className="slide-images">
                    {slide.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        className={`slide-image ${idx === 1 ? "shift-left" : ""}`}
                        alt={`Slide ${index + 1} - Image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <a className="prev" onClick={() => plusSlides(-1)}>
                ❮
              </a>
              <a className="next" onClick={() => plusSlides(1)}>
                ❯
              </a>

              <div style={{ textAlign: "center" }}>
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${slideIndex === index + 1 ? "active" : ""}`}
                    onClick={() => currentSlide(index + 1)}
                  ></span>
                ))}
              </div>
            </div>
          ) : null}

          {a ? (
            <div>
              <h3 className="h3">{selectedLanguage === 'English' ? 'Jotwani Associates - Best Law Firm in India' : 'జోత్వాని అసోసియేట్స్ - భారతదేశంలో ఉత్తమ న్యాయ సంస్థ'}</h3>
              <div style={{ display: 'flex' }}>
                <p className="ptag">
                  {selectedLanguage === 'English'
                    ? 'Jotwani Associates is the foremost multi-disciplinary Global Law Firm supporting Fortune 500 corporations, Indian Business Houses, Academic and Research Institutes, Startups, and Individuals.'
                    : 'జోత్వాని అసోసియేట్స్ ఫార్చ్యూన్ 500 కార్పొరేషన్లు, ఇండియన్ బిజినెస్ హౌస్‌లు, అకడమిక్ మరియు రీసెర్చ్ ఇన్‌స్టిట్యూట్‌లు, స్టార్టప్‌లు మరియు వ్యక్తులకు మద్దతునిచ్చే అగ్రశ్రేణి బహుళ-క్రమశిక్షణా గ్లోబల్ లా సంస్థ.'}
                </p>
                <p className="ptag">
                  {selectedLanguage === 'English'
                    ? 'Jotwani Associates is Top Forbes India Law Firm for the year 2020 and 2021 in the practice areas of Intellectual Property Rights Laws and Technology Laws.'
                    : 'జోత్వాని అసోసియేట్స్ మేధో సంపత్తి హక్కుల చట్టాలు మరియు సాంకేతిక చట్టాల సాధన విభాగాలలో 2020 మరియు 2021 సంవత్సరాలకు సంబంధించిన టాప్ ఫోర్బ్స్ ఇండియా లా సంస్థ.'}
                </p>
              </div>
              <div>
                <h3 className="k">{selectedLanguage === 'English' ? 'The Law Firm’s Areas of Practice' : 'న్యాయ సంస్థ యొక్క ప్రాక్టీస్ ప్రాంతాలు'}</h3>
              </div>
              <div className="card-gridd">
              {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={
              selectedLanguage === 'English'
                ? card.title
                : getTranslatedTitle(card.title, selectedLanguage)
            }
          />
        ))}
              </div>
            </div>
          ) : (
            <div className="card-grid">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <div key={index} className="cardd">
                    {result.pagemap?.cse_image?.[0]?.src && (
                      <img src={result.pagemap.cse_image[0].src} alt={result.title} className="card-imagee" />
                    )}
                    <div className="card-contentt">
                      <h3 className="card-titlee">{result.title}</h3>
                      <p className="card-snippett">{result.snippet}</p>
                      <a href={result.link} target="_blank" rel="noopener noreferrer" className="card-linkk">
                        Read more
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div>No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;