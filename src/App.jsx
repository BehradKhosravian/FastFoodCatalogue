import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./CategoryList/categoryList";
import Header from "./Header/header";
import Loading from "./Loading/loading";
import FastFoodList from "./FastFoodList/FastFoodList";
import SearchBar from "./SearchBar/SearchBar";
import notFound from "./assets/images/404.png";
import useAxios from "./useAxios";

function App() {
  const [url, setUrl] = useState("/FastFood/list");
  const [fastFoodItems, , loading] = useAxios({
    url,
  });

  const filterItems = (categoryId) => {
    setUrl(`/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`);
  };

  const searchItems = async (term) => {
    setUrl(`/FastFood/search/${term ? "?term=" + term : ""}`);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }
    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center fade-in-horiz">
            برای کلید واژه فوق هیچ آیتمی یافت نشد
          </div>
          <img className="mx-auto mt-5 d-block" src={notFound} alt="" />
        </>
      );
    }
    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <CategoryList filterItems={filterItems}>
        <SearchBar searchItems={searchItems} />
      </CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
