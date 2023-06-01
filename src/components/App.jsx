import { useState } from "react";
import { GlobalStyle } from "./Global.styles";
import { Layout } from "./Layout/Layout.styled";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchData } from "api";
import { Loader } from "./Loader";
import { useEffect } from "react";


export const App = () => {
  const [imagesArray, setImagesArray] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSearch = (textCall) => {
    setSearchValue(textCall)
    setCurrentPage(1)
    setImagesArray([])
  }


  useEffect(() => {
  if (searchValue !== '') {
    arrayOfImages(currentPage);
  }
}, [searchValue, currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);
  };
  
  const arrayOfImages = () => {
  fetchData(searchValue, currentPage)
    .then((array) => {
      if (currentPage === 1) {
        setImagesArray(array)
        setLoading(false)
      } else {
        setImagesArray((prevState) => [...prevState, ...array])
        setLoading(false)
      }
    })
    .catch((error) => {
      console.error(error);
      setLoading(false)
    })
  }


  const updateImagesArray = (array) => {
    if (currentPage === 1) {
      setImagesArray(array)
    }
  };

  const spinStar = () => { 
    setLoading(true)
  } 

  const spinStop = () => { 
    setLoading(false)
  }



  return (
      <Layout>
      <Searchbar
          onSearch={handleSearch}
          addImages={updateImagesArray}
          currentPage={currentPage}
          searchValue={searchValue}
          spinnerStarts={spinStar}
          spinnerFinishes={spinStop} />
        {loading && <Loader/>}
        <ImageGallery imagesToRender={imagesArray} />
        <Button array={imagesArray} nextPage={nextPage} />
        <GlobalStyle />
      </Layout>
    );
}