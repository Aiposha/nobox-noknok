import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useSwipeable } from 'react-swipeable';







function App() {

  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [imageIndex, setImageIndex] = useState(0); 
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };
    fetchProducts();
  }, []);

   const handleSwipeLeft = () => {
    if (imageIndex < products[currentIndex].images.length - 1) {
      setImageIndex(imageIndex + 1); 
    }
  };

  const handleSwipeRight = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };



  const handleSwipeUp = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    onSwipedUp: handleSwipeUp,
    onSwipedDown: handleSwipeDown,
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(product => product.id !== id));
  };

  if (products.length === 0) {
    return <div>Загрузка...</div>;
  }
 

  return (
      <Wrapper {...handlers} style={{ width: '100%', height: '100vh', touchAction: 'none' }}>
     <BigContainer>
       <CaruselContainer>
        
          <ContentStyle >
            <ImagesStyle src={products[currentIndex].images[0]} alt="#" />
            <IconsStyle>
              <FiMessageCircle size={24} />
              <FiHeart  size={24}/>
              <FiTrash2 size={24} onClick={() => addToCart(products[currentIndex])} />
            </IconsStyle>
             
          </ContentStyle>
        
      </CaruselContainer>

      <h3>{products[currentIndex].title}</h3>

      <div className="cart">
        <h2>Корзина</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.title}</p>
            <p>Номер: {item.phoneNumber || '+1234567890'}</p>
            <button onClick={() => window.location.href = `tel:${item.phoneNumber || '+1234567890'}`}>Позвонить</button>
            <button onClick={() => removeFromCart(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
     </BigContainer>
    </Wrapper>
  )
}

export default App
const Wrapper = styled('div')(()=>({


}))
const BigContainer = styled('div')(()=>({
    width:'500px',
  height:'100vh',
  background: '#fbfbfb',
 boxShadow: '2px  2px 10px 15px rgba(0, 0, 0, 0.1)',
display:'flex',
flexDirection:'column',
justifyContent:'center',
alignItems:'center',
margin:'0 auto'
}))

const ImagesStyle = styled('img')(()=>({
  width: '400px'
}))

const CaruselContainer = styled('div')(()=>({
 
}))

const ContentStyle = styled('div')(()=>({
  position: 'relative' 
}))

const IconsStyle = styled('div')(()=>({
position: 'absolute',
top:'150px',
right: '3px',
display: 'flex',
gap: '40px',
flexDirection: 'column',
justifyContent:'center',
alignItems:'center',


}))


