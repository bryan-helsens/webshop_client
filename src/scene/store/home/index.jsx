//import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";
import { Box } from "@mui/material";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <Box>
        <MainCarousel />
        <ShoppingList />
    </Box>
  )
}

export default Home