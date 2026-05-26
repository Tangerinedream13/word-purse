import { Box, Flex, Text, Button, Container } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <Box
      as="nav"
      bg="#FAF6EE"
      borderBottom="2px solid #C9A84C"
      position="sticky"
      top="0"
      zIndex="100"
      boxShadow="0 2px 12px rgba(44,24,16,0.07)"
    >
      <Container maxW="1100px">
        <Flex align="center" justify="space-between" py={3} px={{ base: 4, md: 0 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Flex align="center" gap={2}>
              <Text fontSize="1.6rem" lineHeight="1">👜</Text>
              <Text
                fontFamily='"Playfair Display", Georgia, serif'
                fontSize={{ base: "1.3rem", md: "1.6rem" }}
                fontWeight="700"
                color="#2C1810"
                letterSpacing="0.02em"
              >
                Word Purse
              </Text>
            </Flex>
          </Link>

          <Flex gap={3} align="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Text
                fontSize="0.92rem"
                fontWeight="600"
                color="#6B3A1F"
                letterSpacing="0.05em"
                textTransform="uppercase"
                _hover={{ color: "#E8841A" }}
              >
                Browse
              </Text>
            </Link>
            <Button
              onClick={() => navigate("/add")}
              bg="#E8841A"
              color="white"
              fontWeight="700"
              fontSize="0.88rem"
              letterSpacing="0.04em"
              textTransform="uppercase"
              px={5}
              py={2}
              borderRadius="2px"
              border="none"
              _hover={{ bg: "#CC6D0D", transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(232,132,26,0.35)" }}
              transition="all 0.18s"
            >
              + Add a Word
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
