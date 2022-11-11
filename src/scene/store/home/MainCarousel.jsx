import { Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tokens } from "../../../theme";

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../../../public/assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const isNonMobile = useMediaQuery('(min-width:600px)')

  return (
    <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        //autoPlay={true}
        interval={5000}
        emulateTouch={true}
        transitionTime={2000}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
            <IconButton
                onClick={onClickHandler}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    color: "white",
                    padding: "5px",
                    zIndex: "10",
                }}
            >
                <NavigateBeforeIcon sx={{ fontSize: 40 }} />
            </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
            <IconButton
              onClick={onClickHandler}
              sx={{
                position: "absolute",
                top: "50%",
                right: "0",
                color: "white",
                padding: "5px",
                zIndex: "10",
              }}
            >
              <NavigateNextIcon sx={{ fontSize: 40 }} />
            </IconButton>
        )}
    >
        {Object.values(heroTextureImports).map((texture, index) => (
            <Box key={`carousel-image-${index}`}>
                <img
                    src={texture}
                    alt={`carousel-${index}`}
                    style={{
                        width: "100%",
                        height: "700px",
                        objectFit: "cover",
                        backgroundAttachment: "fixed",
                    }}
                /> 
                <Box
                    color="white"
                    padding="20px"
                    borderRadius="1px"
                    textAlign="left"
                    backgroundColor="rgb(0, 0, 0, 0.4)"
                    position="absolute"
                    top="46%"
                    left={isNonMobile ? "10%" : "0"}
                    right={isNonMobile ? undefined : "0"}
                    margin={isNonMobile ? undefined : "0 auto"}
                    maxWidth={isNonMobile ? undefined : "240px"}
                >
                    <Typography color={colors.carouselText[100]} fontSize="20px">-- NEW ITEMS</Typography>
                    <Typography variant="carousel">Summer Sale</Typography>
                    <Typography 
                        fontWeight="bold"
                        fontSize="15px"
                        color={colors.carouselText[100]}
                        sx={{
                            textDecoration: "underline"
                        }}
                    >Discover More</Typography>
                </Box>
            </Box>
        ))}
    </Carousel>
  )
}

export default MainCarousel