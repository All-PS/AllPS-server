import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage/mainPage";
import DetailPage from "pages/DetailPage/detailPage";
import RecommendedPage from "pages/RecommendedPage/recommendedPage";
import CodePlatformInputForm from "pages/CodePlatformPage/codePlatformPage";
const searchTypes = [
  { label: "문제명", value: "name" },
  { label: "문제번호", value: "code" },
];

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage searchTypes={searchTypes} />} />
          <Route
            path="/search"
            element={<DetailPage searchTypes={searchTypes} />}
          />
          <Route
            path="/recommended"
            element={<RecommendedPage searchTypes={searchTypes} />}
          />
          <Route
            path="/code"
            element={<CodePlatformInputForm searchTypes={searchTypes} />}
          />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
